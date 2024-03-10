import axios from "axios";

class ProductsService {

    constructor(){
        this.api = axios.create({
            baseURL: import.meta.env.SERVER_URL || 'http://localhost:5005'
        })

        this.api.interceptors.request.use(config => {

            const storedToken = localStorage.getItem('authToken')
        
            if(storedToken){
                config.headers = { Authorization: `Bearer ${storedToken}`}
            }

            return config;
        })
    }

    getProducts = () => {
        return this.api.get('/api/products');
    }

    //rest of the routes 

}

const productsService = new ProductsService();
export default productsService;