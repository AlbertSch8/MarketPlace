import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useLocalStorage("user", {
        username: "",
        loggedIn: false,
    });

    const login = (username) => setUser({ username, loggedIn: true });
    const logout = () => setUser({ username: "", loggedIn: false });

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
