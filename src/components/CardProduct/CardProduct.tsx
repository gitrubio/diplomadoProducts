import { getDiscount } from '@/api/products.api'
import { IDiscount, Product } from '@/types/products.type'
import { StarIcon } from '@heroicons/react/16/solid'
import React from 'react'
import { Link } from 'react-router-dom'

export default function CardProduct({product,discount}: {product: Product, discount: IDiscount}) {
    
    const fixTitle = (title: string) => (title.length > 20 ? title.slice(0, 20) + '...' : title)

    const productPrice = (price : number) => {
      if(discount.discount === 0) {
        return price
      }
      return (price - (price * discount.discount / 100)).toFixed(2)
    }
  return (
    <Link to={`${product.id}`} className="group relative shadow-lg p-6 bg-white rounded-lg  ">
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

     {discount.discount !== 0 && <p className="text-sm text-gray-500 line-through">${product.price}</p>}
     <p className="text-sm font-medium text-gray-900 ">${productPrice(product.price)}</p>
     </div>
    </div>
  </Link>
  )
}
