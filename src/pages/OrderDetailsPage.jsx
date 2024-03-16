import { useState } from "react"
import { useParams } from "react-router-dom";
import orderService from "../services/orders.service";

function OrderDetailsPage(props) {

    const [order, setOrder] = useState(null);
    const {orderId} = useParams();


    const getOrder = async() => {
        try {
           const order =  await orderService.getOrder(orderId)
        } catch(err){
            console.log(err)
        }
    }


    return (
        <>
    
        </>
    )
}