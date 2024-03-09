import React, { useEffect, useState } from "react"
import authService from "../services/auth.service";
const AuthContext = React.createContext()

function AuthProviderWrapper(props){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const authenticateUser = () => {

        const storedToken = localStorage.getItem('authToken');

        if(storedToken) {
            authService
            .verify()
            .then(response => {
                const payload = response.data;
                setIsLoggedIn(true);
                setIsLoading(false);
                setUser(payload);
            })
            .catch(err => {
                console.log(`error ${err}`)
                setIsLoggedIn(false);
                setIsLoading(false);
                setUser(null);
            })
        } else {
                setIsLoggedIn(false);
                setIsLoading(false);
                setUser(null);
        }
    }

    const storeToken = token => {
        localStorage.setItem('authToken', token);
    }

    const removeToken = () => {
        localStorage.removeItem('authToken');
    }

    const logOutUser = () => {
        removeToken();
        authenticateUser(); 
    }

    useEffect(() => {
        authenticateUser();
    }, [])

    return (
        <AuthContext.Provider value={{user, isLoggedIn, isLoading, authenticateUser, storeToken, logOutUser}}>
            {props.children}
        </AuthContext.Provider>
    ) 
}

export {AuthProviderWrapper, AuthContext};