import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import userService from "../services/user.service";

function BasketPage() {

    const [ basket, setBasket ] = useState([]);
    const [ totalPrice, setTotalPrice ] = useState(0);
    const [ isLoadingBr, setIsLoadingBr ] = useState(true);
    // user in a state
    const { user, isLoading } = useContext(AuthContext);

    // console.log('user from the basket',user);
    // console.log('TIME', Date.now())

    const finalPrice = () => {
        let finalPrice = basket.reduce((acc, curValue)=>{
            return acc + (curValue.quantity * curValue.price)
        },0)
        setTotalPrice(finalPrice);
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
                        setBasket(response.data.basket)
                    })
            })
    }

    const handleOrder = () => {
        // how to take all the info and create the order...? 
        // maybe render the info in a form - update the quantity from the useState
        // and upon submition create order with the availabel info and clear the user's basket 

        // then we store the basked contet int he order.context

    }

    const getUser = async () => {

        try {
            // let response
            // if(user){
            //      response = await userService.getUser(user.userId);
            // } else {
            //      response = await userService.getUser('current');
            // }
            const response = await userService.getUser(user ? user.userId : 'current');
            //upodate the user in the state
            setBasket(response.data.basket);
            
        }catch(err){
            console.log(err);
            setIsLoadingBr(false);

        } 
    }

    useEffect(() => {
        if(!isLoading){
            getUser()
            setIsLoadingBr(false)
        }
    }, [isLoading])

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
                return(
                    <div key={index}>
                        <p><img src={prod.image} alt="image" /></p>
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
                <button >Order</button>
            </div>
        </div>
    )
}

export default BasketPage;