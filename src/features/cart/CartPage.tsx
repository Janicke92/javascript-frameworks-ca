import { useCartStore } from "./cartStore";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Toast from "./components/Toast";

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
        }, 2500);

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
                <section>
                    <h1>Shopping Cart</h1>

                    <ul>
                        {items.map((item) => (
                            <li key={item.productId}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-24 w-24 object-contain"
                                />
                                <h2>{item.title}</h2>
                                <p>Price: {item.price.toFixed(2)} NOK</p>

                                <div>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateQuantity(
                                                item.productId,
                                                item.quantity - 1,
                                            )
                                        }
                                    >
                                        -
                                    </button>

                                    <span>Quantity: {item.quantity}</span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateQuantity(
                                                item.productId,
                                                item.quantity + 1,
                                            )
                                        }
                                    >
                                        +
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveItem(item.productId)
                                        }
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <p>Total: {totalPrice.toFixed(2)} NOK</p>

                    <button type="button" onClick={handleCheckout}>
                        Checkout
                    </button>
                </section>
            )}

            {showToast && <Toast message="Item removed from cart" />}
        </>
    );
}

export default CartPage;
