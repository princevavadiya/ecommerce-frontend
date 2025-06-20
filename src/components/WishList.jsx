import React, { useContext } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'
import Loader from './Loader'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify'
function WishList() {
  const { token, loading, backendUrl, products, currency, setLoading } = useContext(ShopContext)
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const userId = localStorage.getItem("userId")



  const getwishlistProduct = async () => {
    try {
      // setLoading(true)
      const response = await axios.get(`${backendUrl}/api/product/wishlist`, { headers: { token }, params: { userId }} );

      if (response.data.success && response.data.productwish.length > 0) {
        const allProducts = response.data.productwish.flatMap(item => item.product);
        setWishlistProducts(allProducts);
        // setLoading(false)
      }



    } catch (error) {
      console.error('Error fetching wishlist:', error);
      // setLoading(false)

    }
  }


  const removeFromWishlist = async (productId) => {
    try {
      console.log("Remove productId:", userId)
      const res = await axios.delete(`${backendUrl}/api/product/wishlist/remove/${productId}`, { headers: { token }, data: { userId } }

      );
      console.log("Remove response:", productId)
      if (res.data.success) {
        toast.success("Removed from wishlist");
        getwishlistProduct();
      } else {
        toast.error(res.data.message || "Failed to remove");
      }
    } catch (error) {
      console.error("Remove error:", error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getwishlistProduct()
  }, [products])

  // if (loading) return <Loader />
  return (
    <>
      <div>
        <Title text1={'WISH'} text2={'LIST'} />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            wishlistProducts.map(product => (


              <div key={product._id} >

                <Link className='text-gray-700 cursor-pointer ' to={`/product/${product._id}`}>
                  <div className='overflow-hidden'>
                    <img className='hover:scale-110 transition ease-in-out duration-300' src={product.image[0]} alt="" />
                  </div>


                </Link>
                <div className='flex justify-between'>
                  <div>

                    <p className='pt-3 pb-1 text-sm '>{product.name}</p>
                    <p className='text-sm font-medium'>{currency}{product.price}</p>
                  </div>
                  <DeleteIcon onClick={() => removeFromWishlist(product._id)} className='mt-3 mr-2' />
                </div>
              </div>


            )

            )
          }
        </div>
      </div>
    </>

  )
}


export default WishList