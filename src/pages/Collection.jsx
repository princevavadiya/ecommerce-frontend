import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { assets } from "../assets/frontend_assets/assets"
import Title from "../components/Title"
import ProductItem from "../components/ProductItem"
import Loader from "../components/Loader"
import axios from "axios"
import qs from 'qs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



function Collection() {

  const { products, search, showSearch, loading, backendUrl, setLoading } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])

  // const [sortType, setSortType] = useState('relavent');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortType, setSortType] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);



  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };
  const toggleSubCategory = (e) => {
    const { value, checked } = e.target;
    setSelectedTypes((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const fetchFilteredProducts = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${backendUrl}/api/product/lists`, {
        params: {
          categories: selectedCategories,
          types: selectedTypes,
          sort: sortType,
          page: currentPage,
          limit: 12
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        }
      });

      setFilterProducts(res.data.products);
      setTotalPages(res.data.totalPages);
      setLoading(false);

    } catch (err) {
      console.error("Failed to fetch products:", err);
      setLoading(false);
    }
  };






  useEffect(() => {
    setCurrentPage(1); // Reset to first page on filter change
  }, [selectedCategories, selectedTypes, sortType, search, showSearch]);

  useEffect(() => {
    fetchFilteredProducts();
  }, [currentPage, selectedCategories, selectedTypes, sortType, search, showSearch]);

  if (loading) return <Loader />
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-1  sm:gap-10 pt-10 border-t">
        {/* filter Options  */}
        <div className="min-w-60">


          <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2 ">FILTERS
            <img className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} src={assets.dropdown_icon} alt="" />
          </p>
          {/* Category Filter  */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block `}>
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700 ">
              <p className="flex gap-2 ">
                <input className="w-3 cursor-pointer" type="checkbox" value={'Men'} onChange={handleFilterChange} id="men" checked={selectedCategories.includes('Men')} /> <label htmlFor="men" className=" cursor-pointer" >Men</label>
              </p>
              <p className="flex gap-2  cursor-pointer">
                <input className="w-3" type="checkbox" value={'Women'} id="women" onChange={handleFilterChange} checked={selectedCategories.includes('Women')} /> <label htmlFor="women"
                  className="cursor-pointer" >Women</label>
              </p>
              <p className="flex gap-2  cursor-pointer">
                <input className="w-3" type="checkbox" value={'Kids'} id="kids" onChange={handleFilterChange} checked={selectedCategories.includes('Kids')} /> <label htmlFor="kids"
                  className=" cursor-pointer"> Kids</label>
              </p>


            </div>
          </div>
          {/* SubCatogies Filter */}


          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block `}>
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700 ">
              <p className="flex gap-2 ">
                <input className="w-3 cursor-pointer" id="Topwear" type="checkbox" value={'Topwear'}
                  onChange={toggleSubCategory} checked={selectedTypes.includes('Topwear')} /> <label htmlFor="Topwear" className="cursor-pointer"  >Topwear</label>
              </p>
              <p className="flex gap-2 ">
                <input className="w-3 cursor-pointer" id="Bottomwear" type="checkbox" value={'Bottomwear'}
                  onChange={toggleSubCategory} checked={selectedTypes.includes('Bottomwear')} /> <label htmlFor="Bottomwear" className="cursor-pointer" >Bottomwear</label>
              </p>
              <p className="flex gap-2 ">
                <input className="w-3 cursor-pointer" type="checkbox" id="Winterwear" value={'Winterwear'} onChange={toggleSubCategory} checked={selectedTypes.includes('Winterwear')} /> <label htmlFor="Winterwear" className="cursor-pointer" >Winterwear</label>
              </p>

            </div>
          </div>




        </div>


        {/* right side  */}
        <div className="flex-1 ">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <Title text1={"ALL"} text2={"COLLECTIONS"} />
            {/* Product Sort */}
            <select onChange={(e) => setSortType(e.target.value)} value={sortType} className="border-2 border-gray-300 text-sm px-2 ">
              <option value="">Sort by: Relavent</option>
              <option value="low-high" >Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>


          </div>

          {/* Map Products */}


          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 ">
            {
              filterProducts.map((item, index) => (
                <ProductItem key={index} name={item.name} id={item._id} image={item.image} price={item.price} />


              ))
            }
          </div>


        </div>



      </div>
      <div className="flex justify-center mt-15 space-x-5">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="  px-3 py-1 cursor-pointer">
          &lt; &lt; &lt;
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 border rounded-full cursor-pointer ${currentPage === index + 1 ? 'bg-black text-white' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1  cursor-pointer">
          &gt; &gt; &gt;
        </button>
      </div>

    </>


  )


}

export default Collection