import { useContext, useState } from "react";
import AddressCard from "../components/AddressCard";
import orderService from "../services/orders.service";
import { CartContext } from "../context/cart.context";
import { useNavigate } from "react-router-dom";
import './AddressPage.css'

function AddressPage(props){

    const {amount, basket, clearBasket, setCurrentOrderId} = useContext(CartContext);

    console.log('amount', amount, 'basket', basket);
    const [ billingAddressEnabled, setBillingAddressEnabled] = useState(false);
    const [billingAddress, setBillingAddress] = useState(null);
    const [shippingAddress, setShippingAddress] = useState(null);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const navigate = useNavigate();

    const handleBillingAddressEnabled = () => {
        setBillingAddressEnabled(!billingAddressEnabled);
    }

    const getOrderRequest = () => {
        // need shippingAddress, billingAddress, amount, content: []
        // if billingAddressEnabled is True => copy shippingAddress to billingAddress
        // else need to set billingAddress from received billingAddress state
        // amount will be taken from cartContext
        // content will be taken from cartContext - need to fit the model in order 

        if(!shippingAddress){
            setErrorMessage('Please enter a shipping address.');
            return null;
        }

        if(billingAddressEnabled && !billingAddress){
            setErrorMessage('Please enter a billing address.')
            return null;
        }

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
            setErrorMessage(errorMessage? errorMessage:'Something went wrong, please contact the administrator.')
            return;
       }

       try {
        const resp = await orderService.create(orderReqBody)
        if(resp.data){
            console.log('Order is created.', resp.data)
            //clearBasket
            // console.log('order is', order)
            setCurrentOrderId(resp.data._id);
            clearBasket();
            //Now navigate to payments page, with order details taken from the newly created order
            navigate('/payments');
        } else {
            //Navigate to error page or set error message?
            console.log('Order not created due to some error', resp.data);
            setErrorMessage('Something went wrong. Please contact administrator.')
            // navigate('/error')
        }

       } catch(error){
            console.log('err',error? error.response: 'Something went wrong.');
            setErrorMessage(error.response.data.message)
       }

    }
    
    const handleShippingAddress = (address) => {
        setShippingAddress(address)
    }

    const handleBillingAddress = (address) => {
        setBillingAddress(address)
    }
    // Please style this in a way such that when check box is clicked billing address comes one side of the screen, no scroll
    // for mobile view we can have a scroll.
    return (
        <div>
            <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Shipping Address</p><br /><br />

            <AddressCard setAddress={(address) => handleShippingAddress(address)}/>
            <fieldset>
                <legend style={{ color: '#808080' }}>Keep the billing address same as shipping address ?</legend>
                <input className="custom-checkbox"  type="checkbox" checked={!billingAddressEnabled} onChange={handleBillingAddressEnabled}/>
            </fieldset>
            { billingAddressEnabled &&  <>
                <br /><br />
                <p style={{ fontSize: '1.2em', fontWeight: 'bold' }} >Billing Address</p ><br></br>
            <AddressCard setAddress={(address) => handleBillingAddress(address)}/> </>}

            <button onClick={handleCreateOrder}>Create Order</button>
            {errorMessage && <>
                    <p style={{ color: 'red' }}>{errorMessage}</p>
                </>}
        </div>
    )
}

export default AddressPage;