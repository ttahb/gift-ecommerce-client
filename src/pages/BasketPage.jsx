import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import userService from "../services/user.service";

function BasketPage() {

    const [ basket, setBasket ] = useState([]);
    const [ totalPrice, setTotalPrice ] = useState(0);
    const [ isLoading, setIsLoading ] = useState(true);
    const { user } = useContext(AuthContext);

    // console.log(user);

    const finalPrice = () => {
        let finalPrice = basket.reduce((acc, curValue)=>{
            return acc + (curValue.quantity * curValue.price)
        },0)
        setTotalPrice(finalPrice);
    }

    const handleMinus = () => {
        // maybe update the user's quantity accordingly 
        // evold the useEffect to retreave teh user's from the DB
                    // the final price will be update line 14 to 19
                    // individual product will be updated in the [ map... quy * price ] ????

        // how to take all the info and ceate the order...? 
        // maybe render the info in a form - update the quantity from the useState
        // and upon submition create order with the availabel info and clear the user's basket 
    }

    const handlePlus = () => {
        
    }

    useEffect(() => {
        if(user){
            userService
                .getUser(user.userId)
                .then((res) => {
                    console.log(res.data.basket)
                    setBasket(res.data.basket)
                    setIsLoading(false)
                })
                .catch((err) => console.log(err))
        } else {
            setIsLoading(false);
        }        
    }, [user])

    useEffect(() => {
        finalPrice();
    } , [basket])




    if(isLoading){
        return(
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return(
        <div>
            Basket

            {basket.map((prod, index) => {
                if(prod.quantity > 1 ){
                    let productPrice = prod.price * prod.quantity
                    console.log(productPrice)
                }
                return(
                    <div key={index}>
                        <p><img src={prod.image} alt="image" /></p>
                        <h2>{prod.productName}</h2>
                        <p>price: {prod.price} Euro</p>
                        <p>quantity: {prod.quantity} 
                            <span>
                                <button onClick={handleMinus}>-</button> 
                                <button onClick={handlePlus}>+</button>
                            </span>
                        </p>
                        <p>Total: {prod.price * prod.quantity}</p>
                        <br />
                    </div>
                    
                )
            })}

            <div>
                <p>Final Price: {totalPrice} Euro</p>
            </div>
        </div>
    )
}

export default BasketPage;