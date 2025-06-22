import { getAllOrders } from "@/api/orders.api";
import { Order } from "@/types/order.types";
import { useEffect, useState } from "react";

export type OrdersByDay = {
    [date: string]: Order[];
  };
  
const useReports = () => {
    const [orders, setOrders] = useState<OrdersByDay>({});


    const getReports = async () => {
        try {
            const data = await getAllOrders();
            return organizeOrdersByDay(data);
        } catch (error) {
            console.error(error);
        }
    };
    const organizeOrdersByDay = (orders: Order[]): OrdersByDay => {
        return orders.reduce((acc: OrdersByDay, order: Order) => {
          // Extraer la fecha en formato 'YYYY-MM-DD' usando Day.js
          const date = order.createdAt.toDate().toLocaleDateString();
      
          // Si la fecha no existe en el acumulador, inicialízala con un array vacío
          if (!acc[date]) {
            acc[date] = [];
          }
      
          // Agregar la orden al array de la fecha correspondiente
          acc[date].push(order);
      
          return acc;
        }, {});
      };
    useEffect(() => {
        getReports().then((orders) => {
            if(orders) setOrders(orders);
        });
    }, []);

    return { getReports, orders };
}

export default useReports;