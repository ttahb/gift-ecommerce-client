import './App.css'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route exact path="/register" element={<RegisterPage />} /> 
      </Routes>
    </>
  )
}

export default App
