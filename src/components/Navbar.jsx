import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useState } from "react";
import "./Navbar.css";
import Logo from "../../public/imalogotipo-pirineos-gourmet-negro.png"

function Navbar() {
  const { user } = useContext(AuthContext)
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
      <ul className={`menuppal ${showMenu ? 'active' : ''}`}>
        
        <Link to="/">
          <li className="">Home</li>
        </Link>
        
        <Link to={`/users/${userId}`}>
          <li>Profile</li>
        </Link>
        
        <Link to="/products">
          <li>Products</li>
        </Link>
        
        <Link to="/aboutus">
          <li>About Us</li>
        </Link>
        
        <Link to="/contact">
          <li>Contact Us</li>
        </Link>
        
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
        
        <Link to="/logout">
          <li>
            <button className="linkbutton">Logout</button>
          </li>
        </Link>
      </ul>
      <div className={`hamburger ${showMenu ? 'active' : ''}`} onClick={toggleMenu}>
        <div className="_layer -top"></div>
        <div className="_layer -mid"></div>
        <div className="_layer -bottom"></div>
      </div>
      {/* {isLoggedIn && (
        <>
          <span>Welcome {user.name}</span>
          <Link to="/projects">
            <button>Projects</button>
          </Link>        
          <button onClick={logOutUser}>Logout</button>
        </>
      )}

        {!isLoggedIn && (
              <>
                <Link to="/signup"> <button>Sign Up</button> </Link>
                <Link to="/login"> <button>Login</button> </Link>
              </>
            )} */}
    </nav>
  );
}

export default Navbar;