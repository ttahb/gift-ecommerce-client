import { Link } from "react-router-dom";
function HomePage() {
    return (
      <div className="hero">
        <p>
        Elevate your corporate giffting experiences
        </p>
        <Link to="/register">
        <button className="primary">Register Now</button>
        </Link>
      </div>
    );
  }
  
  export default HomePage;