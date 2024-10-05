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
                                <div className="w-8 h-8 shrink-0 mx-[-1px] bg-gray-800 p-1.5 flex items-center justify-center rounded-full">
                                    <span className="text-sm text-white font-bold">1</span>
                                </div>
                                <div className="w-full h-[3px] mx-4 rounded-lg bg-gray-800"></div>
                            </div>
                            <div className="mt-2 mr-4">
                                <h6 className="text-sm font-bold text-gray-800">Shipping</h6>
                            </div>
                        </div>
                       
                        <div className="w-full">
                            <div className="flex items-center w-full">
                                <div className="w-8 h-8 shrink-0 mx-[-1px] bg-gray-800 p-1.5 flex items-center justify-center rounded-full">
                                    <span className="text-sm text-white font-bold">2</span>
                                </div>
                                <div className="w-full h-[3px] mx-4 rounded-lg bg-gray-800"></div>
                            </div>
                            <div className="mt-2 mr-4">
                                <h6 className="text-sm font-bold text-gray-800">Billing</h6>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center">
                                <div className="w-8 h-8 shrink-0 mx-[-1px] bg-gray-800 p-1.5 flex items-center justify-center rounded-full">
                                    <span className="text-sm text-white font-bold">3</span>
                                </div>
                            </div>
                            <div className="mt-2">
                                <h6 className="text-sm font-bold text-gray-800">Confirm</h6>
                            </div>
                        </div>
                    </div>
                    {!order && (<div className="pt-10">
                        <Loader />
                    </div>)}
                    {order && (
                        <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-20">
                        <h1 className="font-bold text-2xl my-4 text-center text-blue-600">MVP ecomerce</h1>
                        <hr className="mb-2" />
                        <div className="flex justify-between mb-6">
                            <h1 className="text-lg font-bold">Invoice</h1>
                            <div className="text-gray-700">
                                <div>id#: {InvoiceId}</div>
                                <div>Date: {new Date().toLocaleString()}</div>
                            </div>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-lg font-bold mb-4">Bill To:</h2>
                            <div className="text-gray-700 mb-2">{order.user.name}</div>
                            <div className="text-gray-700 mb-2">Anytown, USA 12345</div>
                            <div className="text-gray-700">{order.user.email}</div>
                        </div>
                        <table className="w-full mb-8">
                            <thead>
                                <tr>
                                    <th className="text-left font-bold text-gray-700">Description</th>
                                    <th className="text-right font-bold text-gray-700">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    order.products.map((product) => (
                                        <tr>
                                    <td className="text-left text-gray-700">{product.title} x {product.quantity}</td>
                                    <td className="text-right text-gray-700">${(product.quantity * product.price).toFixed(2)}</td>
                                </tr>
                                    ))}
                                
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td className="text-left font-bold text-gray-700">Total</td>
                                    <td className="text-right font-bold text-gray-700">${order.total}</td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className="text-gray-700 mb-2">Thank you for your business!</div>
                        <div className="text-gray-700 text-sm">Please remit payment within 30 days.</div>
                    </div>
                    )}
                </div>
                <div className="bg-gray-100 p-6 rounded-md h-[300px] flex flex-col">
                    <h2 className="text-4xl font-extrabold text-gray-800">${order?.total}</h2>
                  
                    <ul className="text-gray-800 mt-8 space-y-4">
                      
                        <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">Total <span className="ml-auto">${(order?.total)}</span></li>
                    </ul>
                    <button onClick={()=>navigate("/store")} type="submit" className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-800 text-white rounded-md hover:bg-[#111]">Go to shop</button>
                </div>
               
            </div>
        </div>
    )
}
