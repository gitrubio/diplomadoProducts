import useUserSession from '@/store/store'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { ShoppingBagIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import UserProfile from '../ui/userProfile'
import useProductsCart from '@/store/products'

export default function UserSection() {
     const { isLoggedIn, username, userEmail } = useUserSession()
     const {products} = useProductsCart()
  return (
    <div className='ml-auto flex items-center'>

    {/* Cart */}
    <div className='ml-4 flow-root lg:ml-6'>
        <NavLink className='group -m-2 flex items-center p-2 animate-in ease-in-out' to={"/cart"}>
            <ShoppingBagIcon
                aria-hidden='true'
                className='h-6 w-6 flex-shrink-0 transition-transform duration-500 ease-in-out group-hover:scale-110'
            />
           {products.length > 0 && (
             <span className='ml-2 text-sm font-medium animate__animated animate__fadeInRight transition-transform duration-300 ease-in-out'>
               {products.length}
             </span>
           )}
        </NavLink>
        
    </div>
    
   { isLoggedIn ? 
      <UserProfile userEmail={userEmail} username={username}/>
    : <NavLink to={"/login"} className='group -m-2 flex items-center p-2 ml-2'>
            <UserCircleIcon
                aria-hidden='true'
                className='h-7 w-7 flex-shrink-0 '
            />
            </NavLink>}
</div>
  )
}
