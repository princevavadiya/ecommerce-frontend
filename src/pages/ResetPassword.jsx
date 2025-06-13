import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router"
import { ShopContext } from "../context/ShopContext"
import { toast } from "react-toastify"



function ResetPassword() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [resetToken, setResetToken] = useState("")
  const location = useLocation();
  const { navigate, loading } = useContext(ShopContext)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get("token");
    if (token) {
      setResetToken(token)


    } else {
      toast.error("Reset Token not found")
    }
  }, [location.search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      toast.error("Passwords do not match")
      return;

    }
    try {
      const response = await axios.post(
        "https://e-commerce-backend-6892.vercel.app/api/user/reset-password", { password, token: resetToken }
      )

      console.log(response.data);
      toast.success("Password Reset Successfully")
      navigate("/")
    } catch (error) {
      toast.error(error)
      toast.error("Password Reset Failed")
      navigate("/")

    }

  }


  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl '>Reset  Password</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />

      </div>

      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full px-3 py-2 border border-gray-800 ' placeholder='New Password' required />
      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='w-full px-3 py-2 border border-gray-800 ' placeholder='Confirm Password' required />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>



      </div>
      <button type="submit" className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer'>Reset Password</button>

    </form>
  )
}

export default ResetPassword