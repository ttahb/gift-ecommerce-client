import React, { useState } from "react";
import orderService from "../services/orders.service";
const CartContext = React.createContext();

function CartProviderWrapper(props){

    const [basket, setBasket] = useState([]);
    const [amount, setAmount] = useState(0);
    const [currentOrder, setCurrentOrder] = useState(null);
    // const [basketLength, setBasketLength]= useState(basket.length);

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
        <CartContext.Provider value= {{basket, setBasket, clearBasket, amount, setAmount, currentOrder, setCurrentOrderDetails, clearCurrentOrder}}>
            {props.children}
        </CartContext.Provider>
    )
}

export {CartContext, CartProviderWrapper}