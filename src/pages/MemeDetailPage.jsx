import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.js";
import { getMemes } from "../api/memes.js";
import StarRating from "../components/StarRating.jsx";
import MemeCard from "../components/MemeCard.jsx";
import { useCart } from "../hooks/useCart.js";
import SkeletonGrid from "../components/SkeletonGrid.jsx";

export default function MemeDetailPage() {
    const { id } = useParams();
    const { data, loading, error } = useFetch(getMemes);
    const { addItem } = useCart();

    const meme = useMemo(() => data?.find((m) => m.id === id), [data, id]);

    const related = useMemo(() => {
        if (!data || !meme) return [];
        return data
            .filter((m) => m.category === meme.category && m.id !== meme.id)
            .slice(0, 3);
    }, [data, meme]);

    if (loading) return <SkeletonGrid />;
    if (error) return <div className="text-red-600 font-semibold">Nepodařilo se načíst memy 😢</div>;
    if (!meme) return <div className="text-gray-700">Meme nenalezen.</div>;

    const price = meme.rating * 25;

    const InfoPill = ({ label, value }) => (
        <div className="rounded-2xl p-[1px] bg-gradient-to-r from-indigo-500 to-pink-500">
            <div className="bg-white/90 rounded-2xl px-4 py-3">
                <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">{label}</div>
                <div className="text-lg font-extrabold tracking-tight text-gray-900 mt-1">{value}</div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Top bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <Link
                    to="/memes"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:underline"
                >
                    ← Zpět na seznam
                </Link>

                <div className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white w-fit">
                    Kategorie: {meme.category}
                </div>
            </div>

            {/* Main card */}
            <div className="rounded-3xl p-[1px] bg-gradient-to-r from-indigo-500 to-pink-500 shadow-lg">
                <div className="bg-white/90 rounded-3xl p-6 md:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Image */}
                        <div className="rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-4 flex items-center justify-center">
                            <img
                                src={meme.url}
                                alt={meme.name}
                                className="max-h-[420px] object-contain drop-shadow-md"
                            />
                        </div>

                        {/* Details */}
                        <div className="space-y-5">
                            <div>
                                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                                    {meme.name}
                                </h1>
                                <div className="mt-3 flex items-center gap-3">
                                    <StarRating value={meme.rating} />
                                    <div className="text-sm text-gray-600">
                                        Rating: <b>{meme.rating}</b>/5
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <InfoPill label="Cena" value={`${price} Kč`} />
                                <InfoPill label="Šířka" value={`${meme.width}px`} />
                                <InfoPill label="Výška" value={`${meme.height}px`} />
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white p-4">
                                <div className="text-sm text-gray-600">
                                    <b>Tip:</b> Cena je fiktivní a počítá se jako <b>rating × 25 Kč</b>.
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => addItem(meme)}
                                    className="flex-1 px-6 py-3 rounded-2xl font-extrabold text-white
                             bg-gradient-to-r from-indigo-600 to-pink-500 hover:opacity-95 transition shadow-lg"
                                >
                                    Přidat do košíku →
                                </button>

                                <Link
                                    to="/cart"
                                    className="flex-1 text-center px-6 py-3 rounded-2xl font-semibold
                             border border-gray-200 hover:bg-gray-50 transition"
                                >
                                    Přejít do košíku
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related */}
            <div className="space-y-4">
                <div className="flex items-end justify-between gap-3">
                    <div>
                        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Related memes</h2>
                        <p className="text-gray-600 mt-1">Další memy ze stejné kategorie.</p>
                    </div>
                </div>

                {related.length === 0 ? (
                    <div className="text-gray-600">Žádné related memy k zobrazení.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {related.map((m) => (
                            <MemeCard key={m.id} meme={m} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
