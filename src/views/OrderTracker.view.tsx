import Loader from "@/components/ui/Loader"
import useOrder from "@/hooks/useOrder"
import { Order } from "@/types/order.types"
import { ArrowTurnUpLeftIcon, TruckIcon, UserIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { useEffect, useState } from "react"
import { NavLink, useParams, useSearchParams } from "react-router-dom"
import useAlertStore from "@/store/alerts"
import { updateOrderStatus } from "@/api/orders.api"

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return (
        <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
        </svg>
      );
    case 'incoming':
      return (
        <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
        </svg>
      );
    case 'payment':
      return (
        <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
        </svg>
      );
    case 'created':
      return (
        <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
      );
    case 'cancelled':
      return (
        <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6M6 6l12 12"/>
        </svg>
      );
    default:
      return null;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Entregado';
    case 'incoming':
      return 'En tránsito';
    case 'payment':
      return 'Pago confirmado';
    case 'created':
      return 'Pedido creado';
    case 'cancelled':
      return 'Cancelado';
    default:
      return status;
  }
};

const ORDER_STATUSES = [
  { value: 'created', label: 'Pedido creado' },
  { value: 'payment', label: 'Pago confirmado' },
  { value: 'incoming', label: 'En tránsito' },
  { value: 'completed', label: 'Entregado' },
  { value: 'cancelled', label: 'Cancelado' }
] as const;

export default function OrderTracker() {
    const { id: InvoiceId} = useParams()
    const [order, setOrder] = useState<Order|undefined>()
    const [isShippingOpen, setIsShippingOpen] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<string>('')
    const {getOrderId} = useOrder()
    const { addAlert } = useAlertStore()

    useEffect(() => {
        getOrderId(InvoiceId ?? '').then((order) => {
            setOrder(order)
            if (order) {
                setSelectedStatus(order.status_history[0].status)
            }
        })
    }, [])

    const handleProductCreatedToggle = (productIndex: number) => {
        if (!order) return

        const updatedProducts = [...order.products]
        const product = updatedProducts[productIndex]
        updatedProducts[productIndex] = { ...product, created: !product.created }

        const updatedOrder: Order = {
            ...order,
            products: updatedProducts
        }
        setOrder(updatedOrder)
    }

    const handleStatusChange = async () => {
        if (!order || isUpdating || !selectedStatus || !InvoiceId) return;
        
        setIsUpdating(true);
        try {
            await updateOrderStatus(InvoiceId, selectedStatus as Order['status']);
            
            // Actualizar el estado local
            const updatedOrder: Order = {
                ...order,
                status: selectedStatus as Order['status'],
                status_history: [
                    {
                        status: selectedStatus as Order['status'],
                        date: new Date().toISOString()
                    },
                    ...order.status_history
                ]
            };
            setOrder(updatedOrder);
            addAlert('Estado del pedido actualizado correctamente', 'success');
            setIsModalOpen(false);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Cannot update to the same status") {
                    addAlert('No se puede actualizar al mismo estado', 'error');
                } else {
                    addAlert('Error al actualizar el estado del pedido', 'error');
                }
            }
        } finally {
            setIsUpdating(false);
        }
    };

    const handleCancelOrder = async () => {
        if (!order || isUpdating || !InvoiceId) return;
        
        setIsUpdating(true);
        try {
            await updateOrderStatus(InvoiceId, 'cancelled');
            
            // Actualizar el estado local
            const updatedOrder: Order = {
                ...order,
                status: 'cancelled',
                status_history: [
                    {
                        status: 'cancelled',
                        date: new Date().toISOString()
                    },
                    ...order.status_history
                ]
            };
            setOrder(updatedOrder);
            addAlert('Pedido cancelado correctamente', 'success');
        } catch {
            addAlert('Error al cancelar el pedido', 'error');
        } finally {
            setIsUpdating(false);
        }
    };

  return (
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-16">
        {!order && (<Loader/>)}
        {order && (
              <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              <div className="flex flex-row justify-between items-center mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">Seguimiento del pedido #{InvoiceId}</h2>
                <div className="flex flex-row gap-2 z-10 hover:scale-105 transition-transform">
                  <ArrowTurnUpLeftIcon className="w-5" />
                  <NavLink to={"/dashboard/orders"} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Volver a pedidos</NavLink>
                </div>
              </div>
          
              <div className="mt-14 sm:mt-14 lg:flex lg:gap-8">
                <div className="w-full space-y-6 lg:max-w-xl xl:max-w-2xl">
                  {/* Order details */}
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Detalles del Pedido</h3>
                    <div className="space-y-4">
                      {order.products.map((product, index) => (
                        <div key={product.id} className="flex items-start gap-6 rounded-lg border border-gray-100 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50">
                          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                            <img className="h-full w-full object-cover" src={product.image} alt={product.title} />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-base font-medium text-gray-900 dark:text-white">{product.title}</h4>
                            <div className="mt-1 flex items-center gap-x-4">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Color:</p>
                                    <div className={`w-4 h-4 rounded-full border border-gray-200 dark:border-gray-600 ${product.color}`} />
                                </div>
                                {product.size && (
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Tamaño:</p>
                                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{product.size}</span>
                                </div>
                                )}
                            </div>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">ID del Producto: {product.id}</p>
                            <div className="mt-2 flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Cantidad: {product.quantity}</p>
                              <p className="text-lg font-bold text-primary-600 dark:text-primary-500">${(product.quantity * product.price).toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={product.created}
                              onChange={() => handleProductCreatedToggle(index)}
                              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Information Collapsible */}
                  <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <button
                      onClick={() => setIsShippingOpen(!isShippingOpen)}
                      className="flex w-full items-center justify-between p-6 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <TruckIcon className="h-6 w-6 text-primary-600" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Información de Envío</h3>
                      </div>
                      <ChevronDownIcon 
                        className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isShippingOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    
                    {isShippingOpen && (
                      <div className="border-t border-gray-200 p-6 dark:border-gray-700">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <UserIcon className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Nombre</p>
                              <p className="font-medium text-gray-900 dark:text-white">{order.shipping.name}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <PhoneIcon className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Teléfono</p>
                              <p className="font-medium text-gray-900 dark:text-white">{order.shipping.phone}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <EnvelopeIcon className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Correo</p>
                              <p className="font-medium text-gray-900 dark:text-white">{order.shipping.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPinIcon className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Dirección</p>
                              <p className="font-medium text-gray-900 dark:text-white">{order.shipping.address}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
          
                <div className="mt-6 grow sm:mt-8 lg:mt-0">
                  <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                      <TruckIcon className="h-6 w-6 text-primary-600" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Estado del Pedido</h3>
                    </div>
          
                    <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-700">
                      {order.status_history.map((statusItem, index) => (
                        <li 
                          key={index}
                          className={`mb-10 ms-6 transition-colors duration-300 ${
                            index === 0 ? 'text-primary-700' : 'text-gray-500'
                          }`}
                        >
                          <span className={`absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full ring-8 ring-white transition-colors duration-300 ${
                            index === 0 ? 'bg-primary-100 dark:bg-primary-900' : 'bg-gray-100 dark:bg-gray-700'
                          }`}>
                            {getStatusIcon(statusItem.status)}
                          </span>
                          <h4 className="mb-0.5 text-base font-semibold dark:text-white">
                            {getStatusText(statusItem.status)}
                          </h4>
                          <p className="text-sm font-normal dark:text-gray-400">
                            {new Date(statusItem.date).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </li>
                      ))}
                    </ol>
          
                    
                      <div className="gap-4 sm:flex sm:items-center">
                        <button 
                          type="button" 
                          className="w-full rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 transition-colors duration-200"
                          onClick={handleCancelOrder}
                          disabled={isUpdating || order?.status === 'cancelled'}
                        >
                          Cancelar pedido
                        </button>
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0 transition-colors duration-200"
                        >
                          Actualizar estado
                        </button>
                      </div>
                    
                  </div>
                </div>
              </div>
            </div>
        )}

        {/* Status Update Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                Actualizar Estado del Pedido
              </h3>
              
              <div className="mb-6">
                <label htmlFor="status" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Seleccionar nuevo estado
                </label>
                <select

                  id="status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                >
                  {ORDER_STATUSES.map((status) => (
                    <option 
                      key={status.value} 
                      value={status.value}
                      disabled={status.value === order?.status_history[0].status}
                    >
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleStatusChange}
                  disabled={isUpdating || selectedStatus === order?.status}
                  className="rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isUpdating ? 'Actualizando...' : 'Confirmar'}
                </button>
              </div>
            </div>
          </div>
        )}
    </section>
  )
}
