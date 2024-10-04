import { Product } from '@/types/products.type';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface ProductCartInfo {
    id: number;
    quantity: number;
    title: string;
    price: number;
    image: string;
    color: string;
    size?: string;
}
interface ProductsCart {
    products: ProductCartInfo[];
    addProduct: (product: ProductCartInfo) => void;
    removeProduct: (productIndex: number) => void;
    updateProducts: (products: ProductCartInfo[]) => void;
    clearCart: () => void;
}

const useProductsCart = create<ProductsCart>()(
    persist(
        (set,get) => ({
            products: [],
            addProduct: (product: ProductCartInfo) =>
                {
                    const { products } = get()
                    const productIndex = products.findIndex((p) => (p.id === product.id && p.color === product.color && p.size === product.size))
                   
                    if (productIndex !== -1 && products[productIndex].color === product.color && products[productIndex].size === product.size) {
                        const newProducts = [...products]
                        newProducts[productIndex].quantity += 1
                        return set({ products: newProducts })
                    }
                    set((state) => ({ products: [...state.products, product] }))
                },
            removeProduct: (productIndex: number) => {
                const { products } = get()
                    const newProducts = [...products]
                    newProducts[productIndex].quantity -= 1
                    return set({ products: newProducts })
            },
            updateProducts: (products: ProductCartInfo[]) => {
                set({ products });
            },
            clearCart: () => set({ products: [] }),
        }),
        {
            name: 'products-cart', // nombre del storage
            storage: createJSONStorage(() => localStorage), // puedes cambiarlo por sessionStorage si prefieres
        }
    )
);



export default useProductsCart; 