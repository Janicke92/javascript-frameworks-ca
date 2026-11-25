export interface CartItem {
    productId: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
    addItem: (product: CartItem) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
}
