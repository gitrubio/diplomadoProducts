import { getAllOrders, getOrderById, getOrdersByUserId, saveOrder } from "@/api/orders.api";
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
        const order = await getOrderById(orderId,userId,admin);
        if(order){
            return order
        }
}
const getOrders = async (userId: string, isAdmin: boolean) => {
    let orders = []
        if (isAdmin) {
            orders = await getAllOrders()
        } else {
           orders = await getOrdersByUserId(userId)
        }
    return orders
}

    return {
        newOrder,
        getOrderId,
        getOrders
    }
}

export default useOrder;