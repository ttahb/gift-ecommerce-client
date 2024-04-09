import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from './context/auth.context.jsx';
import { CartProviderWrapper } from './context/cart.context.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <AuthProviderWrapper>
        <CartProviderWrapper>
          <GoogleOAuthProvider clientId="467951437559-jg0hkno2ktutj2d6ks09t2qs8b32pasr.apps.googleusercontent.com">
            <App />
          </GoogleOAuthProvider>
        </CartProviderWrapper>
      </AuthProviderWrapper>
    </Router>
)
