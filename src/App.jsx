
import { Outlet, Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import { Login } from './pages/Login'

import Orders from './pages/Orders'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import PlaceOrder from './pages/PlaceOrder'
import Verify from './pages/Verify'
import Loader from './components/Loader'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import ShopContextProvider from './context/ShopContext'
import Layout from './components/Layout'
import WishList from './components/WishList'
import { MdLocalOffer } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { FaPhoneAlt } from 'react-icons/fa'
function App() {

  return (
    <ShopContextProvider>
      <div className='bg-gray-800 w-full h-10 text-white'><div className='px-4  sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-2 flex justify-between items-center'>
        <div className='md:text-base text-[10px] gap-2'>First Order 100₹ Off up to 500₹<MdLocalOffer className='inline gap' /></div>
        <div className='md:text-base text-[10px]' >Cupon code:RAM123<BiSolidOffer className='inline ' /></div>
        <div className='md:text-base text-[10px]'> <FaPhoneAlt className='inline' />+1-800-123-4567</div>
      </div></div>
      <div className='px-4  sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <ToastContainer />

        <Routes>
          <Route path='/' element={<Layout />} >
            <Route path='/' element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/verify" element={<Verify />} />
            <Route path='/loader' element={<Loader />} />
            <Route path='/forget-password' element={<ForgetPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/wishlist' element={<WishList />} />
          </Route>

        </Routes>

      </div>
      <Footer />
    </ShopContextProvider>
  )
}

export default App

const auth = () => {
  return (
    <>
      <Routes>
        <Route
        />
      </Routes>

    </>
  )
}