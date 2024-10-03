import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserSession {
  userId: string;
  username: string;
  userEmail: string;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (userId: string, username: string, userEmail: string , isAdmin: boolean) => void;
  logout: () => void;
}

const useUserSession = create<UserSession>()(
  persist(
    (set) => ({
      userId: '',
      username: '',
      userEmail: '',
      isLoggedIn: false,
      isAdmin: false,
      login: (userId: string, username: string, userEmail: string , isAdmin: boolean) =>
        set({ userId, username, userEmail, isLoggedIn: true, isAdmin}),
      logout: () => set({ userId: '', username: '',userEmail: '',  isLoggedIn: false, isAdmin: false}),
    }),
    {
      name: 'user-session', // nombre del storage
      storage: createJSONStorage(()=> localStorage), // puedes cambiarlo por sessionStorage si prefieres
    }
  )
);

  

export default useUserSession; 