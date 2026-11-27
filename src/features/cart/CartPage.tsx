import { useCartStore } from "./cartStore";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Toast from "./components/Toast";
import { Trash2 } from "lucide-react";

function CartPage() {
    const items = useCartStore((state) => state.items);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeItem = useCartStore((state) => state.removeItem);
    const clearCart = useCartStore((state) => state.clearCart);
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);

    const totalPrice = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );

    const handleCheckout = () => {
        clearCart();
        navigate("/checkout-success");
    };

    const handleRemoveItem = (productId: string) => {
        removeItem(productId);
        setShowToast(true);
    };

    useEffect(() => {
        if (!showToast) return;

        const timer = setTimeout(() => {
            setShowToast(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [showToast]);

    return (
        <>
            {items.length === 0 ? (
                <div>
                    <h1>Shopping Cart</h1>
                    <p>Your cart is empty.</p>
                </div>
            ) : (
                <section className="max-w-4xl">
                    <h1 className="mb-6 text-3xl">Shopping Cart</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                        <ul className="max-w-xl lg:col-span-2">
                            {items.map((item) => (
                                <li
                                    key={item.productId}
                                    className="h-42 flex gap-4 rounded-lg border border-border bg-background p-4 mb-4"
                                >
                                    <div className="shrink-0 bg-surface p-2">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-24 w-24 object-contain"
                                        />
                                    </div>

                                    <div>
                                        <div>
                                            <h2 className="text-lg font-semibold">
                                                {item.title}
                                            </h2>
                                            <p>
                                                Price: {item.price.toFixed(2)}{" "}
                                                NOK
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3 mt-6">
                                            <div className="flex w-fit items-center divide-x divide-border rounded border border-border">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.productId,
                                                            item.quantity - 1,
                                                        )
                                                    }
                                                    className="h-8 w-8 cursor-pointer hover:bg-red-100"
                                                >
                                                    -
                                                </button>

                                                <span className="flex h-8 w-8 items-center justify-center">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.productId,
                                                            item.quantity + 1,
                                                        )
                                                    }
                                                    className="h-8 w-8 cursor-pointer hover:bg-green-100"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemoveItem(
                                                            item.productId,
                                                        )
                                                    }
                                                    aria-label={`Remove ${item.title} from cart`}
                                                    className="cursor-pointer text-slate-500 transition-colors hover:text-accent"
                                                >
                                                    <Trash2 size={25} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="h-42  w-full max-w-xl rounded-lg border border-border bg-background p-4 lg:sticky lg:top-6 lg:self-start">
                            <h2 className="mb-4 text-xl font-semibold">
                                Order Summary
                            </h2>
                            <div className="mb-4 flex justify-between">
                                <span>Total</span>
                                <span className="font-semibold">
                                    {totalPrice.toFixed(2)} NOK
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={handleCheckout}
                                className="w-full cursor-pointer rounded bg-green-200 px-4 py-3 font-semibold text-slate-900 transition-colors hover:bg-green-600 hover:text-white"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {showToast && <Toast message="Item removed from cart!" />}
        </>
    );
}

export default CartPage;
