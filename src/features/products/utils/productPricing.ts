import type { Product } from "../interfaces";

export function getProductPrice(product: Product): number {
    return product.discountedPrice < product.price
        ? product.discountedPrice
        : product.price;
}

export function getDiscountPercentage(product: Product): number {
    if (product.price <= 0) {
        return 0;
    }

    const finalPrice = getProductPrice(product);

    return Math.round(((product.price - finalPrice) / product.price) * 100);
}
