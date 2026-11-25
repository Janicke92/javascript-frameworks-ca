import { useParams } from "react-router-dom";

function ProductPage() {
    const params = useParams();

    const productIdFromUrl = params.productId;

    console.log("Current URL params:", params);

    return (
        <div>
            <h1>Product details</h1>
            <p>
                Product ID: <strong>{productIdFromUrl}</strong>
            </p>
        </div>
    );
}

export default ProductPage;
