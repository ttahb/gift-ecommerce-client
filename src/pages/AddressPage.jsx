import { useContext, useState } from "react";
import AddressCard from "../components/AddressCard";
import orderService from "../services/orders.service";
import { CartContext } from "../context/cart.context";
import { useNavigate } from "react-router-dom";

function AddressPage(props){

    const [amount, basket, clearBasket] = useContext(CartContext);
    const [ billingAddressEnabled, setBillingAddressEnabled] = useState(false);
    const [billingAddress, setBillingAddress] = useState(null);
    const [shippingAddress, setShippingAddress] = useState(null);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const navigate = useNavigate();

    const handleBillingAddress = () => {
        setBillingAddressEnabled(!billingAddressEnabled);
    }

    const getOrderRequest = () => {
        // need shippingAddress, billingAddress, amount, content: []
        // if billingAddressEnabled is True => copy shippingAddress to billingAddress
        // else need to set billingAddress from received billingAddress state
        // amount will be taken from cartContext
        // content will be taken from cartContext - need to fit the model in order 

        if(amount && amount > 0 && basket && basket.length > 0 && shippingAddress){
            return {
                "shippingAddress": shippingAddress,
                "billingAddress": billingAddressEnabled? (billingAddress? billingAddress: shippingAddress): shippingAddress,
                "amount": amount,
                "content": basket
            }
        } 

        return null;

    }

    const handleCreateOrder = async() => {

       
       const orderReqBody = getOrderRequest();
    
       if(!orderReqBody){
            console.log('Requested order: ',orderReqBody);
            setErrorMessage('Something went wrong, please contact administrator.')
            return;
       }

       try {
        const newOrder = await orderService.create(orderReqBody)
        if(newOrder){
            console.log('Order is created.')
            //clearBasket
            clearBasket();
            //Now navigate to payments page, with order details taken from the newly created order
            navigate('/payments');
        } else {
            //Navigate to error page or set error message?
            console.log('Order not created due to some error', newOrder);
            setErrorMessage('Something went wrong. Please contact administrator.')
            // navigate('/error')
        }

       } catch(error){
            console.log('err',error? error.response: 'Something went wrong.');
            setErrorMessage(error.response.data.message)
       }

    }
    

    return (
        <div>
            <label>Shipping Address:</label>
            <AddressCard/>
            <fieldset>
                <legend>Keep billing address same as shipping address ?</legend>
                <input type="checkbox" checked onChange={handleBillingAddress}/>
            </fieldset>
            
            { billingAddressEnabled &&  <>
                <label>Billing Address:</label>
            <AddressCard/>| </>}

            <button onClick={handleCreateOrder}>Create Order</button>
        </div>
    )
}

export default AddressPage;