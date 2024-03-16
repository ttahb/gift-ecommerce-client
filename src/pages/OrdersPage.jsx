import { useEffect, useState } from "react"
import OrderCard from "../components/OrderCard";
import orderService from "../services/orders.service";
import { Link } from "react-router-dom";

function OrdersPage() {

    const [orders, setOrders] = useState([])
    const [ordersData, setOrdersData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(undefined);
    const [dateAsc, setDateAsc] = useState(true);
    const [priceDsc, setPriceDsc] = useState(true);
    const [status, setStatus] = useState(undefined);
    // const [searchQuery, setSearchQuery] = useState('');

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

    const sortByDate = () => {
        const ordersSortedByDate = [...orders];
        ordersSortedByDate.sort((o1, o2) => {
            const date1 = new Date(o1.createdAt)
            const date2 = new Date(o2.createdAt)
            if(dateAsc){
                setDateAsc(false);
                return date1-date2;
            }
                setDateAsc(true)
                return date2 - date1;
            
        })
        setOrders(ordersSortedByDate);
    }

    const sortByPrice = () => {
        const ordersSortedByPrice = [...orders]
        ordersSortedByPrice.sort((o1, o2) => {
            if(priceDsc){
                setPriceDsc(false)
                return o2.amount - o1.amount;
            }
            setPriceDsc(true)
            return o1.amount - o2.amount;
        })
        setOrders(ordersSortedByPrice);
    }

    const filterByStatus = (e) => {
        console.log('e.target.value', e.target.value)
        if(e.target.value && e.target.value !== '--status--'){
            const filteredByStatus = [...ordersData].filter(o => o.status === e.target.value)
            setOrders(filteredByStatus);
            setStatus(e.target.value);
        } else {
           setOrders(ordersData);
           setStatus(undefined);
        }   
       
    }

    const clearStatusFilter = () => {
        setOrders(ordersData);
        setStatus(undefined);
    }

    const handleOrderSearch = (e) => {
        const query = e.target.value;
        console.log('query', query);
        setOrders(ordersData);
        if(query !== ''){
            const filteredOrders = [...ordersData].filter( order => {
                console.log('order=>', order)
               return order.content.some(product =>{ 
                    console.log('productName', product.productName)
                    return product.productName.toLowerCase().includes(query.toLowerCase())
                })
            })
            console.log('filteredOrders',filteredOrders)
            setOrders(filteredOrders);
        } else {
            setOrders(ordersData);
        }
    }

    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div>
            <span>SortBy:</span>
            <button onClick={sortByDate}>Date</button>
            <button onClick={sortByPrice}>Price</button>
            <span>Filter By:</span>
            <select value={status} onChange={filterByStatus}>
                    <option value= {undefined}>{status === undefined ? '--status--':'--status--'}</option>
                    <option value="Order Created">Order Created</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Needs Payment confirmation">Needs Payment confirmation</option>
                    <option value="Completed">Completed</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Refunded">Refunded</option>
            </select>
            {status && <button onClick={clearStatusFilter}>✖</button>}
            <br />
            <input type="text" placeholder="Search your order here" onChange={handleOrderSearch} />
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
                        orders.length === 0 ? <p>No orders found. Try again :(</p> :
                        orders.map(order => {
                            return (<OrderCard key={order._id} {...order} />)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrdersPage