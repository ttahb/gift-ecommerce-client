import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import shopingBasket from "../assets/shopping-basket.png"


function Navbar() {
  const { user, logOutUser, isLoggedIn } = useContext(AuthContext);

let userId;
  if(user){
    userId = user.userId;
  }
  

  return (
    <nav>
    {isLoggedIn && (
      <Link to={`/users/${userId}`}>
        <button>Profile</button>
      </Link>
    )}
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/products">
        <button>Products</button>
      </Link>
      <Link to="/aboutus">
        <button>About Us</button>
      </Link>
      <Link to="/contact">
        <button>Contact Us</button>
      </Link>
      { !isLoggedIn && (
        <>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
        </>
      )}
      { isLoggedIn && (
        <Link to="/logout">
          <button onClick={logOutUser}>Logout</button>
        </Link>
      )}
      <Link to="/basket">
      <div>
        <img src={shopingBasket} style={{height:" 30px", padding:"5px"}} />
      </div>        
      </Link>
    </nav>
  );
}

export default Navbar;