import axios from "axios";

class OrderService {
    constructor(){
        this.api = axios.create({
            baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5005'
        })

        this.api.interceptors.request.use(config => {

            const storedToken = localStorage.getItem('authToken')
        
            if(storedToken){
                config.headers = { Authorization: `Bearer ${storedToken}`}
            }

            return config;
        })
    }

    getOrders = () => {
        return this.api.get('/api/orders');
    }

    getDetails = (orderId) => {
        return this.api.get(`/api/orders/${orderId}`);
    }

    create = (orderReqBody) => {
        return this.api.post('/api/orders', orderReqBody);
    }

    update = (orderId, orderReqBody) => {
        return this.api.put(`/api/orders/${orderId}`, orderReqBody)
    }

    patch = (orderId, orderReqBody) => {
        return this.api.patch(`/api/orders/${orderId}`, orderReqBody)
    }
}

const orderService = new OrderService();
export default orderService;