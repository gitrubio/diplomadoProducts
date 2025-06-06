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
    { name: 'White', class: 'bg-white', selected: false },
    { name: 'Black', class: 'bg-gray-900', selected: false },
    { name: 'Gray', class: 'bg-gray-200', selected: false },
    { name: 'Red', class: 'bg-red-500', selected: false },
    { name: 'Blue', class: 'bg-blue-500', selected: false },
    { name: 'Green', class: 'bg-green-500', selected: false },
    { name: 'Yellow', class: 'bg-yellow-400', selected: false },
    { name: 'Purple', class: 'bg-purple-500', selected: false },
    { name: 'Pink', class: 'bg-pink-400', selected: false },
    { name: 'Brown', class: 'bg-amber-700', selected: false },
    { name: 'Navy', class: 'bg-blue-900', selected: false },
    { name: 'Beige', class: 'bg-amber-100', selected: false }
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
export default function ModalProduct({ visible, setVisible, product, onFinish }: ModalProductProps) {
    const { addAlert } = useAlertStore()
    const [images, setImages] = useState<string[]>(product?.images ?? [])
    const [selectedColors, setSelectedColors] = useState(
        colors.map(color => ({
            ...color,
            selected: product?.colors.some(c => c.name === color.name) ?? false
        }))
    )

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const url = await uploadImage(file);
            if (url) {
                setImages(prev => [...prev, url]);
            }
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleColorSelect = (colorName: string) => {
        const selectedCount = selectedColors.filter(c => c.selected).length;
        setSelectedColors(prevColors => 
            prevColors.map(color => {
                if (color.name === colorName) {
                    if (!color.selected && selectedCount >= 3) {
                        addAlert('Máximo 3 colores permitidos', 'info')
                        return color;
                    }
                    return { ...color, selected: !color.selected };
                }
                return color;
            })
        );
    };

    const validateInfo = (data: any) => {
        if (data.name === '' || data.description === '' || data.quantity === '' || data.price === '' || data.category === '' || data.image === null) {
            addAlert('Todos los campos son requeridos', 'error')
            return false
        }
        const selectedColorCount = selectedColors.filter(c => c.selected).length;
        if (selectedColorCount === 0) {
            addAlert('Selecciona al menos un color', 'error')
            return false
        }
        return true
    }

    const handleSubmmit = (e: any) => {
        e.preventDefault()
        const data = {
            title: e.target[0].value,
            description: e.target[1].value,
            images: images,
            price: e.target[2].value,
            category: e.target[3].value,
            colors: selectedColors.filter(c => c.selected),
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

    return (
        <div className={`${visible ? "fixed" : "hidden"} transition-all ease-in-out inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]`}>
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
                    <div className="grid grid-cols-4 gap-4 w-full">
                        {images.map((image, index) => (
                            <div key={index} className="relative group">
                                <img src={image} alt={`product-${index}`} className="w-20 h-20 object-cover rounded-xl" />
                                <button
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        <label htmlFor="dropzone-file" className="flex flex-col rounded-xl w-20 h-20 items-center justify-center border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>
                    </div>
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

                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Colores (máximo 3)</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[200px] overflow-y-auto p-2">
                            {selectedColors.map((color) => (
                                <label key={color.name} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                                    <input
                                        type="checkbox"
                                        checked={color.selected}
                                        onChange={() => handleColorSelect(color.name)}
                                        className="hidden"
                                    />
                                    <div className={`w-6 h-6 ${color.class} rounded-full border ${color.selected ? 'ring-2 ring-blue-500' : ''} ${color.name === 'White' ? 'border-gray-300' : ''}`}></div>
                                    <span className="text-sm">{color.name}</span>
                                </label>
                            ))}
                        </div>
                        <div className="flex justify-end gap-4 !mt-8">
                        <button type="button" onClick={setVisible}
                            className="px-6 py-3 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300">Cancel</button>
                        <button type="submit"
                            className="px-6 py-3 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700">Submit</button>
                    </div>
                    </div>

                </form>
            </div>
        </div>
    )
}
