import axios from 'axios';
import { useState } from 'react'
import { toast } from 'react-toastify';



const NewsletterBox = () => {





  const [formData, setFormData] = useState({

    email: ""

  });

  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/send-mail", formData);
      toast.success("Mail sent successfully!");


    } catch (error) {
      console.error(error);
      toast.error("Failed to send mail");

    }
  };

  return (

    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscibe now & get 20% off</p>
      <p className='text-gray-400 mt-3 '>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sequi earum corrupti, nemo in, provident ipsam magni .
      </p>
      <form onSubmit={handleSubmit} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 ' >
        <input onChange={handleChange} name="email"
          className='w-full sm:flex-1 outline-none ' type="email" id="" placeholder='Enter your email' required />
        <button className='bg-black text-white text-xs px-10 py-4 cursor-pointer' type='submit'  >SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsletterBox