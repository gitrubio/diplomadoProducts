import Cart from '@/components/Cart/Cart'
import MobileNav from '@/components/navBar/MobileNav'
import NavBar from '@/components/navBar/NavBar'
import AuthGuard from '@/guards/AuthGuard'
import Checkout from '@/views/Checkout.view' 
import Home from '@/views/Home.view'
import Invoice from '@/views/Invoice.view'
import Offerts from '@/views/Offerts.view'
import OrderTracker from '@/views/OrderTracker.view'
import ProductOverView from '@/views/ProductOver.view'
import Productsview from '@/views/Products.view'
import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

export default function Public() {
    const [open, setOpen] = useState(false)


    const navigation = {
        categories: [
            {
                id: 'store',
                name: 'Productos',
    
            },
        ],
    }
    
    return (
        <div className='bg-[#F5F5DC] w-[100%] h-[100%]'>
            <div className='bg-transparent'>
                {/* Mobile menu */}
                <MobileNav open={open} setOpen={setOpen} navigation={navigation} />
                {/* Desktop menu */}
                <NavBar key={'navbar-desktop'} setOpen={setOpen} navigation={navigation}  />
            </div>
            <Routes >
                <Route path='' element={<Navigate to={"/home"} />} />
                <Route path='/home'  element={<Home/>} />
                <Route path='/store' element={<Productsview />} />
                <Route path='/store/:productID' element={<ProductOverView/>} />
                <Route path='/cart' element={<Cart/>} />
                <Route path='/offerts' element={<Offerts />} />
                <Route path='/checkout' element={<Checkout/>} />
                <Route path='/invoice/:id' element={<Invoice/>} />
                <Route path='/*' element={'NotFount'} />
            </Routes>
        </div>
    )
}
