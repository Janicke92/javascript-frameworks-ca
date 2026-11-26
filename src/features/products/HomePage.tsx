import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "./services/productApi";
import type { Product } from "./interfaces";
import ProductCard from "./components/ProductCard";

function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
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

        loadProducts();
    }, []);

    const searchedProducts = useMemo(() => {
        if (!searchTerm.trim()) {
            return products;
        }

        const lowerSearchTerm = searchTerm.toLowerCase();

        return products.filter(
            (product) =>
                product.title.toLowerCase().includes(lowerSearchTerm) ||
                product.description.toLowerCase().includes(lowerSearchTerm) ||
                product.tags.some((tag) =>
                    tag.toLowerCase().includes(lowerSearchTerm),
                ),
        );
    }, [products, searchTerm]);

    if (isLoading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>Could not load products: {error}</p>;
    }
    return (
        <div>
            <p>Welcome to our online store!</p>

            <div>
                <label htmlFor="productSearch">Search products: </label>
                <input
                    type="text"
                    id="productSearch"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <h2>Our Products</h2>

                {searchedProducts.length > 0 ? (
                    searchedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p>No products match your search.</p>
                )}
            </section>
        </div>
    );
}

export default HomePage;
