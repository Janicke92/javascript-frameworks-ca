import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div>
            <h1>404 - Page not found</h1>
            <p>Sorry, we could not find the page you were looking for.</p>
            <Link to="/">Back to home</Link>
        </div>
    );
}

export default NotFoundPage;
