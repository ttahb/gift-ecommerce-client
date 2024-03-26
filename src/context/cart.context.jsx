import React, { useState } from "react";
import orderService from "../services/orders.service";
import userService from "../services/user.service";
const CartContext = React.createContext();

function CartProviderWrapper(props){

    const [basket, setBasket] = useState([]);
    const [amount, setAmount] = useState(0);
    const [currentOrder, setCurrentOrder] = useState(null);
    // const [basketLength, setBasketLength]= useState(basket.length);
    const [basketLength, setBasketLength] = useState(0);
    // console.log('from the cart.context ',basketLength);

    const itemsInBasket = (amount) => {
        // console.log('amoount from the context',amount);
        let prodAmount = amount + 1;
        // console.log(prodAmount)
        setBasketLength(prodAmount)      
    }

    const currentAmount = (userId) => {
        userService
            .getUser(userId)
            .then((res) => {
                // console.log("foundUser basket",res.data.basket.length)
                let prodAmount = res.data.basket.length;
                setBasketLength(prodAmount);
            })
    }

    const clearBasket = (basket) => {
        setBasket([]);
        setAmount(0);
    }

    const setCurrentOrderDetails = (orderId)=> {
        console.log('orderId in cart context', orderId);
        orderService.getDetails(orderId)
                .then(res =>{
                    console.log('order details in cart context', res.data)
                    setCurrentOrder(res.data)
                } )
                .catch(err => console.log(err));
    }

    const clearCurrentOrder = () => {
        setCurrentOrder(null);
    }

    // const getBasket= () => basket;

    return (
        <CartContext.Provider value= {{basket, setBasket, clearBasket, amount, setAmount, currentOrder, setCurrentOrderDetails, clearCurrentOrder, currentAmount, itemsInBasket, basketLength}}>
            {props.children}
        </CartContext.Provider>
    )
}

export {CartContext, CartProviderWrapper}