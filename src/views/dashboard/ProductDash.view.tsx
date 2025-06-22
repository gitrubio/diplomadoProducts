import { deleteProduct, getProducts } from "@/api/products.api"
import { Product } from "@/types/products.type"
import { useEffect, useState } from "react"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { FaEdit, FaTrash } from "react-icons/fa"
import Loader from "@/components/ui/Loader"
import ModalProduct from "@/components/modalProduct/ModalProduct"

export default function ProductDash() {
    const [loading, setLoading] = useState<boolean>(true)
    const [products, setProducts] = useState<Product[]>([])
    const [visible, setVisible] = useState<boolean>(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>()
    
    useEffect(() => {
      fetchProducts()
    }, [])
    
    const fetchProducts = async () => {
        setLoading(true)
        const data = await getProducts()
        setProducts(data)
        setLoading(false)
    }

    const handleClikc = async () => {
        setSelectedProduct(undefined)
        setVisible(true)
    }

    const close = async () => {
        setVisible(false)
        setSelectedProduct(undefined)
    }
    
    function shortenProductName(title: string, maxLength: number): string {
        if (title.length <= maxLength) {
          return title;
        }
        return title.slice(0, maxLength) + '...';
      }

      const handleDelete = async (id: string) => {
        const row = document.querySelector(`tr[data-id="${id}"]`);
        if (row) {
          row.classList.add('animate__fadeOutLeft');
          await new Promise(resolve => setTimeout(resolve, 500)); // Esperar a que termine la animación
        }
        await deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
      }
  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 mt-20">
       <ModalProduct key={selectedProduct?.id+''+Date.now()} visible={visible} setVisible={close} onFinish={fetchProducts} product={selectedProduct}/>
    <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                    <form className="flex items-center">
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"  xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search"/>
                        </div>
                    </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <button onClick={handleClikc} type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        <svg className="h-3.5 w-3.5 mr-2" fill="currentColor"  xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Add product
                    </button>
                    <div className="flex items-center space-x-3 w-full md:w-auto">
                        <Menu  as="div" className="relative inline-block text-left">
                            <MenuButton>
                            <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                            <svg className="-ml-1 mr-1.5 w-5 h-5" fill="currentColor"  xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                            Actions
                        </button>
                            </MenuButton>
                            <MenuItems 
                            transition
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                            
                            <MenuItem >
                            <button   className="flex gap-2 text-sm text-red-500 items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                     <FaTrash/>
                                        Delete All
                                        </button>
                            </MenuItem>
                            </MenuItems>
                        </Menu>
                        
                       
                        <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400"  fill="currentColor">
                                <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                            </svg>
                            Filter
                            <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor"  xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </button>
                        
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">Product name</th>
                            <th scope="col" className="px-4 py-3">Category</th>
                            <th scope="col" className="px-4 py-3">Colors</th>
                            <th scope="col" className="px-4 py-3">Price</th>
                            <th scope="col" className="px-4 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {loading && (
                    <tr>
                        <td colSpan={4}>
                            <Loader />
                        </td>
                    </tr>
                    )}
                   {products.map((product) => (
                     <tr 
                        key={product.id}
                       data-id={product.id}
                       className={`border-b dark:border-gray-700 animate__animated animate__fadeInRight `}
                     >
                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{shortenProductName(product.title,16)}</th>
                        <td className="px-4 py-3">{product.category}</td>
                        <td className="px-4 py-3"><div className="flex">
                        {product.colors.map((color) => (
                            <div className={`${color.class}  border-2 rounded-xl w-5 h-5`}></div>
                        ))}
                        </div></td>
                        <td className="px-4 py-3">${product.price}</td>
                        <td className="px-4 py-3 flex items-center justify-end gap-2">
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    setSelectedProduct(product)
                                    setVisible(true)
                                }}
                                className="p-1.5 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                                <FaEdit className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDelete(product.id + '')}
                                className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                            >
                                <FaTrash className="w-4 h-4" />
                            </button>
                        </td>
                 </tr>
                   ))}
                    </tbody>
                </table>
            </div>
          
        </div>
    </div>
    </section>
  )
}
