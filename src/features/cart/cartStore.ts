import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartState } from "./interfaces";

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],

            addItem: (product) =>
                set((state) => {
                    const existingItem = state.items.find(
                        (item) => item.productId === product.productId,
                    );

                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.productId === product.productId
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item,
                            ),
                        };
                    }

                    return {
                        items: [...state.items, { ...product, quantity: 1 }],
                    };
                }),

            removeItem: (productId) =>
                set((state) => ({
                    items: state.items.filter(
                        (item) => item.productId !== productId,
                    ),
                })),

            updateQuantity: (productId, quantity) =>
                set((state) => ({
                    items:
                        quantity <= 0
                            ? state.items.filter(
                                  (item) => item.productId !== productId,
                              )
                            : state.items.map((item) =>
                                  item.productId === productId
                                      ? { ...item, quantity }
                                      : item,
                              ),
                })),

            clearCart: () => set({ items: [] }),
        }),
        {
            name: "shopping-cart-storage",
        },
    ),
);
