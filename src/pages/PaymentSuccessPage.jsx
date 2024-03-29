import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/cart.context';
import orderService from '../services/orders.service';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

function PaymentSuccessPage() {

  const {currentOrderId} = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const {currentOrder, clearCurrentOrder} = useContext(CartContext);

  const orderNumber = searchParams.get("orderNumber");

  const updateCurrentOrder = async() => {
    try {
        console.log('currentOrderId', currentOrderId)
        await orderService.patch(currentOrderId, { status: 'Paid'});
       
    } catch (error){
        console.log(`Updating paid status for order id ${currentOrderId} failed`, error );
    }
  }

  useEffect(()=>{
    updateCurrentOrder();
     //clear the current order from cart context
     clearCurrentOrder();
  }, [])

  return (
    <>
      {
        !orderNumber && <p>Loading ...</p>
      }
      {

      orderNumber && 
        <div>
      <h1>Payment Successful</h1>
      <p style={{ color: 'green' }}>
        Congratulations! Your payment was successful for the order number - <Link to={`/orders/${currentOrderId}`}>{orderNumber}</Link>.
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
      }
    </>
    
  );
}

export default PaymentSuccessPage;
