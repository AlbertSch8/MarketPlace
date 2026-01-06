export default function SkeletonGrid({ count = 8 }) {
    const items = Array.from({ length: count });

    return (
        <div className="space-y-6">
            {/* top fake filter bar */}
            <div className="rounded-3xl p-[1px] bg-gradient-to-r from-indigo-500 to-pink-500 shadow-lg">
                <div className="bg-white/90 rounded-3xl p-4">
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="h-12 flex-1 rounded-2xl bg-gray-100 overflow-hidden relative">
                            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                        </div>
                        <div className="h-12 w-full md:w-56 rounded-2xl bg-gray-100 overflow-hidden relative">
                            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                        </div>
                        <div className="h-12 w-full md:w-56 rounded-2xl bg-gray-100 overflow-hidden relative">
                            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                        </div>
                    </div>
                </div>
            </div>

            {/* cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {items.map((_, idx) => (
                    <div
                        key={idx}
                        className="bg-white/90 border border-gray-200 rounded-3xl p-4 shadow-sm overflow-hidden"
                    >
                        {/* image placeholder */}
                        <div className="h-44 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                        </div>

                        {/* title */}
                        <div className="mt-4 space-y-3">
                            <div className="h-4 w-3/4 rounded-full bg-gray-200 relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                            </div>

                            {/* category pill */}
                            <div className="h-6 w-24 rounded-full bg-gray-200 relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                            </div>

                            {/* rating */}
                            <div className="h-4 w-28 rounded-full bg-gray-200 relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                            </div>

                            {/* buttons */}
                            <div className="mt-2 flex gap-2">
                                <div className="h-10 flex-1 rounded-2xl bg-gray-200 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                                </div>
                                <div className="h-10 flex-1 rounded-2xl bg-gray-200 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* local keyframes without touching index.css */}
            <style>
                {`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
            </style>
        </div>
    );
}
