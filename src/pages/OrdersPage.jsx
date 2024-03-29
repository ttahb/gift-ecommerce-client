import { useEffect, useState } from "react"
import OrderCard from "../components/OrderCard";
import orderService from "../services/orders.service";
import "./OrdersPage.css"


function OrdersPage() {
        
    const [orders, setOrders] = useState([])
    const [ordersData, setOrdersData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(undefined);
    const [dateAsc, setDateAsc] = useState(true);
    const [priceDsc, setPriceDsc] = useState(true);
    const [status, setStatus] = useState(undefined);
    
    // const headerStyle = {
    //     backgroundColor: '#f2f2f2',
    //     padding: '8px',
    //     textAlign: 'left'
    // };

    const getOrders = () => {
        orderService
        .getOrders()
        .then(res => {
            setOrders(res.data)
            setOrdersData(res.data)
            setIsLoading(false)
        })
        .catch((err) => {
            console.log('err',err)
            setIsLoading(false);
            setErrorMsg(err.response.data.message);
        })
    }

    useEffect(() => {
        getOrders();
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
            <div className='loading-div'>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="orders-container">

            <div className="search-bar-orders">
                <input 
                    // className="search-order-bar"
                    type="search" 
                    placeholder="Search your order here...                                                                       &#128270;"
                    onChange={handleOrderSearch} 
                />
            </div>
            <div className="sort-filter-bar-orders">
                <div className="sort-by-container">
                    <span>SortBy:</span>
                    <button className="secondary" onClick={sortByDate}>Date</button>
                    <button className="secondary" onClick={sortByPrice}>Price</button>
                </div>

                <div className="filter-container">
                    <span>Filter By:</span>
                    <select value={status} onChange={filterByStatus}>
                            <option value= {undefined}>{status === undefined ? '--status--':'--status--'}</option>
                            <option value="Order Created">Order Created</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Needs Payment confirmation">Needs Payment confirmation</option>
                            <option value="Paid">Paid</option>
                            <option value="Completed">Completed</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Refunded">Refunded</option>
                    </select>
                    {status && <button className="secondary" onClick={clearStatusFilter}>✖</button>}
                </div>
            </div>
            
            <div className="table-container">
        
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="table-header">Order ID</th>
                            <th scope="col" className="hide-column table-header">User</th>
                            <th scope="col" className="hide-column-second-stage table-header">Order Date</th>
                            <th scope="col" className="hide-column-second-stage table-header">Last Updated</th>
                            <th scope="col" className="hide-column-stage-three table-header">Price</th>
                            <th scope="col" className="table-header">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {errorMsg && <tr><td><p>{errorMsg}</p></td></tr>}
                        {!errorMsg &&
                            orders.length === 0 ? <tr><td><p>No orders found. Try again</p></td></tr> :
                            orders.map(order => {
                                return (<OrderCard key={order._id} {...order} getOrders={getOrders}/>)
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrdersPage