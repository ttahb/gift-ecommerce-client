import { Link } from "react-router-dom";

function Navbar() {

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/">
        <button>Profile</button>
      </Link>
      <Link to="/">
        <button>Products</button>
      </Link>
      <Link to="/">
        <button>About Us</button>
      </Link>
      <Link to="/">
        <button>Contact Us</button>
      </Link>
      <Link to="/">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <Link to="/">
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