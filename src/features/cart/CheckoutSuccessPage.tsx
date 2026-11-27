import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

function CheckoutSuccessPage() {
    return (
        <section className="flex min-h-[30vh] flex-col items-center justify-center text-center">
            <CheckCircle2 size={120} className="mb-6 text-green-600" />
            <h1 className="mb-4 text-3xl font-semibold">Order successful!</h1>
            <p className="mb-8 text-slate-600">Thank you for your purchase!</p>
            <Link
                to="/"
                className="rounded-lg bg-green-200 px-6 py-3 font-semibold text-slate-900 transition-colors hover:bg-green-600 hover:text-white"
            >
                Back to Shop
            </Link>
        </section>
    );
}

export default CheckoutSuccessPage;
