import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from './context/auth.context.jsx';
import { CartProviderWrapper } from './context/cart.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <AuthProviderWrapper>
        <CartProviderWrapper>
          <App />
        </CartProviderWrapper>
      </AuthProviderWrapper>
    </Router>
)
