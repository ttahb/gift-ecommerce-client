import Utils from '../utils/utils'

function SingleProductCard({product}) {

    return(
            <div className='single-product-display'>
                <div className="product-card card-image">
                    <img src={product.image} alt="product image" />
                </div>
                <div className='single-product-display info-single-product'>
                    <p>{product.productName}</p>
                    <p>Description:</p>
                    <p className="description-single-product">{product.description}</p>
                    {/* <p>Likes: {product.hearts}</p> */}
                    <p>Price: {Utils.formatCentsToEuros(product.price)}€</p>
                </div>
            </div>
    )
}

export default SingleProductCard;