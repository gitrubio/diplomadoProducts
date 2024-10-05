import { loginUser, logoutUser, registerUser } from "@/api/auth.api"
import { getUserById, saveUserToFirestore } from "@/api/users.api";
import useAlertStore from "@/store/alerts";
import useUserSession from "@/store/store";

const useAuht = () => {
    const {login, logout} = useUserSession()
    const { addAlert } = useAlertStore();

    const register = async (name:string ,email: string, password: string): Promise<void> => {
       const user = await registerUser(email, password);

       if(user){
       saveUserToFirestore(user.uid,email, name).then(() => {
        login(user.uid, name, email, false)
        addAlert(`Welcome to our platform, ${name}! We're excited to have you on board.`, 'success')
       })
        }else {
            addAlert('Something went wrong', 'error')
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
        
        login(user.uid, userData.username, email, userData.admin ?? false) 
        addAlert(`Welcome back, ${userData.username}!`, 'success')
        } else {
            addAlert('Invalid email or password', 'error')
        }

    }

    return {
        register,
        Logout,
        signIn
    }
}

export default useAuht