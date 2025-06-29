import { IDiscount, Product } from '@/types/products.type'
import { StarIcon } from '@heroicons/react/16/solid'
import { Link } from 'react-router-dom'
import { productPrice } from '@/lib/utils'
import { FaImage } from 'react-icons/fa'

export default function CardProduct({product,discount}: {product: Product, discount: IDiscount}) {
    
    const fixTitle = (title: string) => (title.length > 20 ? title.slice(0, 20) + '...' : title)

  return (
    <Link to={`${product.id}`} key={product.id} className="group relative shadow-lg p-4 sm:p-6 bg-white rounded-lg hover:shadow-xl transition-shadow duration-300">
    <div className="w-full h-[200px] sm:h-[250px] lg:h-[300px] transition-all ease-in-out flex items-center justify-center overflow-hidden rounded-md lg:aspect-none">
    { product?.images[0] && <img src={product?.images[0]} alt='imagen de producto' className="w-full h-full object-contain"/>}
    { !product?.images[0] && <FaImage className="text-4xl text-gray-400" /> }
    </div>
    <div className="mt-4 flex justify-between items-start">
      <div className="flex-1 min-w-0">
        <h3 className="text-sm sm:text-base text-gray-700 font-medium mb-2">
          <a href="#">
            <span aria-hidden="true" className="absolute inset-0"></span>
            {fixTitle(product.title)}
          </a>
        </h3>
        <div className='flex justify-start items-center flex-wrap gap-1'>
        <StarIcon className='size-4 transition-all duration-300 text-yellow-300' />
        <p className="text-xs sm:text-sm text-gray-950">{product.rating.rate}</p>
       
        <p className="text-xs sm:text-sm text-gray-500">({product.rating.count}</p>
        <p className='text-xs sm:text-sm text-gray-500'>reviews)</p>
        </div>
          
      </div>
     <div className="text-right ml-2">

     {discount.discount !== 0 && <p className="text-xs sm:text-sm text-gray-500 line-through">${product.price}</p>}
     <p className="text-sm sm:text-base font-medium text-gray-900">${productPrice(product.price,discount)}</p>
     </div>
    </div>
  </Link>
  )
}
