import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function LoginPage() {
    const { login } = useAuth();
    const nav = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        setErr("");

        if (username.trim().length < 3) return setErr("Username musí mít alespoň 3 znaky.");
        if (password.trim().length < 5) return setErr("Password musí mít alespoň 5 znaků.");

        login(username.trim());
        nav("/dashboard");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl p-8 text-white">
                    <h1 className="text-3xl font-extrabold tracking-tight text-center">Welcome 👋</h1>
                    <p className="text-white/80 mt-2 text-center">
                        Přihlas se do Meme Marketplace Pro
                    </p>

                    <form onSubmit={onSubmit} className="mt-8 space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-white/90">Username</label>
                            <input
                                className="mt-1 w-full rounded-xl px-4 py-2 bg-white/10 border border-white/20 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="min. 3 znaky"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-white/90">Password</label>
                            <input
                                type="password"
                                className="mt-1 w-full rounded-xl px-4 py-2 bg-white/10 border border-white/20 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="min. 5 znaků"
                            />
                        </div>

                        {err && (
                            <div className="text-sm bg-red-500/20 border border-red-500/30 text-red-100 rounded-xl px-3 py-2">
                                {err}
                            </div>
                        )}

                        <button className="w-full py-3 rounded-xl font-extrabold bg-white text-gray-900 hover:bg-white/90 transition shadow-sm">
                            Přihlásit
                        </button>

                        <div className="text-xs text-white/70 text-center">
                            Tip: zadej libovolné údaje splňující validaci 🙂
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
