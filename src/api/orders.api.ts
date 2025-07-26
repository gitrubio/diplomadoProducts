import { db } from "@/config/firebase";
import { Order } from "@/types/order.types";
import { collection, addDoc, Timestamp, doc, getDoc, getDocs, query, where, updateDoc, orderBy, limit, startAfter } from "firebase/firestore";

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

export const getOrderById = async (orderId: string): Promise<Order | null> => {
    try {
      // Referencia al documento con el ID en la colección "orders"
      const orderRef = doc(db, "orders", orderId);
      const orderSnapshot = await getDoc(orderRef);
  
      // Verifica si el documento existe
      if (orderSnapshot.exists()) {
        const orderData = orderSnapshot.data() as Order;
       
         
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
  export const getAllOrders = async (pageSize: number = 10, lastVisible?: any): Promise<{orders: Order[], lastVisible: any}> => {
    try {
      const ordersCollectionRef = collection(db, 'orders');
      let q = query(ordersCollectionRef, orderBy('createdAt', 'desc'), limit(pageSize));
      
      if (lastVisible) {
        q = query(ordersCollectionRef, orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(pageSize));
      }

      const orderSnapshot = await getDocs(q);
      const ordersList = orderSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
      const lastVisibleDoc = orderSnapshot.docs[orderSnapshot.docs.length - 1];

      return {
        orders: ordersList as Order[],
        lastVisible: lastVisibleDoc
      };
    } catch (error) {
      console.error("Error fetching all orders: ", error);
      throw new Error("Failed to fetch all orders");
    }
  };

  export const getOrdersByUserId = async (userId: string, pageSize: number = 10, lastVisible?: any): Promise<{orders: Order[], lastVisible: any}> => {
    try {
      const ordersCollectionRef = collection(db, 'orders');
      let q = query(
        ordersCollectionRef, 
        where('user.id', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      );
      
      if (lastVisible) {
        q = query(
          ordersCollectionRef,
          where('user.id', '==', userId),
          orderBy('createdAt', 'desc'),
          startAfter(lastVisible),
          limit(pageSize)
        );
      }

      const querySnapshot = await getDocs(q);
      const userOrdersList = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
      const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

      return {
        orders: userOrdersList as Order[],
        lastVisible: lastVisibleDoc
      };
    } catch (error) {
      console.error("Error fetching orders by userId: ", error);
      throw new Error("Failed to fetch orders by userId");
    }
  };

export const updateOrderStatus = async (orderId: string, newStatus: Order['status']): Promise<void> => {
  try {
    const orderRef = doc(db, "orders", orderId);
    const orderSnapshot = await getDoc(orderRef);

    if (!orderSnapshot.exists()) {
      throw new Error("Order not found");
    }

    const orderData = orderSnapshot.data() as Order;
    
    // Verificar que el nuevo estado no sea igual al último estado en el historial
    if (orderData.status_history[0]?.status === newStatus) {
      throw new Error("Cannot update to the same status");
    }

    // Actualizar el documento
    await updateDoc(orderRef, {
      status: newStatus,
      status_history: [
        {
          status: newStatus,
          date: new Date().toISOString()
        },
        ...orderData.status_history
      ],
      updatedAt: Timestamp.now()
    });

    console.log("Order status updated successfully");
  } catch (error) {
    console.error("Error updating order status: ", error);
    throw error;
  }
};

export const searchOrdersById = async (searchTerm: string, userId: string, isAdmin: boolean, pageSize: number = 10, lastVisible?: any): Promise<{orders: Order[], lastVisible: any}> => {
  try {
    const ordersCollectionRef = collection(db, 'orders');
    let q;

    // Primero obtenemos todas las órdenes
    if (isAdmin) {
      q = query(
        ordersCollectionRef,
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      );
    } else {
      q = query(
        ordersCollectionRef,
        where('user.id', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      );
    }

    if (lastVisible) {
      q = query(q, startAfter(lastVisible));
    }

    const querySnapshot = await getDocs(q);
    const ordersList = querySnapshot.docs
      .map((doc) => ({id: doc.id, ...doc.data()}))
      .filter(order => order.id.toLowerCase().includes(searchTerm.toLowerCase()));

    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

    return {
      orders: ordersList as Order[],
      lastVisible: lastVisibleDoc
    };
  } catch (error) {
    console.error("Error searching orders: ", error);
    throw new Error("Failed to search orders");
  }
};