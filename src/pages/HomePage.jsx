import { Link } from "react-router-dom";
function HomePage() {
    return (
      <div className="hero">
        <h1 className="title">
        Elevate your corporate giffting experiences
        </h1>
        <Link to="/register">
        <button className="primary">Register Now</button>
        </Link>
      </div>
    );
  }
  
  export default HomePage;