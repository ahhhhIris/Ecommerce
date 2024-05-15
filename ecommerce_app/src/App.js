import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from  './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import OurStore from './pages/OurStore';
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPloicy from './pages/RefundPloicy';
import ShippingPolicy from './pages/ShippingPolicy';
import Login from './pages/Login';
import Wishlist from './pages/Wishlist';
import Signup from './pages/Signup';
import TermAndContions from './pages/TermAndContions';
import Forgotpassword from './pages/Forgotpassword';
import Resetpassword from './pages/Resetpassword';
import { PrivateRoutes } from './routing/PrivateRoute';
import { OpenRoutes } from './routing/OpenRoutes';
import Order from './pages/Order';


function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product" element={<OurStore />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="cart" element={<PrivateRoutes><Cart /></PrivateRoutes>} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPloicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="login" element={<OpenRoutes><Login/></OpenRoutes>} />
            <Route path="wishlist" element={<PrivateRoutes><Wishlist /></PrivateRoutes>} />
            <Route path="signup" element={<OpenRoutes><Signup /></OpenRoutes>} />
            <Route path="term-conditions" element={<TermAndContions />} /> 
            <Route path="forgot-password" element={<Forgotpassword />} />
            <Route path="reset-password" element={<Resetpassword />} />
            <Route path="my-orders" element={<PrivateRoutes><Order /></PrivateRoutes>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>;
}

export default App;
