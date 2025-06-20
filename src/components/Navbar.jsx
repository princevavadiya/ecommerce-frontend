import { useContext, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link, NavLink } from "react-router"
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const { setShowSearch, getCartCount, token, setToken, setCartItems, navigate } = useContext(ShopContext)
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken("");
    setCartItems({})
    navigate("/login");
    toast.success("Logout Successfully");

  }

  return (
    <div className='flex justify-between items-center py-5 font-medium '>
      <Link to="/">
        <img src={assets.logo} className='w-36' alt="" />

      </Link>
      <ul className='hidden md:flex gap-5 text-sm text-gray-700 '>
        <NavLink to="/" className="flex flex-col items-center gap-1 ">
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 duration-300  ease-in hidden' />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1 ">
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1 ">
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>



        <NavLink to="/contact" className="flex flex-col items-center gap-1 ">
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <Link to="https://ecommerce-admin-tau-six.vercel.app" className='flex flex-col items-center gap-1' target='_blank' >
          <div className='border-b-2 border-gray-700 text-center text-blue-800  '>ADMIN</div>

        </Link>
      </ul>

      <div className='flex items-center gap-6'>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
        <div className='group relative'>

          <img onClick={() => token ? null : navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
          {
            token ?
              <div className='group-hover:block hidden absolute right-0 pt-4 '>
                <div className='flex flex-col gap-2 w-36 px-5 py-3 bg-slate-100 text-gray-500 rounded '>
                  <Link to={`/wishlist`}>
                    <p className='cursor-pointer hover:text-black'>WishList</p>
                  </Link>
                  <Link to="/orders">
                    <p className='cursor-pointer hover:text-black'>Orders</p>
                  </Link>
                  <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                </div>
              </div> : null
          }
        </div>
        <Link to="/cart" className='relative'>

          <img src={assets.cart_icon} className='w-5 cursor-pointer min-w-5' alt="" />
          <p className='absolute right-[-5px] bottom-[-5px] bg-black text-white rounded-full w-4 text-[8px]   text-center leading-4 aspect-square'>{getCartCount()}</p>
        </Link>
        <img onClick={() => setVisible(!visible)} src={assets.menu_icon} className='w-5 cursor-pointer md:hidden block' alt="" />

      </div>
      {/* Sidebar menu  */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white tranistion-all ease-in-out duration-300 ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer '>
            <img className='h-4  rotate-180' src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6  text-center' to="/">HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6  text-center' to="/collection">COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6  text-center' to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6  text-center' to="/contact">CONTACT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6  text-center' to="https://ecommerce-admin-tau-six.vercel.app" target='_blank'>ADMIN</NavLink>
        </div>
      </div>

    </div>
  )
}

export default Navbar