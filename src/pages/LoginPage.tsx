import { useUserStore } from "../store/userStore";

function LoginPage() {
	const user = useUserStore((state) => state.user);
	const setUser = useUserStore((state) => state.setUser);

	return (
		<div>
			<div>Зараз користувач: {user ? user.name : "Немає"}</div>
			<button
				type="button"
				onClick={() =>
					setUser({ id: "1", name: "Ivan", email: "ivan@email.com" })
				}
			>
				Залогінити "Ivan"
			</button>
			<button type="button" onClick={() => setUser(null)}>
				Вийти
			</button>
		</div>
	);
}
export default LoginPage;
