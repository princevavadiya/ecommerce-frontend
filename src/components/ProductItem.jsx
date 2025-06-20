import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router'
import { BackgroundGradient } from './ui/background-gradient'



function ProductItem({ id, image, name, price, loading }) {
  const { currency } = useContext(ShopContext)



  return (

    // <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-2 bg-black dark:bg-zinc-900">
    <Link className='text-gray-700 cursor-pointer bg-white' to={`/product/${id}`}>

      <div className='overflow-hidden border rounded-2xl'>
        <img className='hover:scale-110 transition ease-in-out duration-300' src={image[0]} alt="" />
      </div>
      <p className='pt-3 pb-1 text-sm  '>{name}</p>
      <p className='text-sm font-medium  '>{price}{currency}</p>

    </Link>
    // </BackgroundGradient>
  )
}

export default ProductItem