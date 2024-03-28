import "./Footer.css"
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function Footer() {
    const { user } = useContext(AuthContext);

    return(
        <footer className="footer">
        <div className="container">
        <div className="footer-content">
            <p>&copy; All rights reserved @2024</p>
            <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/aboutus">About us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                {!user && <Link to="/register">
                <li>
                <button className="primary">Register</button>
                </li>
                </Link>}
            </ul>
        </div>
    </div>
</footer>
    )
}

export default Footer;