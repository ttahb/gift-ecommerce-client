import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/cart.context';
import orderService from '../services/orders.service';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Success from '/Payment-succes.jpg'

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
        !orderNumber && 
        <div>
          <span className="loader"></span>
          <p>loading...</p>
        </div>
      }
      {

      orderNumber && 
        <div>
      <h1 className="order-title">Payment Successful</h1>
      <p style={{ color: 'green' }}>
        Congratulations! Your payment was successful for the order number - <Link to={`/orders/${currentOrderId}`}>{orderNumber}</Link>.
      </p>
      <div className='success-img' >
      <img src={Success}/>
      </div>
      <p>
        Thank you for your order. Your transaction has been completed
        successfully.
      </p>
      <p>
        If you have any questions or concerns, please feel free to contact our
        customer support team.
      </p>
      <div className='btns-flexcontainer'>
        <Link to={`/orders/${currentOrderId}`}><button className='space-between-btns'>Still hungry? Continue shopping!</button></Link>
        <Link to={`/orders/${currentOrderId}`}><button className='secondary'>Check your orders details!</button></Link>
      </div>
 
    </div>
      }
    </>
    
  );
}

export default PaymentSuccessPage;
