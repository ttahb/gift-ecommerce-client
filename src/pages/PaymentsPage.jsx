import { useEffect, useState, useContext } from "react";
import paymentService from "../services/payment.service";
import './PaymentsPage.css';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { CartContext } from "../context/cart.context";
import { useNavigate } from "react-router-dom";
import orderService from "../services/orders.service";
import { Link } from "react-router-dom";
import Utils from '../utils/utils'
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_API_KEY);

function PaymentsPage(){

    const {currentOrder, clearBasket} = useContext(CartContext);    
    const [clientSecret, setClientSecret] = useState("");
    const navigate = useNavigate();

    const createPaymentIntent = async() => {
        try {
            if(currentOrder){
                console.log('current order _id in payments page', currentOrder._id)
                const paymentIntent =  await paymentService.createPaymentIntent({currentOrderId: currentOrder._id});
    
                if(paymentIntent){
                    setClientSecret(paymentIntent.data.clientSecret);
                }
            }
        } catch (error){
            console.log('err', error);
        } 
    }

    useEffect(()=> {
        // Create PaymentIntent as soon as the page loads
        createPaymentIntent();

    }, [currentOrder])


    //Use your company’s color scheme and font to make it match with the rest of your checkout page.
    const appearance = {
        theme: 'stripe',
        variables: {
            colorPrimary: '#0570de',
            colorBackground: 'black',
            colorText: 'white',
          }
    };
    
    const options = {
        clientSecret,
        appearance,
    };

    const handleSkipPayment = () => {
        orderService
            .patch(currentOrder._id, {status: 'Needs Payment confirmation'})
            .then( () => console.log('order status patched for order', currentOrder._id))
            .catch(err => console.log('Failed to patch order', currentOrder._id))

        navigate(`/orders/${currentOrder._id}`);
    }

    return (
        
        <>
        {!currentOrder &&
            <div>
                <span className="loader"></span>
                <p>loading payment page...</p>
            </div>
           
        }
        {currentOrder && 
        <>
            <div>
            <p style={{ color: '#6750A4' }}>Congratulations! <br></br><br/>Order with number - <Link to={`/orders/${currentOrder._id}`}>{currentOrder.orderNumber}</Link> successfully created for you.<br></br> <br>
            </br>Kindly proceed with the payment. Large Order? Skip payment and our sales team will contact you.</p>
            <br/>
            </div>
            <div>
                <span style={{ fontWeight: 'bold', color: 'white', backgroundColor: '#6750A4', padding: '10px' }}>  Amount: {Utils.formatCentsToEuros(currentOrder.amount)}€</span>
                <br /><br />
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm className="stripe-form" />
                    </Elements>
                )}
                {!clientSecret && <p>Page refreshed. Reload payment from Orders</p>}
                <button onClick={handleSkipPayment}>Skip Payment</button>
            </div>
        </>
        }   
        </>
    )
}

export default PaymentsPage;