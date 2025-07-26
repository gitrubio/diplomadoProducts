import { getAllOrders, getOrderById, getOrdersByUserId, saveOrder, searchOrdersById } from "@/api/orders.api";
import useAlertStore from "@/store/alerts";
import useUserSession from "@/store/store";
import { Order } from "@/types/order.types";

const useOrder = () => {
   const {addAlert} = useAlertStore()
   const {userId, admin} = useUserSession()
    const newOrder = async (order: Partial<Order>) => {
        const orderId = await saveOrder(order);
        if(orderId){
            addAlert('Order created successfully', 'success')
            return orderId
        }else{
            addAlert('Something went wrong', 'error')
        }
    }

const getOrderId = async (orderId: string) => {
        const order = await getOrderById(orderId);
        if(order){
            return order
        }
}

const getOrders = async (userId: string, isAdmin: boolean, pageSize: number = 10, lastVisible?: any) => {
    let result;
    if (isAdmin) {
        result = await getAllOrders(pageSize, lastVisible)
    } else {
        result = await getOrdersByUserId(userId, pageSize, lastVisible)
    }
    return result
}

const searchOrders = async (searchTerm: string, pageSize: number = 10, lastVisible?: any) => {
    const result = await searchOrdersById(searchTerm, userId, admin, pageSize, lastVisible);
    return result;
}

    return {
        newOrder,
        getOrderId,
        getOrders,
        searchOrders
    }
}

export default useOrder;