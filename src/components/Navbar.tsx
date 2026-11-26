import { Link, NavLink } from "react-router-dom";
import { useCartStore } from "../features/cart/cartStore";

function Navbar() {
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
        return isActive ? "font-bold" : "";
    };

    const items = useCartStore((state) => state.items);

    const cartCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="flex items-center justify-center min-[420px]:justify-between border-b border-border bg-slate-100 px-6 py-4">
            <Link
                to="/"
                className="hidden min-[420px]:block text-3xl font-medium"
            >
                JSF Store
            </Link>
            <ul className="flex items-center gap-6">
                <li>
                    <NavLink to="/" className={getNavLinkClass}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className={getNavLinkClass}>
                        Contact
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/cart" className={getNavLinkClass}>
                        Cart
                        <span className="relative -top-2 inline-flex size-5 items-center justify-center rounded-full bg-slate-700 px-1.5 text-white">
                            {cartCount}
                        </span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
