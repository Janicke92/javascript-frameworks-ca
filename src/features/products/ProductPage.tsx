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
        <article className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="relative flex items-center justify-center rounded-lg bg-surface p-6">
                    {isOnSale && (
                        <span className="absolute top-4 left-4 rounded bg-accent px-4 py-2 text-2xl font-semibold text-white">
                            -{discountPercentage}%
                        </span>
                    )}
                    <img
                        src={product.image.url}
                        alt={product.image.alt}
                        className="h-80 w-full object-contain"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-semibold underline">
                        {product.title}
                    </h1>
                    <section className="flex items-center gap-1">
                        <h2>Rating:</h2>
                        {product.reviews.length > 0 ? (
                            <p className="font-semibold">
                                {product.rating.toFixed(1)} / 5
                            </p>
                        ) : (
                            <p className="text-gray-500">No reviews yet</p>
                        )}
                    </section>

                    <section className="flex items-center gap-1  mt-4">
                        <h2 className="text-2xl">Price:</h2>
                        <p className="text-2xl">{finalPrice.toFixed(2)} NOK</p>

                        {isOnSale && (
                            <del className="ml-2 text-lg font-semibold text-accent">
                                {product.price.toFixed(2)} NOK
                            </del>
                        )}
                    </section>
                    <p className="mt-4">{product.description}</p>
                    {product.tags.length > 0 && (
                        <section className="flex items-center gap-1 mt-3">
                            <h2>Tags:</h2>
                            <ul className="flex flex-wrap gap-2">
                                {product.tags.map((tag, index) => (
                                    <li key={tag}>
                                        {tag}
                                        {index < product.tags.length - 1
                                            ? ","
                                            : ""}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                    <div className="mt-4">
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>

            <section className="mt-8">
                <h2 className="mb-4 text-2xl font-semibold">Reviews</h2>

                {product.reviews.length > 0 ? (
                    <ul className="space-y-4">
                        {product.reviews.map((review) => (
                            <li
                                key={review.id}
                                className="rounded-lg border border-border bg-background p-4"
                            >
                                <h3 className="text-xl font-semibold">
                                    {review.username}
                                </h3>
                                <p>Rating: {review.rating} / 5</p>
                                <p>{review.description}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                )}
            </section>
        </article>
    );
}

export default ProductPage;
