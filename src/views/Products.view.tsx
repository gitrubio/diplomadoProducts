import { getProducts } from '@/api/products.api'
import Loader from '@/components/ui/Loader'
import SearchInput from '@/components/ui/SearchInput'
import { Product } from '@/types/products.type'
import { StarIcon } from '@heroicons/react/16/solid'
import React, { useEffect, useState } from 'react'

export default function Productsview() {
    const [laoding,setLoading] = useState<boolean>(false)
    const [products,setProducts] = useState<Product[]>([])
    const [filterProducts,setFilterProducts] = useState<Product[]>([])
    const [searchTerm, setSearchTerm] = useState('')
     
    const productsToView = () => {
      if(searchTerm === '') {
        return products
      }
      return filterProducts
    }
  
    const fetchProducts = async () => {
        setLoading(true)
        const data = await getProducts()
        setProducts(data)
        setLoading(false)
    }
    
    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {

     const productsFilter =  products.filter((product) => {
        return product.title.toLowerCase().includes(searchTerm.toLowerCase())
      })
      setFilterProducts(productsFilter)
    }, [searchTerm])
    const fixTitle = (title: string) => (title.length > 20 ? title.slice(0, 20) + '...' : title)
    if(laoding) {
      return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <Loader/>
        </div>
      )
    }

  return (
  <div className="bg-white mt-0">
  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <div className='flex justify-between'>
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
    <SearchInput   searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {productsToView().map((product) => (
            <div className="group relative shadow-lg p-6 bg-white rounded-lg  ">
            <div className="w-full h-[200px] transition-all  ease-in-out flex items-center justify-center  overflow-hidden rounded-md  lg:aspect-none group-hover:scale-110 lg:h-80">
              <img src={product.image}/>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href="#">
                    <span aria-hidden="true" className="absolute inset-0"></span>
                    {fixTitle(product.title)}
                  </a>
                </h3>
                <div className='flex justify-start items-center'>
                <StarIcon className='size-4  transition-all duration-300 text-yellow-300  ' />
                <p className="text-sm text-gray-950">{product.rating.rate}</p>
               
                <p className="text-sm text-gray-500  ml-1 ">({product.rating.count}</p>
                <p className='text-sm text-gray-500 ml-2'>reviews)</p>
                </div>
              
              </div>
             <div>
             <p className="text-sm font-medium text-gray-900 ">${product.price}</p>
             <p className="text-sm font-medium text-gray-900 ">${product.price}</p>
             </div>
            </div>
          </div>
        ))}
    </div>
  </div>
</div>
  )
}
