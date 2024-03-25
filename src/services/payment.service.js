import axios from "axios";

class PaymentService {

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

    createPaymentIntent = (reqBody) => {
        return this.api.post('/api/create-payment-intent', reqBody);
    }
}

const paymentService = new PaymentService();
export default paymentService;