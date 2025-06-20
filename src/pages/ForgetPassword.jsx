import { ShopContext } from "@/context/ShopContext"
import axios from "axios"
import { useContext, useState } from "react"
import { toast } from "react-toastify"


function ForgetPassword() {
  const [email, setEmail] = useState('')
  const userId=localStorage.getItem("userId")
  const handleSubmit = async (e) => {
    const{navigate}=useContext(ShopContext)
    e.preventDefault()
    try {
      const response = await axios.post(
        "https://e-commerce-backend-6892.vercel.app/api/user/forget-password",
        { email }
      )

      toast.success("Mail Sent Successfully")
      console.log(response.data);
      
    } catch (error) {
     toast.error(error)
      

    }
  }
  return (
    !userId?
    <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl '>Forget Password</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />

      </div>

      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full px-3 py-2 border border-gray-800 ' placeholder='Verify Your Email' required />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>



      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>Send Mail</button>

    </form>:navigate('/')
  )
}

export default ForgetPassword