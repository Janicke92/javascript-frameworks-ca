import { Link, NavLink } from "react-router-dom";
import { useCartStore } from "../features/cart/cartStore";

function Navbar() {
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
        return isActive ? "font-bold" : "";
    };

    const items = useCartStore((state) => state.items);

    const cartCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="border-b border-border bg-surface">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-4 min-[420px]:justify-between">
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
            </div>
        </nav>
    );
}

export default Navbar;
