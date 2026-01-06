import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function PrivateRoute({ children }) {
    const { user } = useAuth();
    if (!user?.loggedIn) return <Navigate to="/login" replace />;
    return children;
}
