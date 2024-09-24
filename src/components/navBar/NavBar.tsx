import { PopoverGroup } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import UserSection from '../userSection/UserSection'
import { Categoires } from '@/types/nav.types'

    interface NavProps {
        setOpen: (value: boolean) => void
        navigation: {
            categories: Categoires[]
        }
    }

export default function NavBar({setOpen,navigation}: NavProps) {

  return (
    <header className='relative bg-white'>
    <nav aria-label='Top' className='mx-auto  px-4 sm:px-6 lg:px-8'>
        <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center'>
                <button
                    type='button'
                    onClick={() => setOpen(true)}
                    className='relative rounded-md bg-white p-2 text-gray-400 lg:hidden'
                >
                    <span className='absolute -inset-0.5' />
                    <span className='sr-only'>Open menu</span>
                    <Bars3Icon aria-hidden='true' className='h-6 w-6' />
                </button>

                {/* Logo */}
                <div className='ml-4 flex lg:ml-0 w-10'>
                   
                        <span className='sr-only'>Your Company</span>
                        <img alt='' src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600' className='h-8 w-auto' />
                    
                </div>

                {/* Flyout menus */}

                <PopoverGroup className='hidden lg:ml-8 lg:block lg:self-stretch'>
                    <div className='flex h-full space-x-8'>
                        {navigation.categories.map((category) => (
                            <NavLink to={category.id} className={`relative z-10 -mb-px flex   items-center border-b-2  pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 ${location.pathname.includes(category.id) ? "border-indigo-600 text-indigo-600" : ""}`}>
                                {category.name}
                            </NavLink>
                        ))}
                    </div>
                </PopoverGroup>


              <UserSection/>
            </div>
        </div>
    </nav>
</header>
  )
}
