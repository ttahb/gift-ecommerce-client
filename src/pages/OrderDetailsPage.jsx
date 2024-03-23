import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import orderService from "../services/orders.service";
import "./OrderDetailsPage.css"

function OrderDetailsPage(props) {

    const [order, setOrder] = useState(null);
    const {orderId} = useParams();
    const [isOrderDetailsLoading, setIsOrderDetailsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [ cancelOrder, setCancelOrder ] = useState(false);
    const navigate = useNavigate();

    const getOrder = async () => {
        try {
           const resp =  await orderService.getDetails(orderId)
           console.log('order', resp.data);
           setOrder(resp.data);
           setIsOrderDetailsLoading(false);
        } catch(err){
            console.log(err)
            setIsOrderDetailsLoading(false)
            setErrorMessage(err.response.data.message);
        }
    }

    const checkStatus = () => {
        if(order && order.status && order.status.toLowerCase() === 'cancelled'){
            return setCancelOrder(true);
        }
    }

    const handleClick = () => {
        navigate('/orders');
    }

    const handleCancel = () => {

        if(order.status.toLowerCase() === 'cancelled'){
            setCancelOrder(true);
        }

        orderService
            .patch(order._id, {status: "Cancelled"})
            .then((res) => {
                setCancelOrder(true);
                console.log(res.data)
            })
    }

    useEffect( () => {
        getOrder();
    }, [])

    useEffect(() => {        
        checkStatus();
    }, [order])

    if(isOrderDetailsLoading){
        return (
            <div className='loading-div'>
                <p>Loading...</p>
            </div>
        )
    }
    
    return (
        <div>
            <div>
                <button onClick={handleClick}>Back to your Orders</button>
            </div>
            {!errorMessage && 

            <div className="single-order-container">
                
                <div className="order-info-container">
                    <h4><span style={{ color: 'grey' }}>Order ID - </span><span style={{ color: 'grey' }}>{order.orderNumber}</span></h4>
                    <h4><span style={{ color: 'grey' }}>Status - </span><span style={{ color: 'grey' }}>{order.status}</span></h4>
                    <h5><span style={{ color: 'grey' }}>Order Total Amount (EUR) - </span><span style={{ color: 'grey' }}>€{order.amount}</span></h5>
                </div>
                
               <div className="products-container">
                <h5>Contents:</h5>
                    {order.content.map((product, index) => {
                        console.log(product)
                        return (
                            <div key={product.productId}>
                                <p>Product - {index + 1}</p>
                                <img src={product.productImg} alt="product image" />
                                <span>Product Name - </span><span>{product.productName}</span>
                                <span>Quantity - </span><span>{product.quantity}</span>
                                <span>Unit Price - </span><span>{product.price}</span>
                                <span>Total (EUR) - </span><span>€{product.price * product.quantity}</span>
                            </div>
                        )
                    })}
               </div>
                
                <div className="billing-address-container">
                    <h5>Billing Address</h5>
                    <p>{order.billingAddress.contactPerson}</p>
                    <span>{order.billingAddress.buildingNumber}, </span>
                    <span>{order.billingAddress.street}</span>
                    <span>{order.billingAddress.postalCode}, </span>
                    <span>{order.billingAddress.city}</span>
                    <p>{order.billingAddress.country}</p>
                    <p>{order.billingAddress.contactNumber}</p>
                </div>

                <div className="shipping-address-container">
                    <h5>Shipping Address</h5>
                    <p>{order.shippingAddress.contactPerson}</p>
                    <span>{order.shippingAddress.buildingNumber}, </span>
                    <span>{order.shippingAddress.street}</span>
                    <span>{order.shippingAddress.postalCode}, </span>
                    <span>{order.shippingAddress.city}</span>
                    <p>{order.shippingAddress.country}</p>
                    <p>{order.shippingAddress.contactNumber}</p>
                </div>

                <div>
                    <button onClick={handleCancel}>Cancel order</button>
                    <button>Pay</button>
                </div>

                <div className={cancelOrder ? 'active' : 'inactive' }>
                    <h1>Order Cancelled</h1>
                </div>
            </div>
            }

            {
                errorMessage && <p>{errorMessage}</p>
            }
        </div>
    )
}

export default OrderDetailsPage;