import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link } from 'react-router'

const Footer = () => {
  return (<div>

    <div className='px-4  sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
        <div>
          <img src={assets.logo} className='mb-5 w-32 ' alt="" />
          <p className='w-full md:w-2/3 text-gray-600 '>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 '>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600 '>
            <Link to='/'>
              <li>Home</li>
            </Link>
            <Link to={'/about'}>
              <li>About us</li>
            </Link>
            <Link to={'/orders'}>
              <li>Delivery</li>
            </Link>
            <Link to={'/contact'}>
              <li>Privacy policy </li>
            </Link>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 '>GET IN TOUCH </p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+1-212-456-7890</li>
            <li>contact@foreveryou.com</li>

          </ul>
        </div>
      </div>

      <div className=''>
        <hr />

      </div>
    </div>
    <p className='py-5 text-sm text-center text-white bg-gray-800'>Copyright 2024@forever.com -All Right Reserved </p>
  </div>
  )
}

export default Footer