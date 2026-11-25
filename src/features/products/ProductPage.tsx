import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "./services/productApi";
import type { Product } from "./interfaces";
import { getProductPrice, getDiscountPercentage } from "./utils/productPricing";
import AddToCartButton from "../cart/components/AddToCartButton";

function ProductPage() {
    const { productId } = useParams<{ productId: string }>();

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProduct = async () => {
            if (!productId) {
                setError("Product ID is missing.");
                setIsLoading(false);
                return;
            }

            try {
                const data = await fetchProductById(productId);
                setProduct(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unexpected error occurred.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadProduct();
    }, [productId]);

    if (isLoading) {
        return <p>Loading product...</p>;
    }

    if (error) {
        return <p>Could not load product: {error}</p>;
    }

    if (!product) {
        return <p>Product not found.</p>;
    }

    const isOnSale = product.discountedPrice < product.price;
    const finalPrice = getProductPrice(product);
    const discountPercentage = getDiscountPercentage(product);

    return (
        <article>
            <h1>{product.title}</h1>

            <img
                src={product.image.url}
                alt={product.image.alt}
                className="h-80 w-full object-contain"
            />

            <p>{product.description}</p>

            <section>
                <h2>Price</h2>
                <p>{finalPrice.toFixed(2)} NOK</p>

                {isOnSale && (
                    <div>
                        <del>{product.price.toFixed(2)} NOK</del>
                        <span> -{discountPercentage}%</span>
                    </div>
                )}
            </section>
            <AddToCartButton product={product} />
            <section>
                <h2>Rating</h2>
                {product.reviews.length > 0 ? (
                    <p>{product.rating.toFixed(1)} / 5</p>
                ) : (
                    <p>No reviews yet</p>
                )}
            </section>

            {product.tags.length > 0 && (
                <section>
                    <h2>Tags</h2>
                    <ul>
                        {product.tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                        ))}
                    </ul>
                </section>
            )}

            <section>
                <h2>Reviews</h2>

                {product.reviews.length > 0 ? (
                    <ul>
                        {product.reviews.map((review) => (
                            <li key={review.id}>
                                <h3>{review.username}</h3>
                                <p>Rating: {review.rating} / 5</p>
                                <p>{review.description}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews yet.</p>
                )}
            </section>
        </article>
    );
}

export default ProductPage;
