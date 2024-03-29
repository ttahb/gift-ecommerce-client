import { Link } from "react-router-dom";

function ProductCard( { image, productName, price, hearts, _id } ) {

    return(
        <Link to={`/product/${_id}`}>
            <div className=" product-card product-card-measurments">
                <div className="card-image">
                    <img src={image} alt="Image of the product"/>
                </div>
                <div className="product-card-info">
                    <p>{productName}</p>
                    <p>{price} Euro</p>
                </div>
                {/* <p>Likes:{hearts}</p> */}
            </div>
        </Link>
    )
}

export default ProductCard;