import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

export default function Navbar() {
    const { user, logout } = useAuth();
    const { totalCount } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const active = (path) =>
        location.pathname.startsWith(path)
            ? "ring-2 ring-indigo-400 bg-indigo-50"
            : "hover:bg-gray-50";

    const onLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-purple-50">
            {/* HEADER */}
            <header className="border-b bg-white/80 backdrop-blur shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">

                    {/* LOGO */}
                    <div className="rounded-2xl p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
                        <div className="text-xl font-extrabold tracking-tight">
                            Meme Marketplace Pro
                        </div>
                        <div className="text-xs opacity-90 mt-1">
                            React · Router · Context · API
                        </div>
                    </div>

                    {/* NAV */}
                    <nav className="flex justify-center gap-4 flex-wrap">
                        <Link
                            to="/dashboard"
                            className={`rounded-2xl border bg-white px-6 py-4 shadow text-center transition ${active(
                                "/dashboard"
                            )}`}
                        >
                            <div className="font-bold text-gray-900">Dashboard</div>
                            <div className="text-xs text-gray-500">
                                Přehled aplikace
                            </div>
                        </Link>

                        <Link
                            to="/memes"
                            className={`rounded-2xl border bg-white px-6 py-4 shadow text-center transition ${active(
                                "/memes"
                            )}`}
                        >
                            <div className="font-bold text-gray-900">Memes</div>
                            <div className="text-xs text-gray-500">
                                Prohlížení nabídky
                            </div>
                        </Link>

                        <Link
                            to="/cart"
                            className={`rounded-2xl border bg-white px-6 py-4 shadow text-center transition ${active(
                                "/cart"
                            )}`}
                        >
                            <div className="font-bold text-gray-900">Košík</div>
                            <div className="text-xs text-gray-500">
                                Položek: <span className="font-semibold">{totalCount}</span>
                            </div>
                        </Link>
                    </nav>

                    {/* USER */}
                    <div className="rounded-2xl p-4 bg-white shadow flex items-center justify-between gap-4">
                        <div>
                            <div className="font-semibold text-gray-900">
                                👤 {user?.username}
                            </div>
                            <div className="text-xs text-gray-500">
                                Přihlášený uživatel
                            </div>
                        </div>

                        <button
                            onClick={onLogout}
                            className="px-5 py-2 rounded-xl font-semibold text-white
                         bg-gradient-to-r from-red-500 to-pink-500
                         hover:opacity-90 transition shadow"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* CONTENT */}
            <main className="max-w-7xl mx-auto px-6 py-10">
                {/* jemný barevný podklad pod obsahem */}
                <div className="rounded-3xl bg-white/80 shadow-xl p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
