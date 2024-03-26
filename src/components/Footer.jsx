import "./Footer.css"
import { Link } from "react-router-dom";

function Footer() {
    return(
        <footer className="footer">
        <div className="container">
        <div className="footer-content">
            <p>&copy; All rights reserved @2024</p>
            <ul className="footer-links">
                <li><a href="#">Home</a></li>
                <li><a href="/aboutus">About us</a></li>
                <li> <a href="/contactus">Contact Us</a></li>
                <Link to="/register">
                <li>
                <button className="primary">Register</button>
                </li>
                </Link>
            </ul>
        </div>
    </div>
</footer>
    )
}

export default Footer;