import { IDiscount } from "@/types/products.type"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const productPrice = (price : number,discount: IDiscount) => {
  if(discount.discount === 0) {
    return price + ''
  }
  return (price - (price * discount.discount / 100)).toFixed(2)
}