import { getProduct } from "@/api/products.api"
import { Product } from "@/types/products.type"
import { useEffect, useState } from "react"

export const useGetProduct = (productId: string = "") => {
    const [product,setProduct] = useState<Product>({id: '0', title: '', price: 0, description: '', category: '', image: '', rating: {rate: 0, count: 0}, colors: [], sizes: []})
    const [loading,setLoading] = useState<boolean>(true)
    // Fetch the product from the API
    useEffect(() => {
        getProductById()
    }, [])

    const getProductById = async () => {
        const data = await getProduct(productId)
        setProduct(data as Product)
        setLoading(false)
    }
    
    return {
        product,
        setProduct,
        loading,
        setLoading
    }
}