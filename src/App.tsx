import { Routes, Route } from "react-router-dom";
import HomePage from "./features/products/HomePage";
import ContactPage from "./features/contact/ContactPage";
import ProductPage from "./features/products/ProductPage";
import NotFoundPage from "./features/errors/NotFoundPage";
import CartPage from "./features/cart/CartPage";
import CheckoutSuccessPage from "./features/cart/CheckoutSuccessPage";
import Layout from "./components/Layout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="products/:productId" element={<ProductPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route
                    path="checkout-success"
                    element={<CheckoutSuccessPage />}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default App;
