import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";
import userService from "../services/user.service";
import { useNavigate } from "react-router-dom";

function BasketPage() {

    const {basket, setBasket, clearBasket, setAmount, currentAmount} = useContext(CartContext);
    const [errorMessage, setErrorMessage] = useState(undefined);
    // console.log('basket is', basket);
    // const [ basket, setBasket ] = useState([]);
    const [ totalPrice, setTotalPrice ] = useState(0);
    const [ isLoadingBr, setIsLoadingBr ] = useState(true);
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    // console.log('user from the basket',user);
    // console.log('TIME', Date.now())

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
                        currentAmount(user.userId)
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
            setErrorMessage('Your basket is empty.')
        } else {
            navigate('/address');
        }
   
    }

    useEffect(() => {
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
                        <img style={{height: "150px"}} src={prod.productImg} alt="image" />
                        <h2>{prod.productName}</h2>
                        <p>price: {prod.price} Euro</p>
                        <p>quantity: {prod.quantity} 
                            <span>
                                <button onClick={ () => handleQtyUpdate( prod._id, 0 ) }>-</button> 
                                <button onClick={ () => handleQtyUpdate( prod._id, 1 ) }>+</button>
                            </span>
                        </p>
                        <button onClick={() => handleDelete(prod._id)}>remove from Basket</button>
                        <br />
                        <p>Total: {prod.price * prod.quantity}</p>                    
                        <br />
                        <br />
                    </div>
                    
                )
            })}

            <div>
                <p>Final Price: {totalPrice} Euro</p>
            </div>
            <div>
                <button onClick={handleComplete} >Complete</button>
                {errorMessage && <div><p style={{ color: 'red' }}>{errorMessage}</p></div>}
            </div>
        </div>
    )
}

export default BasketPage;