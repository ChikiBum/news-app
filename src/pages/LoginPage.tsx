import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api/authApi";
import AuthForm from "../components/AuthForm";
import { useAuthStore } from "../store/authStore";
import type {
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	RegisterResponse,
} from "../types";
import { loginValidationSchema } from "../validation/loginSchema";
import { registerValidationSchema } from "../validation/registerSchema";

interface LoginFormSubmitEvent extends React.FormEvent<HTMLFormElement> {}
interface RegisterFormSubmitEvent extends React.FormEvent<HTMLFormElement> {}

export default function LoginPage() {
	const [loginForm, setLoginForm] = useState({
		email: "testuser1@example.com",
		password: "YourStrongPassword",
	});
	const [registerForm, setRegisterForm] = useState({
		username: "",
		email: "",
		password: "",
		name: "",
	});
	const [serverError, setServerError] = useState("");
	const [showRegister, setShowRegister] = useState(false);

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
		LoginResponse & { token: string },
		Error,
		LoginRequest
	>({
		mutationFn: login,
		onSuccess: (data) => {
			Cookies.set("token", data.token, {
				expires: 7,
				secure: true,
				sameSite: "strict",
			});
			setToken(data.token);
			setUser({
				id: data.id,
				email: data.email,
				username: data.username ?? "",
			});
		},
		onError: (error) => {
			setServerError(error.message);
			setShowRegister(true);
		},
	});

	const registerMutation = useMutation<
		RegisterResponse,
		Error,
		RegisterRequest
	>({
		mutationFn: register,
		onSuccess: (data) => {
			Cookies.set("token", data.token, {
				expires: 7,
				secure: true,
				sameSite: "strict",
			});
			setToken(data.token);
			setUser({
				id: data.id,
				email: data.email,
				username: registerForm.username,
			});
			setShowRegister(false);
			setServerError("");
		},
		onError: (error) => {
			setServerError(error.message);
		},
	});

	function handleLoginChange(name: string, value: string) {
		setLoginForm((f) => ({ ...f, [name]: value }));
	}

	function handleLoginSubmit(e: LoginFormSubmitEvent) {
		e.preventDefault();
		setServerError("");
		const result = loginValidationSchema.safeParse(loginForm);
		if (!result.success) {
			setServerError(result.error.message);
			return;
		}
		loginMutation.mutate(loginForm);
	}

	function handleRegisterChange(name: string, value: string) {
		setRegisterForm((f) => ({ ...f, [name]: value }));
	}

	function handleRegisterSubmit(e: RegisterFormSubmitEvent) {
		e.preventDefault();
		setServerError("");
		const result = registerValidationSchema.safeParse(registerForm);
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
					title={loginMutation.isPending ? "Завантаження..." : "Вхід"}
					fields={[
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
					]}
					values={loginForm}
					onChange={handleLoginChange}
					onSubmit={handleLoginSubmit}
					submitText={loginMutation.isPending ? "Завантаження..." : "Увійти"}
					disabled={loginMutation.isPending}
					error={serverError && !showRegister ? serverError : ""}
				/>
			)}
			{showRegister && (
				<AuthForm
					title={registerMutation.isPending ? "Завантаження..." : "Реєстрація"}
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
					]}
					values={registerForm}
					onChange={handleRegisterChange}
					onSubmit={handleRegisterSubmit}
					submitText={
						registerMutation.isLoading ? "Завантаження..." : "Зареєструватися"
					}
					disabled={registerMutation.isLoading}
					error={serverError && showRegister ? serverError : ""}
				/>
			)}
		</div>
	);
}
