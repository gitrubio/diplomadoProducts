
import { useState } from 'react'
import {
    Routes,
    Route,
    useLocation,
    Navigate,
} from "react-router-dom";
import MobileNav from '@/components/navBar/MobileNav';
import NavBar from '@/components/navBar/NavBar';
import Productsview from '@/views/Products.view';
import Offerts from '@/views/Offerts.view';

const navigation = {
    categories: [
        {
            id: 'tienda',
            name: 'Tienda',

        },
        {
            id: 'nosotros',
            name: 'Nosotros',

        },
        {
            id: 'contacto',
            name: 'Contacto',

        },
    ],
}

export default function App() {

    const [open, setOpen] = useState(false)
    const location = useLocation()
    console.log(location);
    
    return (
        <div>
            <div className='bg-white'>
                {/* Mobile menu */}
                <MobileNav open={open} setOpen={setOpen} navigation={navigation}/>
                {/* Desktop menu */}
                <NavBar setOpen={setOpen} navigation={navigation}/>
            </div>
            <Routes>
                <Route path='/' element={<Navigate to={"/tienda"}/>} />
                <Route path='/tienda' element={<Productsview/>} />
                <Route path='/nosotros' element={'hello'} />
                <Route path='/contacto' element={'hello'} />
                <Route path='/ofertas' element={<Offerts/>} />
                <Route path='/*' element={'NotFount'} />     
            </Routes>
        </div>
    );
}