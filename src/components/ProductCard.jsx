import { Link } from "react-router-dom";

function ProductCard( { image, productName, price, hearts, _id } ) {

    return(
        <Link to={`/product/${_id}`}>
            <div>
                <br />
                <img style={{height: "150px"}} src={image} alt="Image of the product"/>
                <p>Name: {productName}</p>
                <p>Price: {price}</p>
                <p>Likes:{hearts}</p>
                <br />
            </div>
        </Link>
    )
}

export default ProductCard;