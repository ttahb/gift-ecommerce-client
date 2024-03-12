import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productsService from "../services/products.service";
import { AuthContext } from "../context/auth.context";


function ProductDetailsPage(){
    const [ product, setProduct ] = useState([]);
    const [ basketItems, setBasketItems ] = useState(1);
    const [ isLoading, setIsLoading ] = useState(true)
    const { productId } = useParams();
    const { user } = useContext(AuthContext);

    const plusItems =() => setBasketItems(basketItems + 1);
    const minusItems = () => {
        if(basketItems === 1 ){
            setBasketItems(1)
        } else {
            setBasketItems(basketItems - 1)
        }
    };

    const getOneProduct = () => {
        productsService
            .getProduct(productId)
            .then((res) => {
                setProduct(res.data)
            })
    }

    const handleBasket = () => {
        // TODO => ask <= => create pop up basket with items and price accordingly??
        // put - patch the user model basket... service for that? 
        console.log('add Items to the basket ' + basketItems )
    }

    useEffect(() => {
        getOneProduct();
        setIsLoading(false);
    } ,[])

    if(isLoading) {
        return(
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return(
        <div>
            <div>
                <img style={{height: "150px"}} src={product.image} alt="product image" />
                <p>{product.productName}</p>
                <p>Description: {product.description}</p>
                <p>Likes: {product.hearts}</p>
                <p>Price: {product.price} Euro</p>
            </div>
            <div>
                <p>amount of Items:{basketItems} 
                    <span><button onClick={minusItems}>-</button></span>
                    <span><button onClick={plusItems}>+</button></span>
                </p>     
                <button onClick={handleBasket}>Add to Basket</button>
            </div>

            <div>
                {user.role === 'admin' && <button>Edit Product</button>}
            </div>
        </div>
    )
}

export default ProductDetailsPage;