import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import productsService from "../services/products.service";
import { AuthContext } from "../context/auth.context";
import userService from "../services/user.service";

function ProductDetailsPage(){
    const [ product, setProduct ] = useState([]);
    const [ basketItems, setBasketItems ] = useState(1);
    const [ isLoading, setIsLoading ] = useState(true);
    const { productId } = useParams();
    const { user } = useContext(AuthContext);
    const [ errorMsg, setErrorMsg ] = useState(undefined);

    const plusItems =() => setBasketItems(basketItems + 1);
    const minusItems = () => {
        if(basketItems === 1 ){
            setBasketItems(1)
        } else {
            setBasketItems(basketItems - 1)
        }
    };

    const handleBasket = () => {
        // TODO => ask <= => create pop up basket with items and price accordingly??
        // put - patch the user model basket... service for that? 
        // patch the user module 

        const userId = user.userId;

        const userData = {
            productImg: product.image,
            productId: product._id,
            productName: product.productName,
            price: product.price,
            quantity: basketItems
        }

        userService
            .getUser(userId)
            .then((res) => {
                return res.data.basket 
            })
            .then((resBasket) => {
                let isExistingProduct = false;

                resBasket.forEach(product => { 
                    if(product.productId === userData.productId){
                        product.quantity += userData.quantity;
                        isExistingProduct = true;
                    }
                })

                if(!isExistingProduct){
                    resBasket.push(userData);
                }
                
                userService
                    .updateUserFields( userId, { basket: resBasket } )
                    // .then((res) => console.log(res))
                    .catch(err => setErrorMsg(err.response.data.message))
            })
            .catch((err) => {
                console.log(err);
                setErrorMsg(err.response.data.message)
            })
    };

    const getOneProduct = () => {
        productsService
            .getProduct(productId)
            .then((res) => {
                setProduct(res.data)
            })
            .catch((err) => {
                setErrorMsg(err.response.data.message)
            })
    };

    useEffect(() => {
        getOneProduct();
        setIsLoading(false);
    } ,[]);

    if(isLoading) {
        return(
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return(
        <div>
            {errorMsg && <p>{errorMsg}</p>}
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
                <Link to={'/products'} ><button>Continue Shoping</button></Link>
            </div>

            <div>
                {user && user.role.toLowerCase() === 'admin' && <Link to={`/product/edit/${productId}`}><button>Edit Product</button></Link>}
            </div>
        </div>
    )
}

export default ProductDetailsPage;