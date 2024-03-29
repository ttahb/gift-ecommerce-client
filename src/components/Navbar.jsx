import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import Logo from "../../public/imalogotipo-pirineos-gourmet-negro.png"
import shopingBasket from "../assets/shopping-basket.png"
import { CartContext } from "../context/cart.context";

function Navbar() {
  const { user, logOutUser, isLoggedIn } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [ userId, setUserId ] = useState(null);
  const { basketLength, setBasketContentLength } = useContext(CartContext);
  const navigate = useNavigate()
  

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogOut = () => {
    logOutUser();
    navigate('/');
  }

  useEffect(() => {
    if(user){
      setUserId(user.userId)
    }
  }, [user])

  useEffect(() => {
    setBasketContentLength(userId);
  },[userId])

  return (
    <nav>
      <div>
        <Link to="/"> <img id="logo" src={Logo} /> </Link>
      </div>

      <div className="menu-container">

        <div className={`hamburger ${showMenu ? 'rotate-show' : 'rotate-hide'}`} onClick={toggleMenu}>
          <div className="_layer -top"></div>
          <div className="_layer -mid"></div>
          <div className="_layer -bottom"></div>
        </div>

        {/* Show this below in the hamburger menu  */}

        <div className={`menuppal ${showMenu ? 'active' : ''}`}>
          <ul>
            <Link to="/" onClick={toggleMenu}>
              <li className="">Home</li>
            </Link>
            
          {isLoggedIn && (
            <Link to={`/users/${userId}`} onClick={toggleMenu}>
              <li>Profile</li>
            </Link>
          )}
            
            <Link to="/products" onClick={toggleMenu}>
              <li>Products</li>
            </Link>
            
            <Link to="/aboutus" onClick={toggleMenu}>
              <li>About Us</li>
            </Link>
            
            <Link to="/contact" onClick={toggleMenu}>
              <li>Contact Us</li>
            </Link>
            
            { !isLoggedIn && (
            <>
            <Link to="/register" onClick={toggleMenu}>
              <li>
                <button className="primary">Register</button>
              </li>
            </Link>

            <Link to="/login" onClick={toggleMenu}>
              <li>
                <button className="secondary">Login</button>
              </li> 
            </Link>
            </>
          )}
            
          { isLoggedIn && (
              <li>
                <button onClick={handleLogOut} className="linkbutton">Logout</button>
              </li>
          )}
          </ul>
        </div>


        <Link to="/basket">
          <div className="basket">
            <div className="basket-amounth">
              <p>{basketLength}</p>
            </div>
            <img className="basket" src={shopingBasket} />
          </div>        
        </Link>
      </div>


    </nav>
  );
}

export default Navbar;