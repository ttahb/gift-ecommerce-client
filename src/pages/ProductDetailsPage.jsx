import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productsService from "../services/products.service";

function ProductDetailsPage(){
    const [ product, setProduct ] = useState([]);
    const { productId } = useParams()

    const getOneProduct = () => {
        productsService
            .getProduct(productId)
            .then((res) => {
                console.log('response os one product', res.data)
                setProduct(res.data)
            })
    }

    useEffect(() => {
        getOneProduct();
    } ,[])

    return(
        <div>
            <img style={{height: "150px"}} src={product.image} alt="product image" />
            <p>{product.productName}</p>
            <p>Description: {product.description}</p>
            <p>Likes: {product.hearts}</p>
            <p>Price: {product.price} Euro</p>
        </div>
    )
}

export default ProductDetailsPage;