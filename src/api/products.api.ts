import { localstorageDiscount } from "@/constants"
import { IDiscount, Product } from "@/types/products.type"
import { i } from "framer-motion/client";

export const getProducts = async () : Promise<Product[]> => {
    try {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        return data as Product[]
    } catch (error) {
        console.error('Error fetching products: ', error)
        return []
    }
}

export const setDiscount = (discount : IDiscount ) => {
    localStorage.setItem(localstorageDiscount, JSON.stringify(discount))
}
export const getDiscount = () : IDiscount => {
    const localDiscount = localStorage.getItem(localstorageDiscount)
    return localDiscount ?  JSON.parse(localDiscount) : {id: 0, discount: 0}
}