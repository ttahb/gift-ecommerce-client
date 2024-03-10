function ProductCard( { image, productName, price, hearts } ) {

    return(
        <div>
            <img style={{height: "150px"}} src={image} />
            <p>{productName}</p>
            <p>{price}</p>
            <p>{hearts}</p>
        </div>
    )
}

export default ProductCard;