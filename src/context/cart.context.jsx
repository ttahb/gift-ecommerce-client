import React, { useState } from "react";
const CartContext = React.createContext();

function CartProviderWrapper(props){

    const [basket, setBasket] = useState([]);
    const [amount, setAmount] = useState(0);
    // const [basketLength, setBasketLength]= useState(basket.length);

    const clearBasket = (basket) => {
        setBasket([]);
        setAmount(0);
    }

    // const getBasket= () => basket;

    return (
        <CartContext.Provider value= {{basket, setBasket, clearBasket, amount, setAmount}}>
            {props.children}
        </CartContext.Provider>
    )
}

export {CartContext, CartProviderWrapper}