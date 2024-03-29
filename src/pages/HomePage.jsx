import { Link } from "react-router-dom";
import Worker from "/public/smart-people.png"
import Benefits from "/stack-of-money.png"
import Top from "/pie-and-charts.png"
import Lamin from "/Lamin.png"
function HomePage() {
    return (
      <div>
        <div className="hero">
          <div className="text-container-bg">
          <h1 className="title">
          Elevate your corporate giffting experiences
          </h1>
          <Link to="/register">
          <button className="primary">Register Now</button>
          </Link>
          </div> 
        </div>
        <article>
          <h2>Dont know what to gift?</h2>
          <div className="card">
          <p>Keep your employees and asociates happy, let them know you care about them withouth wasting effort or energy.</p>
          <img className="out-bg" src={Lamin} alt="not available"></img>
          </div>
        </article>
        <article>
          <h2>Do you know the benefits of empresarial giffting?</h2>
          <div className="container-article">
            <article className="bullet-cards">
              <h4>Increases your workers serotonine</h4>
              <p> and the higher the serotonine is, the better the performance is, dont forget to also give them a fair salary, and optimal perks, a gift is never a salary subtitute</p>
              <div className="pict-home"><img src={Worker} alt="not available" /></div>
            </article>
            <article className="bullet-cards">
              <h4>Save taxes, save money</h4>
              <p> Washing money is not allowed, but getting money back when making your taxes is definitely payed off</p>
              <div className="pict-home"><img src={Benefits} alt="not available" /></div>
            </article>
            <article className="bullet-cards">
              <h4>Get positionated as top</h4>
              <p> 97% of top places to work, make great gifts to their employees, the other 3% is working from a natural paradise</p>
              <div className="pict-home"><img src={Top} alt="not available" /></div>
            </article>
          </div>
          
        </article>
      </div>

    );
  }
  
  export default HomePage;