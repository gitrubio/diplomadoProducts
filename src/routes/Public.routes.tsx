import Cart from '@/components/Cart/Cart'
import MobileNav from '@/components/navBar/MobileNav'
import NavBar from '@/components/navBar/NavBar'
import AuthGuard from '@/guards/AuthGuard'
import Home from '@/views/Home.view'
import Offerts from '@/views/Offerts.view'
import ProductOverView from '@/views/ProductOver.view'
import Productsview from '@/views/Products.view'
import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

export default function Public() {
    const [open, setOpen] = useState(false)

    const navigation = {
        categories: [
            {
                id: 'home',
                name: 'Home',
    
            },
            {
                id: 'store',
                name: 'Store',
    
            },
            {
                id: 'contacto',
                name: 'Contact',
    
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
                <Route path='' element={<Navigate to={"/home"} />} />
                <Route path='/home'  element={<Home/>} />
                <Route path='/store' element={<Productsview />} />
                <Route path='/store/:productID' element={<ProductOverView/>} />
                <Route path='/cart' element={<Cart/>} />
                <Route path='/contacto' element={'hello'} />
                <Route path='/offerts' element={<Offerts />} />
                <Route element={<AuthGuard redirectTo='/login' />}>
                    <Route path='/history' element={'historial'} />
                    <Route path='/checkout' element={'checkout'} />
                </Route>
                <Route path='/*' element={'NotFount'} />
            </Routes>
        </div>
    )
}
