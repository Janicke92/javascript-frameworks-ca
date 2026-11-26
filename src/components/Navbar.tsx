import { NavLink } from "react-router-dom";
import { useCartStore } from "../features/cart/cartStore";

function Navbar() {
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
        return isActive ? "font-bold" : "";
    };

    const items = useCartStore((state) => state.items);

    const cartCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav>
            <ul>
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
                        Cart ({cartCount})
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
