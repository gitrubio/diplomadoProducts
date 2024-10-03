import { db } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const saveUserToFirestore = async (userId: string, email: string, username: string): Promise<any> => {
    try {
      // Referencia al documento en la colección 'users' con el ID del usuario
      const userRef = doc(db, 'users', userId);
      
      // Datos del usuario a guardar
      const userData = {
        userId,
        email,
        username,
        createdAt: new Date(),
      };
  
      // Guarda o actualiza el documento
      await setDoc(userRef, userData, { merge: true });
  
      return userData
    } catch (error) {
      console.error('Error al guardar el usuario en Firestore:', error);
      throw error;
    }
  };

  export const getUserById = async (userId: string) => {
    try {
      // Referencia al documento en la colección 'users'
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        // Devuelve los datos del usuario
        return userSnap.data();
      } else {
        // Si el usuario no existe
        console.log('No existe un usuario con ese ID');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el usuario por ID:', error);
      throw error;
    }
  };