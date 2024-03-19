import './App.css'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductCreatePage from './pages/ProductCreatePage';
import OrdersPage from './pages/OrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import UserProfileEditPage from './pages/UserProfileEditPage';

function App() {

  return (
    <>
      <Navbar/>

      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path='/login' element={<LoginPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/product/:productId' element={<ProductDetailsPage />} />
        <Route path='/product/create' element={<ProductCreatePage /> } />
        <Route path='/orders' element={<OrdersPage/>} />
        <Route path='/users/:userId' element={<UserProfilePage />}/>
        <Route path='/users/edit/:userId' element={<UserProfileEditPage />}/>
      </Routes> 
    </>
  )
}

export default App
