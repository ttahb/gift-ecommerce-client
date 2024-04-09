import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5005'
});

const errorHandler = (err) => {
    throw err
}

const googleAuth = (file) => {

    return api.post("/auth/login-google", {token: file})
}

export default {
    googleAuth,
    errorHandler
}