import Loader from "@/components/ui/Loader"
import useOrder from "@/hooks/useOrder"
import { updateOrder } from "@/api/orders.api"
import { Order } from "@/types/order.types"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useAlertStore from "@/store/alerts"
import { ProductCartInfo } from "@/store/products"
import useUserSession from "@/store/store"

export default function Invoice() {
    const { id } = useParams<{ id: string }>()
    const { getOrderId } = useOrder()
    const [order, setOrder] = useState<Order | null>(null)
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
    const navigate = useNavigate()
    const { addAlert } = useAlertStore()
    const { admin: currentUserIsAdmin } = useUserSession()
    const InvoiceId = id?.slice(0, 8)

    useEffect(() => {
        if (id) {
            getOrderId(id).then((data: Order | undefined) => {
                if (data) setOrder(data)
            })
        }
    }, [id, getOrderId])

    const handleCheckboxChange = (productId: string) => {
        setCheckedItems(prev => {
            const newCheckedItems = new Set(prev)
            if (newCheckedItems.has(productId)) {
                newCheckedItems.delete(productId)
            } else {
                newCheckedItems.add(productId)
            }
            return newCheckedItems
        })
    }

    const handleFinalizeOrder = async () => {
        if (!order) return
        
        const newStatusHistory = [
            ...order.status_history,
            { status: 'completed' as const, date: new Date().toISOString() }
        ]

        try {
            await updateOrder(order.id, {
                status: 'completed',
                status_history: newStatusHistory
            })
            addAlert('Pedido finalizado con éxito', 'success')
            navigate('/dashboard/orders')
        } catch (error) {
            console.error('Error finalizing order:', error)
            addAlert('Error al finalizar el pedido', 'error')
        }
    }

    const allItemsChecked = order ? checkedItems.size === order.products.length : false

    if (!order) {
        return <div className="min-h-screen flex items-center justify-center"><Loader /></div>
    }

    // Determinar si mostrar vista de admin basado en:
    // 1. Si el usuario actual es admin Y
    // 2. Si el usuario que creó la orden es admin
    const shouldShowAdminView = currentUserIsAdmin && order.user.isAdmin

    // Vista para clientes (no admin)
    if (!shouldShowAdminView) {
        return (
            <div className="bg-gray-50 dark:bg-gray-900 font-sans p-4 sm:p-8 min-h-screen">
                <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg px-6 py-8 max-w-2xl mx-auto">
                    <div className="flex justify-between items-center mb-8 border-b pb-4 dark:border-gray-600">
                        <div>
                            <h1 className="font-bold text-2xl text-gray-800 dark:text-white">Factura #{InvoiceId}</h1>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Fecha: {new Date(order.createdAt.toDate()).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Cliente</div>
                            <div className="text-lg font-semibold text-gray-800 dark:text-white">{order.shipping.name}</div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Artículos del Pedido</h2>
                        <div className="space-y-4">
                            {order.products.map((product: ProductCartInfo) => (
                                <div
                                    key={product.id}
                                    className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 flex items-center"
                                >
                                    <img src={product.image} alt={product.title} className="w-12 h-12 rounded-md object-cover mr-4" />
                                    <div className="flex-1">
                                        <div className="font-semibold text-gray-800 dark:text-gray-200">{product.title}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Cantidad: {product.quantity}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold text-gray-800 dark:text-gray-200">${(product.quantity * product.price).toFixed(2)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t pt-6 dark:border-gray-600">
                        <div className="flex justify-between items-center text-lg font-semibold text-gray-800 dark:text-white mb-6">
                            <span>Total del Pedido:</span>
                            <span>${order.total.toFixed(2)}</span>
                        </div>

                        <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
                            <p className="mb-2">¡Gracias por su compra!</p>
                            <p>Su pedido ha sido procesado correctamente.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Vista para administradores
    return (
        <div className="bg-gray-50 dark:bg-gray-900 font-sans p-4 sm:p-8 min-h-screen">
            <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg px-6 py-8 max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8 border-b pb-4 dark:border-gray-600">
                    <div>
                        <h1 className="font-bold text-2xl text-gray-800 dark:text-white">Gestión de Pedido #{InvoiceId}</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Fecha: {new Date(order.createdAt.toDate()).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Cliente</div>
                        <div className="text-lg font-semibold text-gray-800 dark:text-white">{order.shipping.name}</div>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Artículos del Pedido</h2>
                    <div className="space-y-4">
                        {order.products.map((product: ProductCartInfo) => (
                            <div
                                key={product.id}
                                className={`p-4 rounded-lg flex items-center transition-all duration-300 ${checkedItems.has(product.id) ? 'bg-teal-50 dark:bg-teal-900/50' : 'bg-gray-50 dark:bg-gray-700/50'}`}
                            >
                                <input
                                    type="checkbox"
                                    id={`product-${product.id}`}
                                    checked={checkedItems.has(product.id)}
                                    onChange={() => handleCheckboxChange(product.id)}
                                    className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                                />
                                <label htmlFor={`product-${product.id}`} className="flex-1 ml-4 flex justify-between items-center cursor-pointer">
                                    <div className="flex items-center">
                                        <img src={product.image} alt={product.title} className="w-12 h-12 rounded-md object-cover mr-4" />
                                        <div>
                                            <div className="font-semibold text-gray-800 dark:text-gray-200">{product.title}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">Cantidad: {product.quantity}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold text-gray-800 dark:text-gray-200">${(product.quantity * product.price).toFixed(2)}</div>
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t pt-6 dark:border-gray-600">
                    <div className="flex justify-between items-center text-lg font-semibold text-gray-800 dark:text-white mb-6">
                        <span>Total del Pedido:</span>
                        <span>${order.total.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={handleFinalizeOrder}
                        disabled={!allItemsChecked}
                        className="w-full py-3 px-4 rounded-lg text-white font-semibold transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 dark:disabled:bg-gray-600 bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500/50"
                    >
                        {allItemsChecked ? 'Marcar como Finalizado y Volver' : 'Marque todos los artículos para finalizar'}
                    </button>
                </div>
            </div>
        </div>
    )
}
