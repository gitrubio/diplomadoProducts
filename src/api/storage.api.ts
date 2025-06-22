import { storage } from "@/config/firebase";
import { ref, uploadBytes , getDownloadURL} from "firebase/storage";

export async function uploadImage(file: File) {
    const storageRef = ref(storage, `images/${file.name}`); // 'images/' es el directorio donde se almacenará
  
    try {
      const snapshot = await uploadBytes(storageRef, file);
      console.log('Imagen subida correctamente:', snapshot.metadata);
      // Aquí puedes obtener la URL de descarga si lo necesitas
      const downloadURL = await  getDownloadURL(snapshot.ref) 
    
      console.log('URL de descarga:', downloadURL);
      return downloadURL
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  }