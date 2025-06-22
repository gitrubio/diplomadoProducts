import { db } from "@/config/firebase"
import { localstorageDiscount } from "@/constants"
import { IDiscount, Product } from "@/types/products.type"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, QueryDocumentSnapshot, startAfter, Timestamp, updateDoc, where } from "firebase/firestore"


type GetProductsOptions = {
  filter?: string;
  pageSize?: number;
  lastVisible?: QueryDocumentSnapshot | null;
};

export const getProductsPaginated = async ({
  filter,
  pageSize = 10,
  lastVisible = null,
}: GetProductsOptions): Promise<{
  products: Product[];
  lastVisible: QueryDocumentSnapshot | null;
}> => {
  try {
    const productCollectionRef = collection(db, 'products');

    // Construimos la query base
    let q = query(productCollectionRef, orderBy('title'), limit(pageSize));

    if (lastVisible) {
      q = query(q, startAfter(lastVisible));
    }

    const querySnapshot = await getDocs(q);

    let products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];

    // Si hay filtro (texto), filtramos manualmente por título o descripción
    if (filter) {
      const filterLower = filter.toLowerCase();
      products = products.filter(
        (product) =>
          product.category === filter ||
          product.title?.toLowerCase().includes(filterLower) ||
          product.description?.toLowerCase().includes(filterLower)
      );
    }

    const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    return {
      products,
      lastVisible: newLastVisible,
    };
  } catch (error) {
    console.error('Error fetching paginated products:', error);
    throw new Error('Failed to fetch paginated products');
  }
};

export const getProducts = async ( filter?: string | null ): Promise<Product[]> => {
    try {
      const productCollectionRef = collection(db, 'products');
      const querySnapshot = await getDocs(productCollectionRef);
      const products = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as any;
      });
      if(filter){
        return products.filter((product) => product.category === filter || product.title?.toLowerCase().includes(filter.toLowerCase()) || product.description?.toLowerCase().includes(filter.toLowerCase()))
      }
      console.log(products);
      
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  };

  export const deleteProduct = async (productId: string): Promise<void> =>{
    const productRef = doc(db, 'products', productId); // Asegúrate de que 'products' es el nombre correcto de tu colección
  
    try {
      await deleteDoc(productRef);
      console.log(`Producto con ID ${productId} borrado correctamente.`);
    } catch (error) {
      console.error('Error al borrar el producto:', error);
    }
  }

export const getProduct = async (productId: string,): Promise<Product | null> => {
    try {
      // Referencia al documento con el ID en la colección "orders"
      const orderRef = doc(db, "products", productId);
      const porductSnapshot = await getDoc(orderRef);
  
      // Verifica si el documento existe
      if (porductSnapshot.exists()) {
        const orderData = {id: porductSnapshot.id , ...porductSnapshot.data()} as any;
      
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

 export const updateProduct = async (productId: string, updatedData: Record<string, any>): Promise<void> => {
    const productRef = doc(db, 'products', productId); // 'products' es el nombre de tu colección
  
    try {
      await updateDoc(productRef, updatedData);
      console.log(`Producto con ID ${productId} actualizado correctamente.`);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  }

export const createProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
  try {
    await addDoc(collection(db, 'products'), {
      ...product,
      createdAt: Timestamp.now().toDate().toISOString(),
      updatedAt: Timestamp.now().toDate().toISOString(),
    });
    console.log('Product created successfully!');
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
};

export const setDiscount = (discount : IDiscount ) => {
    localStorage.setItem(localstorageDiscount, JSON.stringify(discount))
}
export const getDiscount = () : IDiscount => {
    const localDiscount = localStorage.getItem(localstorageDiscount)
    return localDiscount ?  JSON.parse(localDiscount) : {id: 0, discount: 0}
}