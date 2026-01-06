export default function StarRating({ value = 0, size = 18, showNumber = false }) {
    const v = Math.max(0, Math.min(5, Number(value) || 0));

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => {
                    const filled = i < v;

                    return (
                        <span
                            key={i}
                            aria-hidden="true"
                            style={{ fontSize: size }}
                            className={
                                "select-none leading-none drop-shadow-sm " +
                                (filled ? "text-amber-400" : "text-gray-300")
                            }
                            title={`${v}/5`}
                        >
              ★
            </span>
                    );
                })}
            </div>

            {showNumber && (
                <span className="text-sm font-semibold text-gray-700">
          {v}/5
        </span>
            )}
        </div>
    );
}
