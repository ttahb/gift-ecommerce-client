import React, { useEffect, useState } from "react"
import authService from "../services/auth.service";
const AuthContext = React.createContext()

function AuthProviderWrapper(props){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const authenticateUser = () => {

        const storedToken = localStorage.getItem('authToken');

        console.log('stored token', storedToken)

        if(storedToken) {
            authService
            .verify()
            .then(response => {
                const payload = response.data;
                // console.log('Date log after the response',Date.now())
                // console.log('payload after the response ==>', payload)
                setIsLoggedIn(true);
                setIsLoading(false);
                setUser(payload);
                // console.log('Date log after the user',Date.now())
                // console.log('payload after the user ==>', user)
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