import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useState } from "react";
import "./Navbar.css";
import Logo from "../../public/imalogotipo-pirineos-gourmet-negro.png"
import shopingBasket from "../assets/shopping-basket.png"

function Navbar() {
  const { user, logOutUser, isLoggedIn } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  let userId;
  if(user){
    userId = user.userId;
  }
  return (
    <nav>
      <div>
        <img id="logo" src={Logo} />
      </div>
      <div className={`menuppal ${showMenu ? 'active' : ''}`}>
      <ul>
        <Link to="/">
          <li className="">Home</li>
        </Link>
        
      {isLoggedIn && (
          <Link to={`/users/${userId}`}>
          <li>Profile</li>
        </Link>
      )}
        
        <Link to="/products">
          <li>Products</li>
        </Link>
        
        <Link to="/aboutus">
          <li>About Us</li>
        </Link>
        
        <Link to="/contact">
          <li>Contact Us</li>
        </Link>
        
        { !isLoggedIn && (
        <>
        <Link to="/register">
          <li>
            <button className="primary">Register</button>
          </li>
        </Link>

        <Link to="/login">
          <li>
            <button className="secondary">Login</button>
          </li> 
        </Link>
        </>
      )}
        
      { isLoggedIn && (
          <Link to="/logout">
          <li>
            <button onClick={logOutUser} className="linkbutton">Logout</button>
          </li>
        </Link>
      )}
      </ul>

      <Link to="/basket">
      <div>
        <img src={shopingBasket} style={{height:" 30px", padding:"5px"}} />
      </div>        
      </Link>

      </div>
      <div className={`hamburger ${showMenu ? 'active' : ''}`} onClick={toggleMenu}>
        <div className="_layer -top"></div>
        <div className="_layer -mid"></div>
        <div className="_layer -bottom"></div>
      </div>
    </nav>
  );
}

export default Navbar;