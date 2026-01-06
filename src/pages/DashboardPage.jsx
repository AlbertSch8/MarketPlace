import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.js";
import { getMemes } from "../api/memes.js";
import { useCart } from "../hooks/useCart.js";

export default function DashboardPage() {
    const { data, loading, error } = useFetch(getMemes);
    const { totalCount } = useCart();

    if (loading) return <div className="text-center text-gray-700">Načítám dashboard…</div>;
    if (error) return <div className="text-center text-red-600 font-semibold">Nepodařilo se načíst memy 😢</div>;
    if (!data) return null;

    const top = [...data].sort((a, b) => b.rating - a.rating)[0];
    const categories = new Set(data.map((m) => m.category));

    const Stat = ({ title, value, subtitle, badge, grad }) => (
        <div className={`rounded-3xl p-[1px] ${grad} shadow-lg`}>
            <div className="bg-white/90 rounded-3xl p-6 h-full">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="text-sm text-gray-500 font-semibold">{title}</div>
                        <div className="text-3xl font-extrabold tracking-tight mt-2">{value}</div>
                        {subtitle && <div className="text-xs text-gray-500 mt-2">{subtitle}</div>}
                    </div>
                    {badge && (
                        <div className="text-xs font-bold px-3 py-1 rounded-full bg-gray-900 text-white">
                            {badge}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-2">Rychlý přehled nad aplikací.</p>
                </div>

                <Link
                    to="/memes"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-2xl font-extrabold text-white
                     bg-gradient-to-r from-indigo-600 to-pink-500 hover:opacity-95 transition shadow-lg"
                >
                    Přejít na memy →
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <Stat
                    title="Počet memů"
                    value={data.length}
                    subtitle="Načteno z API imgflip"
                    badge="API"
                    grad="bg-gradient-to-r from-indigo-500 to-cyan-400"
                />
                <Stat
                    title="Počet kategorií"
                    value={categories.size}
                    subtitle="Odvozeno z dat"
                    badge="DATA"
                    grad="bg-gradient-to-r from-purple-500 to-pink-400"
                />
                <Stat
                    title="V košíku"
                    value={totalCount}
                    subtitle="Context + localStorage"
                    badge="CART"
                    grad="bg-gradient-to-r from-emerald-500 to-lime-400"
                />
                <Stat
                    title="Top meme"
                    value={top.name}
                    subtitle="Nejvyšší rating"
                    badge="TOP"
                    grad="bg-gradient-to-r from-orange-500 to-amber-400"
                />
            </div>
        </div>
    );
}
