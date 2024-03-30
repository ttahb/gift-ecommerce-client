import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import orderService from "../services/orders.service";
import "./OrderDetailsPage.css"
import { CartContext } from "../context/cart.context";
import Utils from '../utils/utils'

function OrderDetailsPage() {

    const [order, setOrder] = useState(null);
    const {orderId} = useParams();
    const [isOrderDetailsLoading, setIsOrderDetailsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [ cancelOrder, setCancelOrder ] = useState(false);
    const navigate = useNavigate();
    const { setCurrentOrderDetails } = useContext(CartContext);
    
    const getOrder = async () => {
        try {
           const resp =  await orderService.getDetails(orderId)
           console.log('order', resp.data);
           setOrder(resp.data);
           setIsOrderDetailsLoading(false);
           setCurrentOrderDetails(orderId);
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
            .catch(err => console.log(err));
    }

    useEffect( () => {
        getOrder();
    }, [])

    useEffect(() => {        
        checkStatus();
    }, [order])

    if(isOrderDetailsLoading){
        return (
        <div>
            <span className="loader"></span>
            <p>loading...</p>
        </div>
        )
    }

    const handlePay = () => {
        navigate('/payments');
    }
    
    return (
        <div className="de-hele-container">
            <div className="back-button">
                <button className="back-button-arrow" onClick={handleClick}> Back to your Orders</button>
            </div> 
            {!errorMessage && 

            <div className="single-order-container">
                
                <div className="order-info-container">
                    <h2 className="order-title">Order Details:</h2>
                    <div className="another-flexcontainer">
                        <h5 id="order-title">Order ID - <span>{order.orderNumber}</span></h5>
                        <h5 id="order-status">Status - <span >{order.status}</span></h5>
                        <h5 id="order-price">Order Total Amount - <span >{Utils.formatCentsToEuros(order.amount)}€</span></h5>
                    </div>
                    
                </div>
                
            <div className="product-address-container">
                <h2 className="order-title">Contents:</h2>
                
                <div className="product-order-container">
                    
                        {order.content.map((product, index) => {
                            console.log(product)
                            return (
                                <div key={product.productId} >
                                    <h3 className="content-cell-title">Product - {index + 1}</h3>
                                    <div className="content-cells">
                                        <Link to={`/product/${product._id}`}>
                                            <div>
                                                <img src={product.productImg} alt="product image" />
                                            </div>
                                        </Link>
                                        <div className="cells-info">
                                            <p>
                                                <span>Product Name - </span><span>{product.productName}</span>
                                            </p>
                                            <p>
                                                <span>Quantity - </span><span>{product.quantity}</span>
                                            </p>
                                            <p>
                                                <span>Unit Price - </span><span>{Utils.formatCentsToEuros(product.price)}€</span>
                                            </p>
                                            <p>
                                                <span>Total - </span><span>{Utils.formatCentsToEuros(product.price * product.quantity)}€</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>
                
                <div className="address-container">
                    <h2 className="order-title">Address:</h2>
                    <div className="Adr-flex-container">
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
                    </div>
                </div>
            </div>

                <div>
                    {order && 
                        order.status !== 'Cancelled' &&
                        order.status !== 'Delivered' &&
                        order.status !== 'Refunded'  &&
                        order.status !== 'Shipped' &&
                        order.status !== 'Completed' &&
                        <button className="space-between-btns" onClick={handleCancel}>Cancel order</button>
                    }
                    
                    {order &&
                        order.status !== 'Paid' &&
                        order.status !== 'Cancelled' &&
                        order.status !== 'Delivered' &&
                        order.status !== 'Refunded' &&
                        order.status !== 'Shipped' &&
                        order.status !== 'Completed' &&
                        <button onClick={handlePay}>Pay</button>
                    }
                    
                </div>

                <div className={cancelOrder ? 'activate' : 'inactivate' }>
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