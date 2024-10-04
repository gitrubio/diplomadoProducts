
import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Public from './Public.routes';
import Login from "@/views/Login.view";
import Register from "@/views/Register.view";
import useUserSession from "@/store/store";
import AlertProvider from "@/components/Alerts/AlertsProviders";


export default function App() {
    const { isLoggedIn } = useUserSession()
    return (
        <div>
            <AlertProvider/>
            <Routes>
            <Route  path='/*' element={<Public/>}/>
            <Route  path='/login' element={isLoggedIn ?  <Navigate to={"/"}/> :<Login/>}/>
            <Route  path='/register' element={isLoggedIn ?  <Navigate to={"/"}/> :<Register/>}/>
            <Route  path='/dashboard' element={<>login</>}/>
            </Routes>
        </div>
    );
}