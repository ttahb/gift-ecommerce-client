import axios from "axios";

class ProductsService {

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

    getAllProducts = pageNum => {
        return this.api.get(`/api/products?_page=${pageNum}`);
    }

    getProduct = id => {
        return this.api.get(`/api/products/${id}`)
    }

    createProduct = reqBody => {
        return this.api.post(`/api/products`, reqBody)
    }

    changeProduct = (id, reqBody ) => {
        return this.api.put(`/api/products/${id}`, reqBody)
    } 

    deleteProduct = id => {
        return this.api.delete(`/api/products/${id}`)
    }

    oneChangeProduct = id => {
        return this.api.patch(`/products/${id}`)
    }
}

const productsService = new ProductsService();
export default productsService;