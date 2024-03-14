import { useEffect, useState } from "react"
import OrderCard from "../components/OrderCard";
import orderService from "../services/orders.service";
import { Link } from "react-router-dom";
function OrdersPage() {

    const [orders, setOrders] = useState([])
    const [ordersData, setOrdersData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(undefined);
    const headerStyle = {
        backgroundColor: '#f2f2f2',
        padding: '8px',
        textAlign: 'left'
    };
    useEffect(() => {
        orderService
            .getOrders()
            .then(res => {
                setOrders(res.data)
                setOrdersData(res.data)
                setIsLoading(false)
            })
            .catch((err) => {
                setIsLoading(false);
                setErrorMsg(err.response.data.message);
            })
    }, [])

    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div>
            <p>SortBy:</p>
            <button>Date</button>
            <button>Price</button>
            <button>Status</button>
            <input type="text" placeholder="type product..." />
            <hr />
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th scope="col" style={headerStyle}>Order ID</th>
                        <th scope="col" style={headerStyle}>User</th>
                        <th scope="col" style={headerStyle}>Order Date</th>
                        <th scope="col" style={headerStyle}>Last Updated</th>
                        <th scope="col" style={headerStyle}>Price</th>
                        <th scope="col" style={headerStyle}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(order => {
                            return (
                        
                                        <OrderCard key={order._id} {...order} />
                                
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrdersPage