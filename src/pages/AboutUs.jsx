import "./AboutUs.css"
import Members from '../../public/about-us.jpg'

function AboutUs() {

    return(
        <div>
            <h2 className="order-title aboutus-title">About Us:</h2>

            <div className="aboutus-text">
                <img src={Members} className="aboutUs-img"/>
                <p>Welcome to Pirineos Gourmet – Your Premier Destination for Exquisite Corporate Gifts!

                        At Pirineos Gourmet, we understand the significance of expressing gratitude to your employees, especially during the festive season. Our meticulously curated selection of wine, cheese, jams, and gourmet delights offers an unparalleled opportunity to convey your appreciation in the most delightful and memorable manner. 
                </p>

                <h4>Why would you Choose Us?</h4>
                <br/>
                <ul className="list">
                    <li><p>Unrivaled Quality</p></li>
                    <li><p>Customization Options</p></li>
                    <li><p>Seamless Ordering Process</p></li>
                    <li><p>Personalized Touch</p></li>    
                </ul>

                <br/>

                <p> This Christmas, show your employees how much you value their hard work and dedication with a thoughtful gift from Pirineos Gourmet. Our exquisite selection of gourmet delights promises to delight the senses and foster a sense of warmth and appreciation among your team.

                        Remember, happy workers lead to a happier workplace and greater productivity. Let us help you make this holiday season truly special for your employees.

                        Browse our collection today and discover the perfect gifts to express your gratitude!
                </p>
                <br></br>
            </div>

        </div>
    )
}

export default AboutUs;