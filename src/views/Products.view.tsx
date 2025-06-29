import { getDiscount, getProducts } from '@/api/products.api'
import CardProduct from '@/components/CardProduct/CardProduct'
import Loader from '@/components/ui/Loader'
import ProductNotFound from '@/components/ui/ProductNotFound'
import { IDiscount, Product } from '@/types/products.type'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Productsview() {
  const [loading, setLoading] = useState<boolean>(false)
  const [discount] = useState<IDiscount>(getDiscount())
  const [products, setProducts] = useState<Product[]>([])
  const [params] = useSearchParams()
  const filter = params.get('search')
  const [priceRange, setPriceRange] = useState<number>(100000)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedColor, setSelectedColor] = useState<string>('All')
  const [showFilters, setShowFilters] = useState<boolean>(false)
  
  const colors = [
    { id: 'All', name: 'Todos los colores', hex: 'transparent' },
    { id: 'Black', name: 'Negro', hex: '#111827' },
    { id: 'White', name: 'Blanco', hex: '#ffffff' },
    { id: 'Gray', name: 'Gris', hex: '#E5E7EB' },
    { id: 'Blue', name: 'Azul', hex: "#1D4ED8" },
    { id: 'Red', name: 'Rojo', hex: '#D43146' }
  ]

  const fetchProducts = async () => {
    setLoading(true)
    const data = await getProducts(filter)
    setProducts(data)
    setLoading(false)
  }

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesPrice = product.price <= priceRange
   // const matchesColor = selectedColor === 'All' || product.colors.some(color => color.name === selectedColor)
    return matchesCategory && matchesPrice
  })

  useEffect(() => {
    fetchProducts()
  }, [filter])

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl h-[100vh] px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <Loader />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-gray-100 p-3 rounded-lg flex items-center justify-between"
          >
            <span className="font-medium">Filtros</span>
            <span>{showFilters ? '−' : '+'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10 py-8">
          {/* Filtros laterales */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden'} lg:block bg-gray-50 p-4 lg:p-6 rounded-lg`}>
            <h3 className="text-lg font-semibold mb-4">Filtros</h3>

            {/* Filtro por categoría */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Categorías</h4>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">Todas las categorías</option>
                <option value="electronics">Electrónicos</option>
                <option value="clothing">Ropa</option>
                <option value="accessories">Accesorios</option>
              </select>
            </div>

            {/* Filtro por precio */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Precio máximo: ${priceRange}</h4>
              <input
                color='#4F46E5'
                type="range"
                min="0"
                max="100000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Filtro por color */}
          {/*   <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Colores</h4>
              <div className="flex">
                {colors.map((color) => (
                  <label
                    key={color.id}
                    className={`flex items-center p-2 rounded cursor-pointer ${selectedColor === color.id ? 'bg-blue-100' : ''
                      }`}
                  >
                    <input
                      type="radio"
                      name="color"
                      value={color.id}
                      checked={selectedColor === color.id}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="hidden"
                    />
                    <div
                      className={`w-4 h-4  ${color.id === 'All' ? '' : ''
                        }`}
                      style={{
                        backgroundColor: color.id === 'All' ? 'unset' : color.hex,
                        borderRadius: "20%",
                        border:  '1px solid black' 
                      }}
                    />
                  </label>
                ))}
              </div>
            </div> */}

          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                Nuestros Productos
              </h2>
              <span className="text-sm sm:text-base text-gray-500 font-bold ">
                {filteredProducts.length} productos encontrados
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-x-8 lg:gap-y-10">
              {filteredProducts.map((product) => (
                <CardProduct key={product.id} product={product} discount={discount} />
              ))}
            </div>

            {filteredProducts.length === 0 && <ProductNotFound />}
          </div>
        </div>
      </div>
    </div>
  )
}
