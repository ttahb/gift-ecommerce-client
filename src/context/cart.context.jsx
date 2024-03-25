import React, { useState } from "react";
import userService from "../services/user.service";
const CartContext = React.createContext();

function CartProviderWrapper(props){

    const [basket, setBasket] = useState([]);
    const [amount, setAmount] = useState(0);
    const [basketLength, setBasketLength] = useState(0);
    console.log('from the cart.context ',basketLength);

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

    // const getBasket= () => basket;

    return (
        <CartContext.Provider value= {{basket, setBasket, clearBasket, amount, setAmount, currentAmount, itemsInBasket, basketLength}}>
            {props.children}
        </CartContext.Provider>
    )
}

export {CartContext, CartProviderWrapper}