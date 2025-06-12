import { ProductCartInfo } from "@/store/products";
import { Timestamp } from "firebase/firestore";

export interface Order {
    id: string;
    user: {
        id: string;
        name: string;
        email: string;
    }
    products: ProductCartInfo[];
    total: number;
    shipping: {
        name: string;
        email: string;
        phone: string;
        address: string;
    }
    status_history: {
        status: 'created' | 'payment' | 'incoming' |'completed' | "cancelled";
        date: string;
    }[]
    status: 'created' | 'payment' | 'incoming' |'completed' | "cancelled";
    createdAt: Timestamp;
    updatedAt: Timestamp;
  }
  
 