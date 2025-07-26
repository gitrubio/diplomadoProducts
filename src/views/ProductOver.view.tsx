import { useState, useEffect } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'
import { IDiscount } from '@/types/products.type'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProduct } from '@/hooks/useGetProduct'
import { productPrice } from '@/lib/utils'
import { getDiscount } from '@/api/products.api'
import useProductsCart from '@/store/products'
import useAlertStore from '@/store/alerts'
import { FaImage } from 'react-icons/fa'
import { ArrowLeft } from 'lucide-react'
import Loader from '@/components/ui/Loader'

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes : any) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductOverView() {
    
    const { productID } = useParams()
    const {product, loading}  =  useGetProduct(productID)
    const [discount] = useState<IDiscount>(getDiscount())
  
    const [selectedColor, setSelectedColor] = useState<any>(null)
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const {addProduct} = useProductsCart()
    const { addAlert } = useAlertStore();
    const navigate = useNavigate()
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        if (product) {
            setSelectedColor(product.colors[0]);
        }
    }, [product]);

    // Autoplay functionality
    useEffect(() => {
        if (!product?.images || product.images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => 
                prev === product.images.length - 1 ? 0 : prev + 1
            );
        }, 4000); // Change image every 4 seconds

        return () => clearInterval(interval);
    }, [product?.images]);

    const nextImage = () => {
        if (product?.images) {
            setCurrentImageIndex((prev) => 
                prev === product.images.length - 1 ? 0 : prev + 1
            );
        }
    }

    const prevImage = () => {
        if (product?.images) {
            setCurrentImageIndex((prev) => 
                prev === 0 ? product.images.length - 1 : prev - 1
            );
        }
    }

    const handleAddProduct = (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

     if (selectedColor?.class && selectedSize ) {
      addProduct({
        id: product.id,
        title: product.title,
        quantity: 1,
        price: product.price,
        category: product.category,
        image: product?.images[0],
        color: selectedColor.class,
        size: selectedSize
      })
      addAlert("product added to cart", "success")
     }else{
      addAlert("Please select a color and size", "error")
     }
    
    }

    // Custom sizes array
    const customSizes = [
        { name: 'Pequeño', inStock: true },
        { name: 'Mediano', inStock: true },
        { name: 'Grande', inStock: true }
    ];

    if (loading) {
      return <div>
        <div className="h-screen flex items-center justify-center">
          <Loader/>
        </div>
      </div>
    }
  return (
    <div className="pt-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="hover:cursor-pointer bg-transparent border-none p-0"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
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
            <div className="w-[400px] h-[500px] relative overflow-hidden rounded-lg lg:block bg-gray-50">
            {!product?.images[currentImageIndex] && <FaImage className="w-full h-full text-gray-400" />}
            {product?.images[currentImageIndex] && (
                <div className="w-full h-full flex transition-transform duration-500 ease-in-out" 
                     style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                    {product.images.map((image) => (
                        <img
                            key={image}
                            src={image}
                            className="w-full h-full object-contain flex-shrink-0"
                            alt={product?.title || "Product"}
                        />
                    ))}
                </div>
            )}
            {product?.images.length > 1 && (
                <>
                    <div className="absolute w-full inset-0 flex items-center justify-between p-4">
                        <button
                            onClick={prevImage}
                            className="p-3 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg transition-all duration-200 hover:scale-110"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="p-3 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg transition-all duration-200 hover:scale-110"
                        >
                            <ArrowLeft className="w-6 h-6 transform rotate-180" />
                        </button>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                        {product?.images.map((_, index) => (
                            <button
                                key={index + 'indicator'}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                    index === currentImageIndex 
                                        ? 'bg-white shadow-lg scale-125' 
                                        : 'bg-white/50 hover:bg-white/75'
                                }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mt-4">{product?.title}</h1>
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
                <a href={reviews.href} className="ml-3 text-sm font-medium text-gray-600 hover:text-gray-500">
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
                          'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1 ring-gray-400',
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
                  <h3 className="text-sm font-medium text-gray-900">Talla</h3>
                  <a href="/" className="text-sm font-medium text-gray-600 hover:text-gray-500">
                    Guía de tallas
                  </a>
                </div>

                <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4 grid grid-cols-3 gap-4"
                  >
                    {customSizes.map((size) => (
                      <Radio
                        key={size.name}
                        value={size.name}
                        disabled={!size.inStock}
                        className={({ checked }) =>
                          classNames(
                            'group relative flex items-center justify-center rounded-md border p-4 text-sm font-medium uppercase',
                            'cursor-pointer transition-all duration-300 ease-in-out focus:outline-none',
                            checked
                              ? 'scale-105 bg-gray-800 text-white shadow-lg border-transparent ring-2 ring-offset-2 ring-gray-800'
                              : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50',
                            !size.inStock
                              ? 'bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed'
                              : ''
                          )
                        }
                      >
                        {size.name}
                      </Radio>
                    ))}
                  </RadioGroup>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-8 py-3 text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
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

