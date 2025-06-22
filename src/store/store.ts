import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserSession {
  userId: string;
  username: string;
  userEmail: string;
  isLoggedIn: boolean;
  admin: boolean;
  login: (userId: string, username: string, userEmail: string , admin: boolean) => void;
  logout: () => void;
}

const useUserSession = create<UserSession>()(
  persist(
    (set) => ({
      userId: '',
      username: '',
      userEmail: '',
      isLoggedIn: false,
      admin: false,
      login: (userId: string, username: string, userEmail: string , admin: boolean) =>
        set({ userId, username, userEmail, isLoggedIn: true, admin}),
      logout: () => set({ userId: '', username: '',userEmail: '',  isLoggedIn: false, admin: false}),
    }),
    {
      name: 'user-session', // nombre del storage
      storage: createJSONStorage(()=> localStorage), // puedes cambiarlo por sessionStorage si prefieres
    }
  )
);

  

export default useUserSession; 