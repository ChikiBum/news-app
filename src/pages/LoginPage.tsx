import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api/mockApi";
import AuthForm from "../components/AuthForm";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";
import type { User } from "../types";
import { loginSchema } from "../validation/loginSchema";
import { registerSchema } from "../validation/registerSchema";

interface LoginFormSubmitEvent extends React.FormEvent<HTMLFormElement> {}

interface RegisterFormSubmitEvent extends React.FormEvent<HTMLFormElement> {}

export default function LoginPage() {
	const [form, setForm] = useState({ username: "", password: "" });
	const [serverError, setServerError] = useState("");
	const [showRegister, setShowRegister] = useState(false);
	const [registerForm, setRegisterForm] = useState({
		username: "",
		email: "",
		password: "",
		name: "",
	});

	const setToken = useAuthStore((state) => state.setToken);
	const setUser = useAuthStore((state) => state.setUser);
	const setUserStore = useUserStore((state) => state.setUser);
	// const setAuthenticated = useUserStore((state) => state.isAuthenticated);

	const loginMutation = useMutation<
		User,
		Error,
		{ username: string; password: string }
	>({
		mutationFn: (credentials) => login(credentials),
		onSuccess: (data) => {
			const token = btoa(JSON.stringify(data));
			const userData = data;
			setToken(token);
			setUser(userData);
			setUserStore(userData);
		},
		onError: (error) => {
			setServerError(error.message);
			setShowRegister(true);
		},
	});

	const registerMutation = useMutation<User, Error, Omit<User, "id">>({
		mutationFn: register,
		onSuccess: (data) => {
			const token = btoa(JSON.stringify(data));
			setToken(token);
			setUser(data);
			setUserStore(data);
			setShowRegister(false);
			setServerError("");
		},
		onError: (error) => {
			setServerError(error.message);
		},
	});

	function handleLoginChange(name: string, value: string) {
		setForm((f) => ({ ...f, [name]: value }));
	}
	const navigate = useNavigate();

	function handleLoginSubmit(e: LoginFormSubmitEvent) {
		e.preventDefault();
		setServerError("");
		const result = loginSchema.safeParse(form);
		if (!result.success) {
			setServerError(result.error.message);
			return;
		}
		loginMutation.mutate(form);
		navigate("/news");
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
		navigate("/news");
	}

	return (
		<div
			className="p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-900 dark:border-gray-700
			flex flex-col center items-center"
		>
			{!showRegister && (
				<AuthForm
					title="Вхід"
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
					submitText="Увійти"
					disabled={loginMutation.isPending}
					error={serverError && !showRegister ? serverError : ""}
				/>
			)}
			{showRegister && (
				<AuthForm
					title="Реєстрація"
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
					submitText="Зареєструватись"
					disabled={registerMutation.isPending}
					error={serverError && showRegister ? serverError : ""}
				/>
			)}
		</div>
	);
}
