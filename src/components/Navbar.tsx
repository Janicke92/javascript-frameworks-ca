import { NavLink } from "react-router-dom";

function Navbar() {
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
        return isActive ? "font-bold" : "";
    };

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
            </ul>
        </nav>
    );
}

export default Navbar;
