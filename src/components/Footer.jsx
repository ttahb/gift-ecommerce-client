import "./Footer.css"
function Footer() {
    return(
        <footer className="footer">
        <div className="container">
        <div className="footer-content">
            <p>&copy; 2024 Todos los derechos reservados</p>
            <ul className="footer-links">
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Acerca de nosotros</a></li>
                <li><a href="#">Contacto</a></li>
            </ul>
        </div>
    </div>
</footer>
    )
}

export default Footer;