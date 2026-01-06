import { useMemo, useState, useEffect } from "react";
import { getMemes } from "../api/memes.js";
import { useFetch } from "../hooks/useFetch.js";
import MemeCard from "../components/MemeCard.jsx";
import SkeletonGrid from "../components/SkeletonGrid.jsx";

export default function MemesPage() {
    const { data, loading, error } = useFetch(getMemes);

    const [query, setQuery] = useState("");
    const [debounced, setDebounced] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("rating");

    useEffect(() => {
        const t = setTimeout(() => setDebounced(query), 350);
        return () => clearTimeout(t);
    }, [query]);

    const categories = useMemo(() => {
        if (!data) return ["All"];
        return ["All", ...Array.from(new Set(data.map((m) => m.category)))];
    }, [data]);

    const filtered = useMemo(() => {
        if (!data) return [];

        let arr = data;

        if (debounced.trim()) {
            const q = debounced.toLowerCase();
            arr = arr.filter((m) => m.name.toLowerCase().includes(q));
        }

        if (category !== "All") {
            arr = arr.filter((m) => m.category === category);
        }

        arr = [...arr];
        if (sort === "name") arr.sort((a, b) => a.name.localeCompare(b.name));
        if (sort === "rating") arr.sort((a, b) => b.rating - a.rating);
        if (sort === "size") arr.sort((a, b) => b.width * b.height - a.width * a.height);

        return arr;
    }, [data, debounced, category, sort]);

    if (loading) return <SkeletonGrid />;
    if (error) return <div className="text-red-600 font-semibold">Nepodařilo se načíst memy 😢</div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Memes</h1>
                    <p className="text-gray-600 mt-2">
                        Vyhledávej, filtruj a přidávej do košíku.
                    </p>
                </div>

                <div className="text-sm font-semibold text-gray-700">
                    Výsledků:{" "}
                    <span className="px-3 py-1 rounded-full bg-gray-900 text-white">
            {filtered.length}
          </span>
                </div>
            </div>

            {/* Filter panel */}
            <div className="rounded-3xl p-[1px] bg-gradient-to-r from-indigo-500 to-pink-500 shadow-lg">
                <div className="bg-white/90 rounded-3xl p-4 md:p-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {/* Search */}
                        <div className="md:col-span-1">
                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                                Hledání
                            </label>
                            <input
                                className="mt-2 w-full rounded-2xl px-4 py-3 bg-white border border-gray-200
                           focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                                placeholder="Název meme…"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <div className="text-xs text-gray-500 mt-2">
                                Debounce: 350ms • case-insensitive
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                                Kategorie
                            </label>
                            <select
                                className="mt-2 w-full rounded-2xl px-4 py-3 bg-white border border-gray-200
                           focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort */}
                        <div>
                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                                Řazení
                            </label>
                            <select
                                className="mt-2 w-full rounded-2xl px-4 py-3 bg-white border border-gray-200
                           focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                            >
                                <option value="name">Název A–Z</option>
                                <option value="rating">Rating (desc)</option>
                                <option value="size">Velikost (width×height)</option>
                            </select>
                        </div>
                    </div>

                    {/* Quick actions */}
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => {
                                setQuery("");
                                setCategory("All");
                                setSort("rating");
                            }}
                            className="px-4 py-2 rounded-2xl font-semibold border border-gray-200 hover:bg-gray-50 transition"
                        >
                            Reset filtrů
                        </button>

                        <div className="ml-auto text-xs text-gray-500">
                            Tip: řazení podle velikosti ukáže „největší“ obrázky nahoře.
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filtered.map((m) => (
                    <MemeCard key={m.id} meme={m} />
                ))}
            </div>
        </div>
    );
}
