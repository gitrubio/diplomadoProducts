import { loginUser, logoutUser, registerUser } from "@/api/auth.api"
import { getUserById, saveUserToFirestore } from "@/api/users.api";
import useUserSession from "@/store/store";

const useAuht = () => {
    const {login, logout} = useUserSession()

    const register = async (name:string ,email: string, password: string): Promise<void> => {
       const user = await registerUser(email, password);

       if(user){
       saveUserToFirestore(user.uid,email, name).then((userData) => {
        login(user.uid, name, email, false)
       })
        }

    }
    const Logout = async (): Promise<void> => {
       const user = await logoutUser();

       if(user) logout()

    }


    const signIn = async (email: string, password: string): Promise<void> => {
       const user = await loginUser(email, password);

       if(user){
        const userData : any = await getUserById(user.uid)
        console.log(userData);
        
        login(user.uid, userData.username, email, userData.isAdmin ?? false) 
        }

    }

    return {
        register,
        Logout,
        signIn
    }
}

export default useAuht