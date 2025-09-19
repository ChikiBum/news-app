import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api/mockApi";
import AuthForm from "../components/AuthForm";
import { useAuthStore } from "../store/authStore";
import type { User } from "../types";
import { loginSchema } from "../validation/loginSchema";
import { registerSchema } from "../validation/registerSchema";

interface LoginFormSubmitEvent extends React.FormEvent<HTMLFormElement> {}

interface RegisterFormSubmitEvent extends React.FormEvent<HTMLFormElement> {}

export default function LoginPage() {
	const [form, setForm] = useState({ username: "", password: "" });
	const [serverError, setServerError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showRegister, setShowRegister] = useState(false);
	const [registerForm, setRegisterForm] = useState({
		username: "",
		email: "",
		password: "",
		name: "",
	});

	const setToken = useAuthStore((state) => state.setToken);
	const setUser = useAuthStore((state) => state.setUser);

	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/news");
		}
	}, [isAuthenticated, navigate]);

	const loginMutation = useMutation<
		User,
		Error,
		{ username: string; password: string }
	>({
		mutationFn: (credentials) => login(credentials),
		onMutate: () => {
			setIsLoading(true);
		},
		onSuccess: (data) => {
			const token = btoa(JSON.stringify(data));
			const userData = data;
			setToken(token);
			setUser(userData);
			setIsLoading(false);
		},
		onError: (error) => {
			setServerError(error.message);
			setShowRegister(true);
			setIsLoading(false);
		},
	});

	const registerMutation = useMutation<User, Error, Omit<User, "id">>({
		mutationFn: register,
		onMutate: () => {
			setIsLoading(true);
		},
		onSuccess: (data) => {
			setIsLoading(false);
			const token = btoa(JSON.stringify(data));
			setToken(token);
			setUser(data);
			setShowRegister(false);
			setServerError("");
		},
		onError: (error) => {
			setServerError(error.message);
			setIsLoading(false);
		},
	});

	function handleLoginChange(name: string, value: string) {
		setForm((f) => ({ ...f, [name]: value }));
	}

	function handleLoginSubmit(e: LoginFormSubmitEvent) {
		e.preventDefault();
		setServerError("");
		const result = loginSchema.safeParse(form);
		if (!result.success) {
			setServerError(result.error.message);
			return;
		}
		loginMutation.mutate(form);
	}

	function handleRegisterChange(name: string, value: string) {
		setRegisterForm((f) => ({ ...f, [name]: value }));
	}

	function handleRegisterSubmit(e: RegisterFormSubmitEvent) {
		e.preventDefault();
		setServerError("");
		const result = registerSchema.safeParse(registerForm);
		if (!result.success) {
			setServerError(result.error.message);
			return;
		}
		registerMutation.mutate(registerForm);
	}

	return (
		<div
			className="p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-900 dark:border-gray-700
			flex flex-col center items-center"
		>
			{!showRegister && (
				<AuthForm
					title={isLoading ? "Завантаження..." : "Вхід"}
					fields={[
						{
							name: "username",
							type: "text",
							placeholder: "Логін",
							required: true,
						},
						{
							name: "password",
							type: "password",
							placeholder: "Пароль",
							required: true,
						},
					]}
					values={form}
					onChange={handleLoginChange}
					onSubmit={handleLoginSubmit}
					submitText={isLoading ? "Завантаження..." : "Увійти"}
					disabled={loginMutation.isPending}
					error={serverError && !showRegister ? serverError : ""}
				/>
			)}
			{showRegister && (
				<AuthForm
					title={isLoading ? "Завантаження..." : "Реєстрація"}
					fields={[
						{
							name: "username",
							type: "text",
							placeholder: "Логін",
							required: true,
						},
						{
							name: "email",
							type: "email",
							placeholder: "Email",
							required: true,
						},
						{
							name: "password",
							type: "password",
							placeholder: "Пароль",
							required: true,
						},
						{ name: "name", type: "text", placeholder: "Ім'я", required: true },
					]}
					values={registerForm}
					onChange={handleRegisterChange}
					onSubmit={handleRegisterSubmit}
					submitText={isLoading ? "Завантаження..." : "Зареєструватися"}
					disabled={registerMutation.isPending}
					error={serverError && showRegister ? serverError : ""}
				/>
			)}
		</div>
	);
}
