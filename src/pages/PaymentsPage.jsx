import { useEffect, useState, useContext } from "react";
import paymentService from "../services/payment.service";
import { json } from "react-router-dom";
import './PaymentsPage.css';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { CartContext } from "../context/cart.context";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_API_KEY);

function PaymentsPage(props){

    const {currentOrderId} = useContext(CartContext);    
    const [clientSecret, setClientSecret] = useState("");

    const createPaymentIntent = async() => {
        try {
            console.log('current order _id in payments page', currentOrderId)
            const paymentIntent =  await paymentService.createPaymentIntent({currentOrderId: currentOrderId});

            if(paymentIntent){
                setClientSecret(paymentIntent.data.clientSecret);
            }
        } catch (error){
            console.log('err', error);
        } 
    }

    useEffect(()=> {
        // Create PaymentIntent as soon as the page loads
        createPaymentIntent();
    }, [])


    //Use your company’s color scheme and font to make it match with the rest of your checkout page.
    const appearance = {
        theme: 'night',
        variables: {
            colorPrimary: '#0570de',
            colorBackground: '#6750A4',
            colorText: 'white',
          }
    };
    
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <>
            <p style={{ color: '#6750A4' }}>Congratulations! <br></br><br />Order with ID - 1xx-453215121-12 is successfully created for you.<br></br> <br>
            </br>Kindly proceed with the payment. Large Order? Skip payment and contact our sales.</p>
            {/* <button>Complete Payment</button> */}
            <button style={{backgroundColor: 'black'}}>Skip Payment</button>
            <br>
            </br>
            
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                     <CheckoutForm />
                </Elements>
            )}
            
        </>
    )
}

export default PaymentsPage;