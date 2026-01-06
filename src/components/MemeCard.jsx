import { Link } from "react-router-dom";
import StarRating from "./StarRating.jsx";
import { useCart } from "../hooks/useCart.js";

export default function MemeCard({ meme }) {
    const { addItem } = useCart();

    return (
        <div className="bg-white/90 border border-gray-200 rounded-3xl p-4 shadow-sm hover:shadow-lg transition">
            <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-3 flex items-center justify-center h-44">
                <img
                    src={meme.url}
                    alt={meme.name}
                    className="max-h-40 object-contain drop-shadow-sm"
                    loading="lazy"
                />
            </div>

            <div className="mt-4 space-y-1">
                <div className="font-extrabold tracking-tight leading-snug line-clamp-2 text-gray-900">
                    {meme.name}
                </div>

                <div className="inline-flex items-center text-xs font-bold px-3 py-1 rounded-full
                        bg-gradient-to-r from-indigo-600 to-pink-500 text-white w-fit">
                    {meme.category}
                </div>

                <div className="mt-2">
                    <StarRating value={meme.rating} />
                </div>
            </div>

            <div className="mt-4 flex gap-2">
                <Link
                    to={`/memes/${meme.id}`}
                    className="flex-1 text-center px-4 py-2 rounded-2xl font-semibold border border-gray-200 hover:bg-gray-50 transition"
                >
                    Detail
                </Link>
                <button
                    onClick={() => addItem(meme)}
                    className="flex-1 px-4 py-2 rounded-2xl font-extrabold text-white
                     bg-gradient-to-r from-indigo-600 to-pink-500 hover:opacity-95 transition shadow-md"
                >
                    + Košík
                </button>
            </div>
        </div>
    );
}
