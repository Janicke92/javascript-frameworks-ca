import { Link } from "react-router-dom";
import type { Product } from "../interfaces";
import {
    getProductPrice,
    getDiscountPercentage,
} from "../utils/productPricing";

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    const isOnSale = product.discountedPrice < product.price;
    const finalPrice = getProductPrice(product);
    const discountPercentage = getDiscountPercentage(product);

    return (
        <article>
            <div className="relative">
                <Link to={`/products/${product.id}`}>
                    <img
                        src={product.image.url}
                        alt={product.image.alt}
                        className="h-48 w-full object-contain"
                    />
                </Link>

                {isOnSale && (
                    <span className="absolute top-2 left-2 rounded bg-red-600 px-2 py-1 text-sm text-white">
                        -{discountPercentage}%
                    </span>
                )}
            </div>

            <h2>
                <Link to={`/products/${product.id}`}>{product.title}</Link>
            </h2>

            {product.reviews.length > 0 ? (
                <p>Rating: {product.rating.toFixed(1)} / 5</p>
            ) : (
                <p>No reviews yet</p>
            )}

            <p>{finalPrice.toFixed(2)} NOK</p>

            {isOnSale && <del>{product.price.toFixed(2)} NOK</del>}
        </article>
    );
}

export default ProductCard;
