import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useState } from "react";

function Navbar() {
  const { user } = useContext(AuthContext)

let userId;
  if(user){
    userId = user.userId;
  }



  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to={`/users/${userId}`}>
        <button>Profile</button>
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
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <Link to="/logout">
        <button>Logout</button>
      </Link>

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