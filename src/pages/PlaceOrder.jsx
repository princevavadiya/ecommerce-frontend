import { useContext, useState } from "react"
import { assets } from "../assets/frontend_assets/assets"

import Title from "../components/Title"
import { ShopContext } from "../context/ShopContext"
import axios from "axios"
import { toast } from "react-toastify"

const PlaceOrder = () => {
  const { currency, delivery_fee, getCartAmount, backendUrl } = useContext(ShopContext);
  const orderTotal = getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee;
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(orderTotal);
  const [couponApplied, setCouponApplied] = useState(false);
  const userId = localStorage.getItem("userId");

  const applyCoupon = async (code, userId, orderTotal) => {
    try {
      const res = await axios.post(`${backendUrl}/api/coupon/apply`, {
        code,
        userId,
        orderTotal
      });

      if (res.data.success) {
        setDiscount(res.data.discount);
        setFinalAmount(res.data.finalAmount);
        setCouponApplied(true);
        toast.success(`Coupon applied! You saved ₹${res.data.discount}`);
      } else {
        toast.error("your coupon is not valid");
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const markCouponUsed = async (code, userId) => {
    try {
      const res = await axios.post(`${backendUrl}/api/coupon/mark-used`, {
        code,
        userId
      });
      if (res.data.success) {
        console.log("Coupon marked as used");
      }
    } catch (err) {
      toast.error("Failed to mark coupon as used:", err.response?.data?.message);
    }
  };

  const handleApplyCoupon = async () => {
    await applyCoupon(code, userId, orderTotal);
  };

  const handlePlaceOrder = async () => {

    if (couponApplied) {
      await markCouponUsed(code, userId);
    }
  };

  const couponCodeStatusIcon = () => {
    if (!code) return null;
    if (couponApplied) {
      return <img src={assets.done} alt="success" width={40} />;
    } else {
      return <img src={assets.wrong} alt="invalid" width={40} />;
    }
  };

  const [method, setMethod] = useState('cod')
  const { navigate, token, cartItems, setCartItems, products } = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',

  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }))
  }
  const onSubmitHandler = async (event) => {




    event.preventDefault();

    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)


            }

          }
        }

      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {

        // API calls for Cod
        case 'cod':
          const response = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } })
          console.log(response)
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')

          } else {
            toast.error(response.data.message)
          }
          break;
        case 'stripe':

          const responseStripe = await axios.post(backendUrl + "/api/order/stripe", orderData, { headers: { token } })
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }


          break;
        default:
          break;
      }

    } catch (error) {
      console.error(error)
      toast.error(error.message)

    }
  }




  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3 ">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder="First Name" />
          <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder="Last Name" />

        </div>
        <input required onChange={onChangeHandler} name="email" value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="email" placeholder="Email address" />
        <input required onChange={onChangeHandler} name="street" value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder="Street" />
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="city" value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder="City" />
          <input required onChange={onChangeHandler} name="state" value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder="State" />

        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="number" placeholder="Zipcode" />
          <input required onChange={onChangeHandler} name="country" value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder="country" />

        </div>

        <input required onChange={onChangeHandler} name="phone" value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full appearance-none' type="number" placeholder="Phone" />

      </div>
      {/* right side  */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">



          <div className='w-full'>
            <div className='text-2xl'>
              <Title text1={'CART'} text2={'TOTALS'} />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
              <div className='flex justify-between gap-2'>
                <input
                  value={code}
                  type="text"
                  className='border border-gray-400 w-full p-2 cursor-pointer'
                  placeholder='Apply your coupon code'
                  onChange={(e) => setCode(e.target.value)}
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={couponApplied}
                  className='w-full bg-black text-white p-2 cursor-pointer'
                >
                  Apply code
                </button>
                {couponCodeStatusIcon()}
              </div>

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
                <p>Coupon Code Discount</p>
                <p>-₹{discount}</p>
              </div>
              <hr />

              <div className='flex justify-between'>
                <b>Total</b>
                <b>{finalAmount}{currency}</b>
              </div>
            </div>


          </div>
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/*---------- payment methods Selection --------------- */}

          <div className="flex gap-3 flex-col lg:flex-row " >

            <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer ">
              <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />

            </div>

            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer ">
              <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4 ">CASH ON DELIVERY</p>
            </div>

          </div>
          <div className="w-full text-end mt-8 ">
            <button type="submit" onClick={handlePlaceOrder} className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
          </div>
        </div>

      </div>



    </form>
  )
}

export default PlaceOrder