import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import axios from "axios";

const cuponcodee = "Ram123"
const cuponcodeDolar = 100

const CartTotal2 = () => {
  const { currency, delivery_fee, getCartAmount, backendUrl } = useContext(ShopContext)
  const orderTotal = getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee
  const [couponcode, setCouponcode] = useState("")
  const [cuponFinal, setCuponfinal] = useState("")
  const userId = localStorage.getItem("userId")
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(orderTotal);
  const [couponApplied, setCouponApplied] = useState(false);







  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm '>

        <div className='flex justify-between'>
          <p>SubTotal</p>
          <p>{getCartAmount()}.00{currency}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shopping Fee</p>

          <p>{getCartAmount() === 0 ? 0 : delivery_fee}{currency}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>coupon Code Discount</p>

          <p>{cuponFinal}{currency}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Total</b>
          <b> {orderTotal}{currency}</b>
        </div>
      </div>




    </div>
  )
}

export default CartTotal2
