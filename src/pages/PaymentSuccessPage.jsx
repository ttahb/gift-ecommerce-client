import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/cart.context';

function PaymentSuccessPage() {

  const {clearCurrentOrder} = useContext(CartContext);  

  //Based on query params in
  // http://localhost:5173/payments/success?payment_intent=pi_3OyDOYSE5p4wzLw806I6HTNU&payment_intent_client_secret=pi_3OyDOYSE5p4wzLw806I6HTNU_secret_cOozydSRPhGViRQ3srL5HP0Ej&redirect_status=succeeded
  
  useEffect(()=>{
    clearCurrentOrder();
  }, [])

  return (
    <div>
      <h1>Payment Successful</h1>
      <p style={{ color: 'green' }}>
        Congratulations! Your payment was successful.
      </p>
      <p>
        Thank you for your order. Your transaction has been completed
        successfully.
      </p>
      <p>
        If you have any questions or concerns, please feel free to contact our
        customer support team.
      </p>
    </div>
  );
}

export default PaymentSuccessPage;
