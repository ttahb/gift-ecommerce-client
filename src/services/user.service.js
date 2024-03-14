import axios from "axios";

class UserService {

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

    getUser = (userId) => {
        return this.api.get(`/api/users/${userId}`);
    };

    getAllUsers = () => {
        return this.api.get('/api/users');
    };

    updateUser = (userId, userData) => {
        return this.api.put(`/api/users/${userId}`, userData);
    };

    updateUserFields = (userId, userData) => {
        return this.api.patch(`/api/users/${userId}`, userData);
    };

}

const userService = new UserService();
export default userService;