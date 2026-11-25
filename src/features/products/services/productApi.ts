import type { Product, ProductResponse, ProductsResponse } from "../interfaces";

const API_URL = "https://v2.api.noroff.dev/online-shop";

export async function fetchProducts() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch products: ${response.status} ${response.statusText}`,
        );
    }

    const result: ProductsResponse = await response.json();

    return result.data;
}

export async function fetchProductById(productId: string): Promise<Product> {
    const response = await fetch(`${API_URL}/${productId}`);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch product: ${response.status} ${response.statusText}`,
        );
    }

    const result: ProductResponse = await response.json();

    return result.data;
}
