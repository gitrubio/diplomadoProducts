import { getDiscount, getProducts } from '@/api/products.api'
import CardProduct from '@/components/CardProduct/CardProduct'
import Loader from '@/components/ui/Loader'
import ProductNotFound from '@/components/ui/ProductNotFound'
import SearchInput from '@/components/ui/SearchInput'
import { IDiscount, Product } from '@/types/products.type'
import { useEffect, useState } from 'react'

export default function Productsview() {
    const [laoding,setLoading] = useState<boolean>(false)
    const [discount] = useState<IDiscount>(getDiscount())
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
           <CardProduct key={product.id} product={product} discount={discount}/>
        ))}
    </div>
    {
      productsToView().length === 0 && 
        <ProductNotFound/>
    }
  </div>
</div>
  )
}
