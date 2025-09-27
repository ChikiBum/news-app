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
		<div className="w-full h-full p-4">
			<div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 h-full min-h-[500px]">
				<div className="flex-shrink-0 w-full max-w-sm lg:max-w-xs">
					<div className="w-full border rounded-lg shadow-lg bg-white dark:bg-gray-900 dark:border-gray-700 p-[50px] flex flex-col items-center justify-start min-h-[350px]">
						<span className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-4">
							Реклама
						</span>
						<div className="ads-wrapper w-full h-[250px] border border-gray-200 dark:border-gray-600 rounded-md flex items-center justify-center bg-gray-50 dark:bg-gray-800"></div>
					</div>
				</div>

				<div className="flex-shrink-0 w-full max-w-md">
					<div className="p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-900 dark:border-gray-700">
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
								submitText={
									loginMutation.isPending ? "Завантаження..." : "Увійти"
								}
								disabled={loginMutation.isPending}
								error={serverError && !showRegister ? serverError : ""}
							/>
						)}
						{showRegister && (
							<AuthForm
								title={
									registerMutation.isPending ? "Завантаження..." : "Реєстрація"
								}
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
									registerMutation.isPending
										? "Завантаження..."
										: "Зареєструватися"
								}
								disabled={registerMutation.isPending}
								error={serverError && showRegister ? serverError : ""}
							/>
						)}
					</div>
				</div>

				<div className="flex-shrink-0 w-full max-w-sm lg:max-w-xs">
					<div className="w-full border rounded-lg shadow-lg bg-white dark:bg-gray-900 dark:border-gray-700 p-[50px] flex flex-col items-center justify-start min-h-[350px]">
						<span className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-4">
							Реклама
						</span>
						<div className="ads-wrapper w-full h-[250px] border border-gray-200 dark:border-gray-600 rounded-md flex items-center justify-center bg-gray-50 dark:bg-gray-800"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
