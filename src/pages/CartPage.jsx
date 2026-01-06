import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart.js";

export default function CartPage() {
    const { items, addItem, decreaseCount, removeItem, clearCart, getTotalPrice } = useCart();

    const total = getTotalPrice();

    if (!items.length) {
        return (
            <div className="text-center py-16">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Košík</h1>
                <p className="text-gray-600 mt-2">Košík je prázdný. Přidej nějaké meme 😄</p>
                <Link
                    to="/memes"
                    className="inline-block mt-6 px-6 py-3 rounded-2xl font-extrabold text-white
                     bg-gradient-to-r from-indigo-600 to-pink-500 hover:opacity-95 transition shadow-lg"
                >
                    Přejít na memy →
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Košík</h1>
                    <p className="text-gray-600 mt-2">Cena = rating × 25 Kč</p>
                </div>

                <button
                    onClick={clearCart}
                    className="px-4 py-2 rounded-2xl font-semibold border border-gray-200 hover:bg-gray-50 transition"
                >
                    Vyprázdnit košík
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((i) => (
                        <div key={i.id} className="bg-white/90 border border-gray-200 rounded-3xl p-4 shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="w-full sm:w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center">
                                    <img src={i.url} alt={i.name} className="max-h-20 object-contain" />
                                </div>

                                <div className="flex-1">
                                    <div className="font-extrabold tracking-tight text-gray-900">{i.name}</div>
                                    <div className="text-sm text-gray-600 mt-1">
                                        Rating: <b>{i.rating}</b> • Cena/kus: <b>{i.rating * 25} Kč</b>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        Položka celkem: <b>{i.count * i.rating * 25} Kč</b>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => decreaseCount(i.id)}
                                        className="w-10 h-10 rounded-2xl border border-gray-200 hover:bg-gray-50 transition font-bold"
                                    >
                                        –
                                    </button>
                                    <div className="w-10 text-center font-extrabold">{i.count}</div>
                                    <button
                                        onClick={() => addItem(i)}
                                        className="w-10 h-10 rounded-2xl border border-gray-200 hover:bg-gray-50 transition font-bold"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={() => removeItem(i.id)}
                                    className="px-4 py-2 rounded-2xl font-semibold text-white
                             bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-95 transition shadow-sm"
                                >
                                    Odebrat
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="rounded-3xl p-[1px] bg-gradient-to-r from-indigo-500 to-pink-500 shadow-lg h-fit">
                    <div className="bg-white/90 rounded-3xl p-6">
                        <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                            Souhrn objednávky
                        </div>

                        <div className="mt-4 space-y-3 text-gray-800">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Počet položek</span>
                                <span className="font-extrabold">{items.reduce((s, x) => s + x.count, 0)}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Mezisoučet</span>
                                <span className="font-extrabold">{total} Kč</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Doprava</span>
                                <span className="font-extrabold">0 Kč</span>
                            </div>

                            <div className="h-px bg-gray-200 my-2" />

                            <div className="flex items-center justify-between text-lg">
                                <span className="font-extrabold">Celkem</span>
                                <span className="font-extrabold">{total} Kč</span>
                            </div>
                        </div>

                        <button
                            className="mt-6 w-full px-6 py-3 rounded-2xl font-extrabold text-white
                         bg-gradient-to-r from-indigo-600 to-pink-500 hover:opacity-95 transition shadow-lg"
                            onClick={() => alert("Mock checkout ✅ (jen demo)")}
                        >
                            Pokračovat k platbě →
                        </button>

                        <Link
                            to="/memes"
                            className="block text-center mt-3 text-sm font-semibold text-gray-700 hover:underline"
                        >
                            Přidat další memy
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
