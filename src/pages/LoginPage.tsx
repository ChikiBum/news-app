import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { login, register } from "../api/mockApi";
import AuthForm from "../components/AuthForm";
import { useAuthStore } from "../store/authStore";
import { loginSchema } from "../validation/loginSchema";

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

	interface LoginFormSubmitEvent extends React.FormEvent<HTMLFormElement> {}

	interface RegisterFormSubmitEvent extends React.FormEvent<HTMLFormElement> {}

	const loginMutation = useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			const typedData = data as { token: string };
			setToken(typedData.token);
			const userData = JSON.parse(atob(typedData.token));
			setUser(userData);
		},
		onError: (error) => {
			setServerError(error.message);
			setShowRegister(true);
		},
	});

	const registerMutation = useMutation({
		mutationFn: register,
		onSuccess: (data) => {
			const typedData = data as { token: string };
			setToken(typedData.token);
			const userData = JSON.parse(atob(typedData.token));
			setUser(userData);
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
		registerMutation.mutate(registerForm);
	}

	return (
		<div
			className="p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-900 dark:border-gray-700
			flex flex-col center items-center"
		>
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
