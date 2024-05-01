import axios from "axios";

const api = axios.create({ 
    baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5005'
})

const errorHandler = (err) => {
    throw err
}

const yahooLogin = () => {
    return  api.get('auth/yahoo-login') 
}

// const yahooRegister = () => {
//     return  api.get('auth/yahoo-register') 
// }

export default {
    errorHandler,
    yahooLogin
}