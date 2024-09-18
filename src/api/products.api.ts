import { Product } from "@/types/products.type"


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