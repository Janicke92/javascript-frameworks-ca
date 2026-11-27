import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
    return (
        <div className="flex min-h-screen flex-col">
            <header>
                <Navbar />
            </header>

            <main className="mx-auto w-full flex-1 max-w-7xl px-4 py-8">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default Layout;
