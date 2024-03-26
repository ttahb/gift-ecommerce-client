import { useState } from "react";
import { Link } from "react-router-dom";
import orderService from "../services/orders.service";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function OrderCard(props) {
    const { _id, orderNumber, createdAt, updatedAt, amount, status } = props;
    const [selectedStatus, setSelectedStatus] = useState(status)
    const [errorMsg, setErrorMsg] = useState(undefined);
    const handleStatusChange = (e) => setSelectedStatus(e.target.value);
    const {user} = useContext(AuthContext);

    const clearErrorMessage = () => {
        setErrorMsg(undefined);
    }

    const handleStatusUpdate = () => {
        orderService
            .patch(_id, { status: selectedStatus })
            .then(res => {
                console.log('patched order', res.data);
                setSelectedStatus(res.data.status);
                props.getOrders();
            })
            .catch(err => {
                console.log('err', err);
                setErrorMsg(err.response.data.message)
            })
    };

    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'long', year: 'numeric'};
        return new Intl.DateTimeFormat('en', options).format(new Date(date));
    }

    return (
        <tr>
            <td><Link to={`/orders/${_id}`}>{orderNumber}</Link></td>
            <td className="hide-column">{props.user.fullName}</td>
            <td className="hide-column-second-stage">{formatDate(createdAt)}</td>
            <td className="hide-column-second-stage">{formatDate(updatedAt)}</td>
            <td className="hide-column-stage-three">€{amount}</td>
            { user.role.toLowerCase() === 'admin' &&
                <td>
                    {!errorMsg && <select value={selectedStatus} onChange={handleStatusChange}>
                        <option value="Order Created">Order Created</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Needs Payment confirmation">Needs Payment confirmation</option>
                        <option value="Paid">Paid</option>
                        <option value="Completed">Completed</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Refunded">Refunded</option>
                    </select>} 
                    {!errorMsg && <button className="secondary" onClick={handleStatusUpdate}>✅</button>}
                    {errorMsg && <p>⚠️{errorMsg}</p>}{errorMsg && <button className="secondary" onClick={clearErrorMessage}>✖</button>}
                </td>
            }
            {  user.role.toLowerCase() !== 'admin' && <td>{status}</td>}
        </tr>

    )
}

export default OrderCard;