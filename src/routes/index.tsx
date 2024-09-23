
import { useState } from 'react'
import {
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import Public from './Public.routes';


export default function App() {

    const [open, setOpen] = useState(false)
    const location = useLocation()
    console.log(location);
    
    return (
        <div>
            <Routes>
            <Route  path='/*' element={<Public/>}/>
            <Route  path='/login' element={<>login</>}/>
            <Route  path='/register' element={<>login</>}/>
            <Route  path='/dashboard' element={<>login</>}/>
            </Routes>
        </div>
    );
}