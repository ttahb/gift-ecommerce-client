import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5005'
});

const errorHandler = (err) => {
    throw err;
}

const googleAuthLogin = (num) => {
    console.log(num)
    return api.post("/auth-google/login", {numb: num});
}

export default {
    googleAuthLogin,
    errorHandler
}