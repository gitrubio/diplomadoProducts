
import { useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'
import { IDiscount } from '@/types/products.type'
import { useParams } from 'react-router-dom'
import { useGetProduct } from '@/hooks/useGetProduct'
import { productPrice } from '@/lib/utils'
import { getDiscount } from '@/api/products.api'
import useProductsCart from '@/store/products'
import useAlertStore from '@/store/alerts'
import { FaImage } from 'react-icons/fa'


const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes : any) {
  return classes.filter(Boolean).join(' ')
}


export default function ProductOverView() {
    
    const { productID } = useParams()
    const {product}  =  useGetProduct(productID)
    const [discount] = useState<IDiscount>(getDiscount())
  
    const [selectedColor, setSelectedColor] = useState<any>(null)
    const [selectedSize, setSelectedSize] = useState<any>(null)
    const {addProduct} = useProductsCart()
    const { addAlert } = useAlertStore();

    const handleAddProduct = (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

     if (selectedColor?.class && selectedSize?.name ) {
      addProduct({
        id: product.id,
        title: product.title,
        quantity: 1,
        price: product.price,
        category: product.category,
        image: product.image,
        color: selectedColor.class,
        size: selectedSize.name
      })
      addAlert("product added to cart", "success")
     }else{
      addAlert("Please select a color and size", "error")
     }
    
    }
  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="flex items-center">
                  <p className="mr-2 text-sm font-medium text-gray-900">
                    {product?.category}
                  </p>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
            <li className="text-sm">
              <p aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.title}
              </p>
            </li>
          </ol>
        </nav>
        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 flex flex-col items-center">
            <div className="w-[300px] h-[500px]   overflow-hidden rounded-lg lg:block">
            {!product.image && <FaImage /> }
            <img
              src={product.image}
              className="object-cover object-center"
            />
          </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product?.title}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            {discount.discount !== 0 && <p className="text-sm text-gray-500 line-through">${product.price}</p>}
            <p className="text-3xl tracking-tight text-gray-900">${productPrice(product.price,discount)}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0',
                      )}
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {product.rating.count} reviews
                </a>
              </div>
            </div>

            <form className="mt-10" onSubmit={handleAddProduct}>
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <fieldset aria-label="Choose a color" className="mt-4">
                 <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <Radio
                        key={color.name}
                        value={color}
                        aria-label={color.name}
                        className={classNames(
                          'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1',
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            'h-8 w-8 rounded-full border border-black border-opacity-10',
                          )}
                        />
                      </Radio>
                    ))}
                  </RadioGroup> 
                </fieldset>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                  </a>
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                  >   {product.sizes.map((size) => (
                      <Radio
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={classNames(
                          size.inStock
                            ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                            : 'cursor-not-allowed bg-gray-50 text-gray-200',
                          'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6',
                        )}
                      >
                        <span>{size.name}</span>
                        {size.inStock ? (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                          >
                            <svg
                              stroke="currentColor"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                            >
                              <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                            </svg>
                          </span>
                        )}
                      </Radio>
                    ))} 
                  </RadioGroup>
                </fieldset>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}