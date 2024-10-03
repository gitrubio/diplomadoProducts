import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth } from '../config/firebase';

// Función para registrar un nuevo usuario
export const registerUser = async (email: string, password: string): Promise<User | undefined> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
  }
};

// Función para iniciar sesión
export const loginUser = async (email: string, password: string): Promise<User | undefined> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    
  }
};

// Función para cerrar sesión
export const logoutUser = async (): Promise<boolean> => {
  try {
    await signOut(auth);
    return true
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return false
  }
};
