import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	console.log("isAuthenticated ", isAuthenticated);
	if (!isAuthenticated) {
		return <Navigate to="/" replace />;
	}
	return children;
}
