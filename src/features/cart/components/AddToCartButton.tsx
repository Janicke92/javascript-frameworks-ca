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
