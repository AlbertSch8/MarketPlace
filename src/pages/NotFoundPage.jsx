import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="flex justify-center">
            <div className="w-full max-w-2xl">
                <div className="rounded-3xl p-[1px] bg-gradient-to-r from-indigo-500 to-pink-500 shadow-lg">
                    <div className="bg-white/90 rounded-3xl p-10 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-extrabold text-white
                            bg-gradient-to-r from-indigo-600 to-pink-500 shadow-md">
                            404 • Not Found
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mt-6">
                            Tahle stránka neexistuje
                        </h1>

                        <p className="text-gray-600 mt-3">
                            Možná jsi zadal špatnou adresu nebo byla stránka přesunutá.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                to="/dashboard"
                                className="px-6 py-3 rounded-2xl font-extrabold text-white
                           bg-gradient-to-r from-indigo-600 to-pink-500 hover:opacity-95 transition shadow-lg"
                            >
                                Zpět na dashboard →
                            </Link>

                            <Link
                                to="/memes"
                                className="px-6 py-3 rounded-2xl font-semibold border border-gray-200 hover:bg-gray-50 transition"
                            >
                                Přejít na memy
                            </Link>
                        </div>

                        <div className="mt-8 text-xs text-gray-500">
                            Tip: zkontroluj URL nebo použij menu nahoře.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
