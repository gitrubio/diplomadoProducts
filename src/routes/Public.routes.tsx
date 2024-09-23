import MobileNav from '@/components/navBar/MobileNav'
import NavBar from '@/components/navBar/NavBar'
import Offerts from '@/views/Offerts.view'
import Productsview from '@/views/Products.view'
import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

export default function Public() {
    const [open, setOpen] = useState(false)

    const navigation = {
        categories: [
            {
                id: 'store',
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
    
    return (
        <div>
            <div className='bg-white'>
                {/* Mobile menu */}
                <MobileNav open={open} setOpen={setOpen} navigation={navigation} />
                {/* Desktop menu */}
                <NavBar setOpen={setOpen} navigation={navigation} />
            </div>
            <Routes>
                <Route path='' element={<Navigate to={"/store"} />} />
                <Route path='/store' element={<Productsview />} />
                <Route path='/store/:productID' element={<>dadad</>} />
                <Route path='/nosotros' element={'hello'} />
                <Route path='/contacto' element={'hello'} />
                <Route path='/offerts' element={<Offerts />} />
                <Route path='/*' element={'NotFount'} />
            </Routes>
        </div>
    )
}
