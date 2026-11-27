import { useCartStore } from "../cartStore";
import type { Product } from "../../products/interfaces";
import { getProductPrice } from "../../products/utils/productPricing";

interface AddToCartButtonProps {
    product: Product;
}

function AddToCartButton({ product }: AddToCartButtonProps) {
    const addItem = useCartStore((state) => state.addItem);

    return (
        <button
            type="button"
            className="mt-6 cursor-pointer rounded-lg bg-green-200 px-6 py-3 font-semibold text-slate-900 transition-colors hover:bg-green-600 hover:text-white"
            onClick={() =>
                addItem({
                    productId: product.id,
                    title: product.title,
                    price: getProductPrice(product),
                    image: product.image.url,
                    quantity: 1,
                })
            }
        >
            Add to Cart
        </button>
    );
}

export default AddToCartButton;
