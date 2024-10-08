import { cn } from '@/lib/utils'
import useUserSession from '@/store/store'
import { StarIcon } from '@heroicons/react/16/solid'
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

    <div className='flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
        <div className='z-10 flex min-h-[16rem] items-center justify-center '>
            <div
                className={cn(
                    'group rounded-xl active:scale-95  bg-neutral-900 text-white transition-all  '
                )}
            >

                <NavLink
                    className='items-center text-sm font-medium   disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground  hover:bg-primary/90 h-9 px-4 py-2 hidden max-w-52 overflow-hidden whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2'
                    to='offerts'
                >
                    <span className='absolute right-0  -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all  ease-out animate-slide'></span>

                    <StarIcon className='size-4 text-gray-500 transition-all duration-300 group-hover:text-yellow-300  group-hover:rotate-180' />


                    <div className='flex items-center'>
                        <span className='ml-1'>Special Offers</span>
                    </div>

                </NavLink>
            </div>
        </div>
        <span aria-hidden='true' className='h-6 w-px bg-gray-200' />
    </div>

    

    {/* Cart */}
    <div className='ml-4 flow-root lg:ml-6'>
        <NavLink className='group -m-2 flex items-center p-2' to={"/cart"}>
            <ShoppingBagIcon
                aria-hidden='true'
                className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
            />
            <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>{products.length}</span>
          
            
        </NavLink> 
    </div>
   { isLoggedIn ? <>
      <UserProfile userEmail={userEmail} username={username}/>
   </> : <NavLink to={"/login"} className='group -m-2 flex items-center p-2 ml-4'>
            <UserCircleIcon
                aria-hidden='true'
                className='h-7 w-7 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
            />
            </NavLink>}
</div>
  )
}
