import { getProducts } from '@/api/products.api'
import { Product } from '@/types/products.type'
import { StarIcon } from '@heroicons/react/16/solid'
import React, { useEffect, useState } from 'react'

export default function Productsview() {
    const [laoding,setLoading] = useState<boolean>(false)
    const [products,setProducts] = useState<Product[]>([])

    const fetchProducts = async () => {
        setLoading(true)
        const data = await getProducts()
        setProducts(data)
        setLoading(false)
        console.log('Products.view')
    }
    
    useEffect(() => {
        fetchProducts()
    }, [])

    if(laoding) return 

  return (
    <div className="bg-white">
  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
            <div className="group relative border-solid border-2 rounded-lg  border-indigo-400">
            <div className="w-full h-[200px] flex items-center justify-center  overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img src={product.image}/>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href="#">
                    <span aria-hidden="true" className="absolute inset-0"></span>
                    {product.title}
                  </a>
                </h3>
                <div className='flex justify-start items-center'>
                <StarIcon className='size-4  transition-all duration-300 text-yellow-300  group-hover:rotate-180' />
                <p className="text-sm text-gray-500">{product.rating.rate}</p>
               
                <p className="text-sm text-gray-500  ml-1">({product.rating.count}</p>
                <p className='text-sm text-gray-500 ml-2'>reviews)</p>
                </div>
              
              </div>
              <p className="text-sm font-medium text-gray-900 ">$35</p>
            </div>
          </div>
        ))}
    </div>
  </div>
</div>
  )
}
