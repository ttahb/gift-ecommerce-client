import { Link } from "react-router-dom";
function HomePage() {
    return (
      <div>
        <div className="hero">
          <h1 className="title">
          Elevate your corporate giffting experiences
          </h1>
          <Link to="/register">
          <button className="primary">Register Now</button>
          </Link>
        </div>
        <article>
          <h2>Don't know what to gift?</h2>
          <p>Keep your employees and asociates happy, let them know you care about them withouth wasting effort or energy.</p>
          <img src=""></img>
        </article>
      </div>
      
     

    );
  }
  
  export default HomePage;