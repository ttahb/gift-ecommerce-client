function ProductCard( { image, productName, price, hearts } ) {

    return(
        <div>
            <br />
            <img style={{height: "150px"}} src={image} alt="Image of the product"/>
            <p>Name: {productName}</p>
            <p>Price: {price}</p>
            <p>Likes:{hearts}</p>
            <br />
        </div>
    )
}

export default ProductCard;