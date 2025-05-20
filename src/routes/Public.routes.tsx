import Cart from '@/components/Cart/Cart'
import MobileNav from '@/components/navBar/MobileNav'
import NavBar from '@/components/navBar/NavBar'
import AuthGuard from '@/guards/AuthGuard'
import Checkout from '@/views/Checkout.view'
import History from '@/views/History.view'
import Home from '@/views/Home.view'
import Invoice from '@/views/Invoice.view'
import Offerts from '@/views/Offerts.view'
import OrderTracker from '@/views/OrderTracker.view'
import ProductOverView from '@/views/ProductOver.view'
import Productsview from '@/views/Products.view'
import { useState } from 'react'
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'

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
        <div>
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
                <Route element={<AuthGuard redirectTo='/login' />}>
                    <Route path='/history' element={<History/>} />
                    <Route path='/order/:id' element={<OrderTracker/>} />
                </Route>
                <Route path='/*' element={'NotFount'} />
            </Routes>
        </div>
    )
}
