
import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Public from './Public.routes';
import Login from "@/views/Login.view";
import Register from "@/views/Register.view";
import useUserSession from "@/store/store";


export default function App() {
    const { isLoggedIn } = useUserSession()
    return (
        <div>
            <Routes>
            <Route  path='/*' element={<Public/>}/>
            <Route  path='/login' element={isLoggedIn ?  <Navigate to={"/"}/> :<Login/>}/>
            <Route  path='/register' element={isLoggedIn ?  <Navigate to={"/"}/> :<Register/>}/>
            <Route  path='/dashboard' element={<>login</>}/>
            </Routes>
        </div>
    );
}