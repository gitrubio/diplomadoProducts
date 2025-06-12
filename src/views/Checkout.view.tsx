import { getDiscount } from "@/api/products.api"
import useOrder from "@/hooks/useOrder"
import { productPrice } from "@/lib/utils"
import useAlertStore from "@/store/alerts"
import useProductsCart from "@/store/products"
import useUserSession from "@/store/store"
import { IDiscount } from "@/types/products.type"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Checkout() {
    const {products, clearCart} = useProductsCart()
    const {addAlert} = useAlertStore()
    const {userId,username,userEmail} = useUserSession()
    const { newOrder } = useOrder()
    const [discount] = useState<IDiscount>(getDiscount())
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: username || "",
        email: userEmail || "",
        phone: "",
        address: "",
        city: "",
        postalCode: ""
    })

    const total = products.reduce((acc, product) => acc + (+productPrice(product.price,discount))*product.quantity, 0)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (formData.name && formData.email && formData.phone && formData.address) {
            newOrder({
                products: products.map((product) => ({...product, price: +productPrice(product.price,discount)})),
                total: total + 5.00 + 4.00,
                shipping: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                },
                status_history: [
                    {
                        status: 'created',
                        date: new Date().toLocaleString()
                    }
                ],
            }).then((id) => {
                navigate('/invoice/' + id)
                clearCart()
            })
        } else {
            addAlert("Por favor complete todos los campos requeridos", "error")
        }
    }

    return (
        <div className="font-sans bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 lg:max-w-7xl max-w-xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-10 ">
                <div className="lg:col-span-2 max-lg:order-1">
                    <div className="flex items-start">
                        <div className="w-full">
                            <div className="flex items-center w-full ">
                                <div className="w-8 h-8 shrink-0 mx-[-1px] bg-blue-600 p-1.5 flex items-center justify-center rounded-full shadow-lg">
                                    <span className="text-sm text-white font-bold">1</span>
                                </div>
                                <div className="w-full h-[3px] mx-4 rounded-lg bg-blue-600"></div>
                            </div>
                            <div className="mt-2 mr-4">
                                <h6 className="text-sm font-bold text-blue-600">Envío</h6>
                            </div>
                        </div>

                        <div className="w-full ">
                            <div className="flex items-center w-full">
                                <div className="w-8 h-8 shrink-0 mx-[-1px] bg-blue-600 p-1.5 flex items-center justify-center rounded-full">
                                    <span className="text-sm text-white font-bold">2</span>
                                </div>
                                <div className="w-full h-[3px] mx-4 rounded-lg bg-gray-300"></div>
                            </div>
                            <div className="mt-2 mr-4">
                                <h6 className="text-sm font-bold text-blue-600">Datos</h6>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center">
                                <div className="w-8 h-8 shrink-0 mx-[-1px] bg-gray-200 p-1.5 flex items-center justify-center rounded-full">
                                    <span className="text-sm text-white font-bold">3</span>
                                </div>
                            </div>
                            <div className="mt-2">
                                <h6 className="text-sm font-bold text-gray-300">Confirmar</h6>
                            </div>
                        </div>
                    </div>

                    <form className="m-auto mt-10 max-w-lg bg-white p-8 rounded-xl shadow-lg ">
                        <h2 className="text-2xl font-extrabold text-gray-800 mb-8">Información de Envío</h2>

                        <div className="grid gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Nombre Completo</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    placeholder="Ingrese su nombre completo"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-50 text-gray-800 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Correo Electrónico</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="ejemplo@correo.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-50 text-gray-800 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Teléfono</label>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    placeholder="+52 (123) 456-7890"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-50 text-gray-800 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Dirección</label>
                                <input 
                                    type="text" 
                                    name="address"
                                    placeholder="Calle y número"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-50 text-gray-800 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                                />
                            </div>

                           {/*  <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Ciudad</label>
                                    <input 
                                        type="text" 
                                        name="city"
                                        placeholder="Ciudad"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-50 text-gray-800 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Código Postal</label>
                                    <input 
                                        type="text" 
                                        name="postalCode"
                                        placeholder="C.P."
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-50 text-gray-800 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                                    />
                                </div>
                            </div> */}
                        </div>

                    
                    </form>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg h-fit">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-8">${total.toFixed(2)}</h2>

                    <ul className="text-gray-800 space-y-4">
                        <li className="flex flex-wrap gap-4 text-sm py-2 border-b border-gray-100">
                            <span>Envío</span>
                            <span className="ml-auto font-bold">$20.00</span>
                        </li>
                        <li className="flex flex-wrap gap-4 text-sm py-2 border-b border-gray-100">
                            <span>Impuestos</span>
                            <span className="ml-auto font-bold">$10.00</span>
                        </li>
                        <li className="flex flex-wrap gap-4 text-sm font-bold pt-4">
                            <span>Total</span>
                            <span className="ml-auto text-blue-600">${(total + 5.00 + 4.00).toFixed(2)}</span>
                        </li>
                        <li className="mt-8 flex-row justify-end w-full ">
                        <div className="flex flex-wrap gap-2 mt-8">
                            <button 
                                type="button" 
                                onClick={()=>navigate("/cart")} 
                                className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors shadow-sm"
                            >
                                Regresar
                            </button>
                            <button 
                                onClick={(e)=>handleSubmit(e)}
                                type="submit" 
                                className="min-w-[150px] px-6 py-3.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                            >
                                Continuar al Pago
                            </button>
                        </div>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </div>
    )
}
