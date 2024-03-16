import { useState } from "react";
import { Link } from "react-router-dom";
import orderService from "../services/orders.service";
import { useNavigate } from "react-router-dom";

function OrderCard({ _id, orderNumber, createdAt, updatedAt, user, amount, status }) {

    const [selectedStatus, setSelectedStatus] = useState(status)
    const [erroroMsg, setErrorMsg] = useState(undefined);

    const handleStatusChange = (e) => setSelectedStatus(e.target.value);

    const clearErrorMessage = () => {
        setErrorMsg(undefined);
    }

    const handleStatusUpdate = () => {
        orderService
            .patch(_id, { status: selectedStatus })
            .then(res => {
                console.log('patched order', res.data);
                setSelectedStatus(res.data.status);
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
            <td>{user.fullName}</td>
            <td>{formatDate(createdAt)}</td>
            <td>{formatDate(updatedAt)}</td>
            <td>€{amount}</td>
            <td>
                {!erroroMsg && <select value={selectedStatus} onChange={handleStatusChange}>
                    <option value="Order Created">Order Created</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Needs Payment confirmation">Needs Payment confirmation</option>
                    <option value="Completed">Completed</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Refunded">Refunded</option>
                </select>} 
                {!erroroMsg && <button onClick={handleStatusUpdate}>✅</button>}
                {erroroMsg && <p>⚠️{erroroMsg}</p>}{erroroMsg && <button onClick={clearErrorMessage}>✖</button>}
            </td>
        </tr>

    )
}

export default OrderCard;