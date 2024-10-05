import useAlertStore from '@/store/alerts';
import { createProduct, updateProduct } from '@/api/products.api';
import { uploadImage } from '@/api/storage.api';
import { useState } from 'react';
import { Product } from '@/types/products.type';

interface ModalProductProps {
    visible: boolean;
    setVisible: () => void;
    onFinish: () => void;
    product?: Product
}
const colors = [
    { name: 'White', class: 'bg-white', },
    { name: 'Gray', class: 'bg-gray-200' },
    { name: 'Black', class: 'bg-gray-900' },
]
const sizes = [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
]
export default function ModalProduct({ visible, setVisible,product,onFinish }: ModalProductProps) {
    const { addAlert } = useAlertStore()
    const [img, setImg] = useState<string | undefined>()
    const validateInfo = (data: any) => {
        if (data.name === '' || data.description === '' || data.quantity === '' || data.price === '' || data.category === '' || data.image === null) {
            addAlert('All fields are required', 'error')
            return false

        }
        return true
    }
    const handleSubmmit = (e: any) => {
        e.preventDefault()
        const data = {
            title: e.target[0].value,
            description: e.target[1].value,
            image: img ?? product?.image,
            price: e.target[2].value,
            category: e.target[3].value,
            colors,
            rating: { rate: Math.floor(Math.random() * 5), count: Math.floor(Math.random() * 100) },
            sizes,
        }
        if (validateInfo(data)) {
           if (product?.id) {
            updateProduct(product?.id, data as any).then(() => {
                addAlert('Product updated successfully', 'success')
                setVisible()
                onFinish()
            })
           }else{
            createProduct(data as any).then(() => {
                addAlert('Product created successfully', 'success')
                setVisible()
                onFinish()
            }).catch(() => {
                addAlert('Error creating product', 'error')
            })
           }
        }
    }
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files.length > 0) {
          const file = fileInput.files[0];
          uploadImage(file).then((url) => {
            setImg(url ?? '');
          });
        }
      };

    return (
        <div
            className={`${visible ? "fixed" : "hidden"} transition-all ease-in-out inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]`}>
            <div className={"w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative "}>
                <div className="flex items-center">
                    <h3 className="text-blue-600 text-xl font-bold flex-1">Add New Product</h3>
                    <svg onClick={setVisible} xmlns="http://www.w3.org/2000/svg" className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
                        viewBox="0 0 320.591 320.591">
                        <path
                            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                            data-original="#000000"></path>
                        <path
                            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                            data-original="#000000"></path>
                    </svg>
                </div>
                <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col rounded-xl w-20 h-20 items-center justify-center border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                   {
                                        (img || product?.image ) ? <img src={img ?? product?.image} alt="product" className="w-full h-full object-cover rounded-xl" /> :  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                   }
                                  
                                </div>
                                <input id="dropzone-file"  type="file" className="hidden" accept="image/*"  onChange={handleFileChange} />
                            </label>
                        </div>
                <form className="space-y-4 mt-8" onSubmit={handleSubmmit}>

                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Name of the product</label>
                        <input type="text" placeholder="Enter product name" defaultValue={product?.title ?? ''}
                            className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg" />
                    </div>

                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Descriptions</label>
                        <textarea placeholder='Write about the product' defaultValue={product?.description?? ''}
                            className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg" ></textarea>
                    </div>

                    

                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Selling price</label>
                        <input type="number" placeholder="Enter price" defaultValue={product?.price?? ''}
                            className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg" />
                    </div>

                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Category</label>
                        <input type="text" placeholder="Enter product category" defaultValue={product?.category?? ''}
                            className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg" />
                    </div>


                    <div className="flex justify-end gap-4 !mt-8">
                        <button type="button" onClick={setVisible}
                            className="px-6 py-3 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300">Cancel</button>
                        <button type="submit"
                            className="px-6 py-3 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
