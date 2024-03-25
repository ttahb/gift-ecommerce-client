import React, { useState } from "react";
const CartContext = React.createContext();

function CartProviderWrapper(props){

    const [basket, setBasket] = useState([]);
    const [amount, setAmount] = useState(0);
    const [currentOrderId, setCurrentOrderId] = useState(null);
    // const [basketLength, setBasketLength]= useState(basket.length);

    const clearBasket = (basket) => {
        setBasket([]);
        setAmount(0);
    }

    const clearCurrentOrder = ()=> {
        setCurrentOrderId(null);
    }

    // const getBasket= () => basket;

    return (
        <CartContext.Provider value= {{basket, setBasket, clearBasket, amount, setAmount, currentOrderId, setCurrentOrderId, clearCurrentOrder}}>
            {props.children}
        </CartContext.Provider>
    )
}

export {CartContext, CartProviderWrapper}