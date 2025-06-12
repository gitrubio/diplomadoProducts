import useOrder from '@/hooks/useOrder'
import useUserSession from '@/store/store'
import { Order } from '@/types/order.types'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Orders() {
    const [orders, setOrders] = React.useState<Order[]>([])
    const [lastVisible, setLastVisible] = useState<any>(null)
    const [hasMore, setHasMore] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [copiedId, setCopiedId] = useState<string | null>(null)
    const itemsPerPage = 10
    const { getOrders, searchOrders } = useOrder()
    const { userId } = useUserSession()

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSearchTerm(searchInput);
        }
    };

    const handleClearSearch = () => {
        setSearchInput('');
        setSearchTerm('');
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(text);
            setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const loadOrders = async (isInitial: boolean = false) => {
        try {
            let result;
            if (searchTerm) {
                result = await searchOrders(searchTerm, itemsPerPage, isInitial ? null : lastVisible)
            } else {
                result = await getOrders(userId, true, itemsPerPage, isInitial ? null : lastVisible)
            }
            
            if (isInitial) {
                setOrders(result.orders)
            } else {
                setOrders(prev => [...prev, ...result.orders])
            }
            setLastVisible(result.lastVisible)
            setHasMore(result.orders.length === itemsPerPage)
        } catch (error) {
            console.error('Error loading orders:', error)
        }
    }

    useEffect(() => {
        loadOrders(true)
    }, [searchTerm])

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date)
    }

    const colors = (status : string) => {
        switch (status) {
            case 'payment':
                return 'bg-blue-700 text-white dark:bg-blue-800 dark:text-white'
            case 'incoming':
                return 'bg-amber-600 text-white dark:bg-amber-700 dark:text-white'
            case 'completed':
                return 'bg-emerald-700 text-white dark:bg-emerald-800 dark:text-white'
            case 'cancelled':
                return 'bg-red-700 text-white dark:bg-red-800 dark:text-white'
            default:
                return 'bg-gray-700 text-white dark:bg-gray-800 dark:text-white'
        }
    }

    const getStatusIcon = (status: string) => {
        const icons = {
            payment: (
                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3Z"/>
                </svg>
            ),
            incoming: (
                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
            ),
            completed: (
                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
            ),
            cancelled: (
                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                </svg>
            ),
            created: (
                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                </svg>
            )
        };
        return icons[status as keyof typeof icons] || null;
    };

    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mx-auto max-w-5xl">
                    <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">All orders</h2>

                        <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                            <div className="relative">
                                <input
                                    type="text"
                                    id="search-order"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                    placeholder="Search by Order ID"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    onKeyDown={handleSearch}
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                {searchTerm && (
                                    <button
                                        onClick={handleClearSearch}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    >
                                        <svg className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                                        </svg>
                                    </button>
                                )}
                            </div>

                            <div>
                                <label htmlFor="order-type" className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select order type</label>
                                <select id="order-type" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                    <option selected>All orders</option>
                                    <option value="pre-order">Pre-order</option>
                                    <option value="transit">In transit</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>

                            <span className="inline-block text-gray-500 dark:text-gray-400"> from </span>

                            <div>
                                <label htmlFor="duration" className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select duration</label>
                                <select id="duration" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                    <option selected>this week</option>
                                    <option value="this month">this month</option>
                                    <option value="last 3 months">the last 3 months</option>
                                    <option value="lats 6 months">the last 6 months</option>
                                    <option value="this year">this year</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flow-root sm:mt-8">
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {orders
                                .filter(order => 
                                    searchTerm === '' || 
                                    order.id.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((order) => (
                                <div key={order.id} className="flex flex-wrap items-center gap-y-4 py-6 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 rounded-lg">
                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                                        <dd className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
                                            <button 
                                                onClick={() => copyToClipboard(order.id)}
                                                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"
                                            >
                                                #{order.id.slice(0,9)}
                                                {copiedId === order.id && (
                                                    <span className="text-xs text-green-600 dark:text-green-400">
                                                        Copied!
                                                    </span>
                                                )}
                                            </button>
                                        </dd>
                                    </dl>

                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                                        <dd className="mt-1 text-base font-semibold text-gray-900 dark:text-white">{formatDate(order.createdAt.toDate())}</dd>
                                    </dl>

                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                                        <dd className="mt-1 text-base font-semibold text-gray-900 dark:text-white">${order.total}</dd>
                                    </dl>

                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                                        <dd className={`me-2 mt-1 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${colors(order.status_history[0].status)}`}>
                                            {getStatusIcon(order.status_history[0].status)}
                                            {order.status_history[0].status}
                                        </dd>
                                    </dl>

                                    <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                                        <NavLink to={"/dashboard/order/" + order.id} className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">View details</NavLink>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {hasMore && (
                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={() => loadOrders()}
                                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                                >
                                    Load more
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
