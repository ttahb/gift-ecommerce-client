import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5005'
});

const errorHandler = (err) => {
    throw err
}

const googleAuthLogin = () => {
    return api.get("/auth/login-google")
}

const googleAuthRegister = (file) => {
    return api.get("auth/register-google", {token: file})
}

export default {
    googleAuthLogin,
    errorHandler,
    googleAuthRegister
}