import useOrder from "@/hooks/useOrder"
import { productPrice } from "@/lib/utils"
import useAlertStore from "@/store/alerts"
import useProductsCart from "@/store/products"
import useUserSession from "@/store/store"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Checkout() {
    const {products, clearCart} = useProductsCart()
    const {addAlert} = useAlertStore()
    const {username,userEmail} = useUserSession()
    const { newOrder } = useOrder()
    const [disabled, setDisabled] = useState<boolean>(false)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: username || "",
        email: userEmail || "",
        phone: "",
        address: "",
        city: "",
        postalCode: ""
    })

    const total = products.reduce((acc, product) => acc + (+productPrice(product.price,{discount:0,id:0}))*product.quantity, 0)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setDisabled(true)
        if (formData.name && formData.email && formData.phone && formData.address && !disabled) {
            newOrder({
                products: products.map((product) => ({...product, price: +productPrice(product.price,{discount:0,id:0}), created: false})),
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
                        date: new Date().toISOString()
                    }
                ],
            }).then((id) => {
                navigate('/invoice/' + id)
                clearCart()
            })
        } else {
            setDisabled(false)
            addAlert("Por favor complete todos los campos requeridos", "error")
        }
    }

    return (
        <div className="w-[100%] h-[100dvh]  font-sans pt-20 px-4 ">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
                {/* Steps - First on mobile, second on desktop */}
                <div className="order-1 lg:order-1 lg:col-span-2">
                <div className='flex items-start '>
							<div className='w-full pb-5 min-w-0'>
								<div className='flex items-center w-full px-2'>
									<div className='w-6 h-6 sm:w-8 sm:h-8 shrink-0 mx-[-1px] bg-[#3B6F00] p-1 sm:p-1.5 flex items-center justify-center rounded-full'>
										<span className='text-xs sm:text-sm text-white font-bold'>1</span>
									</div>
									<div className='w-full h-[3px] mx-2 sm:mx-4 rounded-lg bg-[#3B6F00]'></div>
								</div>
								<div className='mt-2 mr-2 sm:mr-4'>
									<h6 className='text-xs sm:text-sm font-bold text-[#3B6F00]'>Envío</h6>
								</div>
							</div>

							<div className='w-full min-w-0'>
								<div className='flex items-center w-full'>
									<div className='w-6 h-6 sm:w-8 sm:h-8 shrink-0 mx-[-1px] bg-[#3B6F00] p-1 sm:p-1.5 flex items-center justify-center rounded-full'>
										<span className='text-xs sm:text-sm text-white font-bold'>2</span>
									</div>
									<div className='w-full h-[3px] mx-2 sm:mx-4 rounded-lg bg-white'></div>
								</div>
								<div className='mt-2 mr-2 sm:mr-4'>
									<h6 className='text-xs sm:text-sm font-bold text-[#3B6F00]'>Datos</h6>
								</div>
							</div>

							<div className='w-[30%] min-w-0'>
								<div className='flex items-center'>
									<div className='w-6 h-6 sm:w-8 sm:h-8 shrink-0 mx-[-1px] bg-white p-1 sm:p-1.5 flex items-center justify-center rounded-full'>
										<span className='text-xs sm:text-sm text-black font-bold'>3</span>
									</div>
								</div>
								<div className='mt-2'>
									<h6 className='text-xs sm:text-sm font-bold text-black'>Confirmar</h6>
								</div>
							</div>
						</div>
                </div>

                {/* Form - Second on mobile, first on desktop */}
                <div className="order-2 lg:order-2 lg:col-span-2 ">
                    <form className="m-auto  max-w-lg bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 mb-6 sm:mb-8">Información de Envío</h2>

                        <div className="grid gap-4 sm:gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre Completo</label>
                                <input 
                                    id="name"
                                    type="text" 
                                    name="name"
                                    placeholder="Ingrese su nombre completo"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 text-gray-800 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#3B6F00] focus:ring-1 focus:ring-[#3B6F00] transition-colors" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">Correo Electrónico</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="ejemplo@correo.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 text-gray-800 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#3B6F00] focus:ring-1 focus:ring-[#3B6F00] transition-colors" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="tel" className="text-sm font-medium text-gray-700">Teléfono</label>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    placeholder="+52 (123) 456-7890"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 text-gray-800 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#3B6F00] focus:ring-1 focus:ring-[#3B6F00] transition-colors" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="text" className="text-sm font-medium text-gray-700">Dirección</label>
                                <input 
                                    type="text" 
                                    name="address"
                                    placeholder="Calle y número"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 text-gray-800 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#3B6F00] focus:ring-1 focus:ring-[#3B6F00] transition-colors" 
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
                                        className="w-full px-4 py-3 bg-gray-50 text-gray-800 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#3B6F00] focus:ring-1 focus:ring-[#3B6F00] transition-colors" 
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
                                        className="w-full px-4 py-3 bg-gray-50 text-gray-800 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#3B6F00] focus:ring-1 focus:ring-[#3B6F00] transition-colors" 
                                    />
                                </div>
                            </div> */}
                        </div>
                    </form>
                </div>

                {/* Payment Summary - Third on mobile, third on desktop */}
                <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg h-fit order-3 lg:order-3">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-6 sm:mb-8">${total.toFixed(2)}</h2>

                    <ul className="text-gray-800 space-y-3 sm:space-y-4">
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
                            <span className="ml-auto text-[#3B6F00]">${(total + 5.00 + 4.00).toFixed(2)}</span>
                        </li>
                        <li className="mt-6 sm:mt-8">
                        <div className="flex flex-col h-14 sm:flex-row gap-3 sm:gap-2 mt-6 sm:mt-8">
                            <button 
                                type="button" 
                                onClick={()=>navigate("/cart")} 
                                className="w-full sm:min-w-[150px] px-4 sm:px-6 py-3 sm:py-3.5 text-sm bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors shadow-sm"
                            >
                                Regresar
                            </button>
                            <button
                                disabled={disabled}
                                onClick={(e)=>handleSubmit(e)}
                                type="submit" 
                                className="w-full sm:min-w-[150px] px-4 sm:px-6 py-3 sm:py-3.5 text-sm bg-[#3B6F00] text-white rounded-lg hover:bg-[#2d5a00] transition-colors shadow-lg"
                            >
                                Continuar
                            </button>
                        </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
