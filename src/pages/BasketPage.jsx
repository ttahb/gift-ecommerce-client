import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";
import userService from "../services/user.service";
import { useNavigate } from "react-router-dom";
import Utils from '../utils/utils'
import emptyImage from "../assets/emptycart.jpg";
import "./BasketPage.css"

function BasketPage() {
    
    const {basket, setBasket, clearBasket, setAmount, currentOrderId, setBasketContentLength} = useContext(CartContext);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [ totalPrice, setTotalPrice ] = useState(0);
    const [ isLoadingBr, setIsLoadingBr ] = useState(true);
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const finalPrice = () => {
        let finalPrice = basket.reduce((acc, curValue)=>{
            return acc + (curValue.quantity * curValue.price)
        },0)
        setTotalPrice(finalPrice);
        setAmount(finalPrice);
    }

    const handleQtyUpdate = (prodId, operation) => {
        userService
            .getUser(user.userId)
            .then((res) => {
                return res.data.basket 
            })
            .then((resBasket) => {

                const updateProduct = resBasket.map((product) => {         
                    if(product._id === prodId){

                        if(operation){
                            return {...product, quantity: product.quantity + 1};
                        } 
                            
                        if(product.quantity === 1){
                            return product
                        } 

                        return {...product, quantity: product.quantity - 1};                                      
                    }
                    return product;
                })

                userService
                .updateUserFields( user.userId, { basket: updateProduct } )
                .then((res) => {
                    setBasket(res.data.basket)
                })
            })

    }

    const handleDelete = (prodId) => {

        userService
            .getUser(user.userId)
            .then((res) => {
                return res.data.basket
            })
            .then((userBasket) => {
                const updateBasket = userBasket.filter((prod) => {
                    return prod._id !== prodId
                })
                userService 
                    .updateUserFields(user.userId, { basket: updateBasket})
                    .then((response) => {
                        setBasketContentLength(user.userId)
                        setBasket(response.data.basket)
                    })
            })
    }

    const getUser = async () => {

        try {
            const response = await userService.getUser(user.userId)
            setBasket(response.data.basket);
            setIsLoadingBr(false);
            
        }catch(err){
            console.log(err);
            setIsLoadingBr(false);

        } 
    }

    const handleComplete = () => {
        if(basket && basket.length === 0 || totalPrice === 0){
            setErrorMessage('Your basket is empty. ˙◠˙')
        } else {
            navigate('/address');
        }
   
    }

    useEffect(() => {
        console.log('testing currentOder Id', currentOrderId);
        if(!isLoading){
            getUser()
        }
    }, [isLoading])

    useEffect(() => {
        finalPrice();
    } , [basket])


    if(isLoadingBr){
        return(
            <div className='loading-div'>
                <p>Loading...</p>
            </div>
        )
    }

    return(
        <div>
            {basket.map((prod, index) => {
                return(
                    <div key={index}>
                        <br/>
                        <img style={{height: "150px"}} src={prod.productImg} alt="image" />
                        <h2>{prod.productName}</h2>
                        <p>Price: {Utils.formatCentsToEuros(prod.price)}€</p>
                        <p>Quantity: {prod.quantity} <span></span>
                            <span>
                                <button className="space-between-btns" onClick={ () => handleQtyUpdate( prod._id, 0 ) }>-</button> 
                                <button onClick={ () => handleQtyUpdate( prod._id, 1 ) }>+</button>
                            </span>
                        </p>
                        <button onClick={() => handleDelete(prod._id)}>Remove from basket</button>
                        <br />
                        <p>Total: {Utils.formatCentsToEuros(prod.price * prod.quantity)}€</p>                    
                    </div>
                    
                )
            })}

            {basket.length === 0 ?
                            <div className="error-basket-messImg">
                                <img src={emptyImage} alt="" />
                            </div> : <div></div> }
            <div>
                <p>Final Price: {Utils.formatCentsToEuros(totalPrice)}€</p>
            </div>
            <div>
                {errorMessage && <div>
                                    <span style={{ color: 'black', padding: '8px' }}>{errorMessage}</span>
                                </div>}
                <button onClick={handleComplete} >Complete</button>
            </div>
        </div>
    )
}

export default BasketPage;