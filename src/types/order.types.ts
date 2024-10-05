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
    payment: {
        type: string,
        titular: string,
        number: string,
        expe: string,
        cvv: string
    }
    status: 'payment' | 'incoming' |'completed' | "cancelled";
    createdAt: Timestamp;
    updatedAt: Timestamp;
  }
  
 