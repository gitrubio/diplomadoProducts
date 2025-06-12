import Loader from "@/components/ui/Loader"
import useOrder from "@/hooks/useOrder"
import { Order } from "@/types/order.types"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function Invoice() {
    const { id: InvoiceId } = useParams()
    const [order, setOrder] = useState<Order|undefined>()
    const {getOrderId} = useOrder()
    const navigate = useNavigate()

    useEffect(() => {
        getOrderId(InvoiceId ?? '').then((order) => {
            console.log(order)
            setOrder(order)
        })
    }, [])

    return (
        <div className="font-sans  bg-white p-4 lg:max-w-7xl max-w-xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 max-lg:order-1">

                    <div className="flex items-start">
                        <div className="w-full">
                            <div className="flex items-center w-full">
                                <div className="w-8 h-8 shrink-0 mx-[-1px] bg-blue-600 p-1.5 flex items-center justify-center rounded-full">
                                    <span className="text-sm text-white font-bold">1</span>
                                </div>
                                <div className="w-full h-[3px] mx-4 rounded-lg bg-blue-600"></div>
                            </div>
                            <div className="mt-2 mr-4">
                                <h6 className="text-sm font-bold text-blue-600">Shipping</h6>
                            </div>
                        </div>
                       
                        <div className="w-full">
                            <div className="flex items-center w-full">
                                <div className="w-8 h-8 shrink-0 mx-[-1px] bg-blue-600 p-1.5 flex items-center justify-center rounded-full">
                                    <span className="text-sm text-white font-bold">2</span>
                                </div>
                                <div className="w-full h-[3px] mx-4 rounded-lg bg-blue-600"></div>
                            </div>
                            <div className="mt-2 mr-4">
                                <h6 className="text-sm font-bold text-blue-600">Billing</h6>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center">
                                <div className="w-8 h-8 shrink-0 mx-[-1px] bg-blue-600 p-1.5 flex items-center justify-center rounded-full">
                                    <span className="text-sm text-white font-bold">3</span>
                                </div>
                            </div>
                            <div className="mt-2">
                                <h6 className="text-sm font-bold text-blue-600">Confirm</h6>
                            </div>
                        </div>
                    </div>
                    {!order && (<div className="pt-10">
                        <Loader />
                    </div>)}
                    {order && (
                        <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-20">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="font-bold text-2xl text-blue-600">Clean Print</h1>
                                    <p className="text-gray-600 text-sm">Sistema de Impresión</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-600">Nº: {InvoiceId}</div>
                                    <div className="text-sm text-gray-600">Fecha: {new Date(order.createdAt.toDate()).toLocaleString()}</div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h2 className="text-lg font-bold mb-4 text-gray-800">Facturar a:</h2>
                                    <div className="text-gray-700">
                                        <p className="font-semibold">{order.shipping.name}</p>
                                        <p className="text-sm">{order.shipping.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold mb-4 text-gray-800">Detalles de envío:</h2>
                                    <div className="text-gray-700">
                                        <p className="text-sm">Dirección: {order.shipping.address}</p>
                                        <p className="text-sm">Teléfono: {order.shipping.phone}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-b border-gray-200 py-4 mb-6">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left">
                                            <th className="pb-4 text-gray-600 font-semibold">Descripción</th>
                                            <th className="pb-4 text-gray-600 font-semibold text-right">Cantidad</th>
                                            <th className="pb-4 text-gray-600 font-semibold text-right">Precio</th>
                                            <th className="pb-4 text-gray-600 font-semibold text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.products.map((product) => (
                                            <tr key={product.id} className="border-b border-gray-100">
                                                <td className="py-3 text-gray-700">{product.title}</td>
                                                <td className="py-3 text-gray-700 text-right">{product.quantity}</td>
                                                <td className="py-3 text-gray-700 text-right">${product.price.toFixed(2)}</td>
                                                <td className="py-3 text-gray-700 text-right">${(product.quantity * product.price).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-end mb-6">
                                <div className="w-1/3">
                                    <div className="flex justify-between py-2 border-b border-gray-200">
                                        <span className="text-gray-600">Subtotal:</span>
                                        <span className="text-gray-800">${order.total}</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="font-bold text-gray-800">Total:</span>
                                        <span className="font-bold text-blue-600">${order.total}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center text-gray-600 text-sm">
                                <p className="mb-2">¡Gracias por su compra!</p>
                                <p>Por favor, realice el pago dentro de los 30 días.</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="bg-gray-100 p-6 rounded-md h-[300px] flex flex-col">
                    <h2 className="text-4xl font-extrabold text-blue-600">${order?.total}</h2>
                  
                    <ul className="text-blue-600 mt-8 space-y-4">
                      
                        <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">Total <span className="ml-auto">${(order?.total)}</span></li>
                    </ul>
                    <button onClick={()=>navigate("/store")} type="submit" className="min-w-[150px] px-6 py-3.5 text-sm bg-blue-600 text-white rounded-md hover:bg-[#111]">Ir a la tienda</button>
                </div>
               
            </div>
        </div>
    )
}
