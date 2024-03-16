import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import orderService from "../services/orders.service";

function OrderDetailsPage(props) {

    const [order, setOrder] = useState(null);
    const {orderId} = useParams();
    const [isOrderDetailsLoading, setIsOrderDetailsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(undefined);

    const getOrder = async() => {
        try {
           const resp =  await orderService.getDetails(orderId)
           console.log('order', resp.data);
           setOrder(resp.data)
           setIsOrderDetailsLoading(false)
        } catch(err){
            console.log(err)
            setIsOrderDetailsLoading(false)
            setErrorMessage(err.response.data.message);
        }
    }

    useEffect( () => {
        getOrder()
    }, [])

    if(isOrderDetailsLoading){
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }
    
    return (
        <div>
            {!errorMessage && <div>
                <br></br>
                <h4><span style={{ color: 'grey' }}>Order ID - </span><span style={{ color: 'grey' }}>{order.orderNumber}</span></h4>
                <h4><span style={{ color: 'grey' }}>Status - </span><span style={{ color: 'grey' }}>{order.status}</span></h4>
                <h5><span style={{ color: 'grey' }}>Order Total Amount (EUR) - </span><span style={{ color: 'grey' }}>€{order.amount}</span></h5>
                <hr></hr>
                <h5 style={{ textDecoration: 'underline' }}>Contents:</h5>
                {order.content.map((product, index) => {
                    return (
                        <div>
                            <p style={{ fontStyle: 'strong', color: 'lightgreen' }}>Product - {index + 1}</p>
                            <span>Product Name - </span><span>{product.productName}</span>
                            <br></br>
                            <span>Quantity - </span><span>{product.quantity}</span>
                            <br></br>
                            <span>Unit Price - </span><span>{product.price}</span>
                            <br></br>
                            <span>Total (EUR) - </span><span>€{product.price * product.quantity}</span>
                            <hr></hr>
                        </div>
                    )
                })}
                <br></br>
                <h5>Billing Address</h5>
                <p>{order.billingAddress.contactPerson}</p>
                <span>{order.billingAddress.buildingNumber}, </span>
                <span>{order.billingAddress.street}</span><br></br>
                <span>{order.billingAddress.postalCode}, </span>
                <span>{order.billingAddress.city}</span><br></br>
                <p>{order.billingAddress.country}</p>
                <p>{order.billingAddress.contactNumber}</p>
                <hr></hr>
                <br></br>
                <h5>Shipping Address</h5>
                <p>{order.shippingAddress.contactPerson}</p>
                <span>{order.shippingAddress.buildingNumber}, </span>
                <span>{order.shippingAddress.street}</span><br></br>
                <span>{order.shippingAddress.postalCode}, </span>
                <span>{order.shippingAddress.city}</span><br></br>
                <p>{order.shippingAddress.country}</p>
                <p>{order.shippingAddress.contactNumber}</p>
            </div>}
            {
                errorMessage && <p>{errorMessage}</p>
            }
        </div>
    )
}

export default OrderDetailsPage;