import { createContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [items, setItems] = useLocalStorage("cart", []);

    const addItem = (meme) => {
        setItems((prev) => {
            const found = prev.find((x) => x.id === meme.id);
            if (found) {
                return prev.map((x) =>
                    x.id === meme.id ? { ...x, count: x.count + 1 } : x
                );
            }
            return [...prev, { ...meme, count: 1 }];
        });
    };

    const removeItem = (id) => setItems((prev) => prev.filter((x) => x.id !== id));

    const decreaseCount = (id) => {
        setItems((prev) =>
            prev
                .map((x) => (x.id === id ? { ...x, count: x.count - 1 } : x))
                .filter((x) => x.count > 0)
        );
    };

    const clearCart = () => setItems([]);

    const getTotalPrice = () =>
        items.reduce((sum, x) => sum + x.count * ((x.rating ?? 1) * 25), 0);

    const totalCount = items.reduce((sum, x) => sum + x.count, 0);

    const value = useMemo(
        () => ({
            items,
            addItem,
            removeItem,
            decreaseCount,
            clearCart,
            getTotalPrice,
            totalCount,
        }),
        [items]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
