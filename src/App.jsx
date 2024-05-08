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
import OrderDetailsPage from './pages/OrderDetailsPage';
import ProductEditPage from './pages/ProductEditPage';
import BasketPage from './pages/BasketPage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer';
import AddressPage from './pages/AddressPage';
import PaymentsPage from './pages/PaymentsPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import ErrorPage from './pages/ErrorPage';
import VerifyClient from './pages/VerifyClient';

function App() {

  return (
    <>
      <Navbar/>

      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path="/register" element={<IsAnon><RegisterPage /></IsAnon>} /> 
        <Route path='/login' element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path='/basket' element={<IsPrivate><BasketPage /></IsPrivate>} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/product/:productId' element={<ProductDetailsPage />} />
        <Route path='/product/create' element={<IsPrivate><ProductCreatePage /></IsPrivate> } />
        <Route path='/product/edit/:productId' element={<IsPrivate><ProductEditPage /></IsPrivate>} />
        <Route path='/orders' element={<IsPrivate><OrdersPage/></IsPrivate>} />
        <Route path='/users/:userId' element={<IsPrivate><UserProfilePage /></IsPrivate>}/>
        <Route path='/users/edit/:userId' element={<IsPrivate><UserProfileEditPage /></IsPrivate>}/>
        <Route path='/orders/:orderId' element={<IsPrivate><OrderDetailsPage/></IsPrivate>}/>
        <Route path='/address' element={<IsPrivate><AddressPage/></IsPrivate>}/>
        <Route path='/payments' element={<IsPrivate><PaymentsPage/></IsPrivate>} />
        <Route path='/payments/:currentOrderId/success' element={<IsPrivate><PaymentSuccessPage/></IsPrivate>} />
        <Route path='/verify-client' element={<VerifyClient />} />

        <Route path="*" element={ <ErrorPage /> } />
      </Routes> 

      <Footer/>
    </>
  )
}

export default App
