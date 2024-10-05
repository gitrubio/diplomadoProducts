
import { db } from "@/config/firebase";
import { Order } from "@/types/order.types";
import { collection, addDoc, Timestamp, doc, getDoc, getDocs, query, where } from "firebase/firestore";

/**
 * Función para guardar una orden de compra en Firestore
 * @param order - La orden de compra que se guardará
 * @returns {Promise<string>} - Retorna el ID de la orden creada
 */
export const saveOrder = async (order: Partial<Order>): Promise<string> => {
  try {
    // Crear un documento en la colección 'orders'
    const docRef = await addDoc(collection(db, "orders"), {
      ...order,
      createdAt: Timestamp.now(),   // Usa el Timestamp de Firestore para createdAt
      updatedAt: Timestamp.now(),   // Usa el Timestamp de Firestore para updatedAt
    });

    console.log("Order successfully created with ID: ", docRef.id);
    return docRef.id; // Retorna el ID del documento creado
  } catch (error) {
    console.error("Error creating order: ", error);
    throw new Error("Failed to create order");
  }
};

export const getOrderById = async (orderId: string,userId: string, admin: boolean): Promise<Order | null> => {
    try {
      // Referencia al documento con el ID en la colección "orders"
      const orderRef = doc(db, "orders", orderId);
      const orderSnapshot = await getDoc(orderRef);
  
      // Verifica si el documento existe
      if (orderSnapshot.exists()) {
        const orderData = orderSnapshot.data() as Order;
         if ((orderData.user.id !== userId) && !admin) {
          console.log("User is not authorized to view this order!");
          return null; // El usuario no está autorizado para ver esta orden
            
         }
        return orderData; // Retorna los datos de la orden
      } else {
        console.log("No such order!");
        return null; // No existe la orden con el ID proporcionado
      }
    } catch (error) {
      console.error("Error fetching order: ", error);
      throw new Error("Failed to fetch order");
    }
  };
  export const getAllOrders = async (): Promise<Order[]> => {
    try {
      const ordersCollectionRef = collection(db, 'orders');
      const orderSnapshot = await getDocs(ordersCollectionRef);
      const ordersList = orderSnapshot.docs.map((doc) =>({id: doc.id, ...doc.data()}));
  
      return ordersList as Order[];
    } catch (error) {
      console.error("Error fetching all orders: ", error);
      throw new Error("Failed to fetch all orders");
    }
  };

  export const getOrdersByUserId = async (userId: string): Promise<Order[]> => {
    try {
      const ordersCollectionRef = collection(db, 'orders');
      const q = query(ordersCollectionRef, where('user.id', '==', userId));
      const querySnapshot = await getDocs(q);
  
      const userOrdersList = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  
      return userOrdersList as Order[];
    } catch (error) {
      console.error("Error fetching orders by userId: ", error);
      throw new Error("Failed to fetch orders by userId");
    }
  };