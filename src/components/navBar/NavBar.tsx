import { PopoverGroup } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { NavLink, useLocation } from 'react-router-dom'
import UserSection from '../userSection/UserSection'
import { Categoires } from '@/types/nav.types'
import logo from "@/assets/images/logo_b_e_r.png"
import SearchInput from '../ui/SearchInput'
import { useState } from 'react'
    interface NavProps {
        setOpen: (value: boolean) => void
        navigation: {
            categories: Categoires[]
        }
    }

export default function NavBar({setOpen,navigation}: NavProps) {
     

  return (
    <header className='absolute font-bold top-0 left-0 right-0 z-50  text-black bg-transparent'>
    <nav aria-label='Top' className='mx-auto  px-4 sm:px-4 lg:px-4'>
        <div className=''>
            <div className='flex h-16 items-center justify-between'>
                <button
                    type='button'
                    onClick={() => setOpen(true)}
                    className='relative rounded-md p-2 lg:hidden'
                >
                    <span className='absolute -inset-0.5' />
                    <span className='sr-only'>Open menu</span>
                    <Bars3Icon aria-hidden='true' className='h-6 w-6 text-white' />
                </button>

                {/* Logo */}
                <NavLink to={"home"} className='hidden  ml-4 md:flex lg:ml-0 w-12'>
                   
                        <span className='sr-only'>Your Company</span>
                        <img alt='navbar-section' src={logo} className='h-12 w-12' />
                    
                </NavLink>

                {/* Flyout menus - Hidden on mobile, visible on desktop */}

                <PopoverGroup className='hidden lg:ml-8 lg:block lg:self-stretch'>
                    <div className='flex h-full space-x-8'>
                        {navigation.categories.map((category) => (
                            <NavLink key={category.id} to={category.id} className={`relative z-10 -mb-px flex items-center pt-px text-sm font-bold transition-colors duration-200 ease-out hover:}`}>
                                {category.name}
                            </NavLink>
                        ))}
                    </div>
                </PopoverGroup>

                {/* Search */}

                <div className='flex ml-auto w-auto md:w-96  '>
                    <SearchInput />
                </div>

              <UserSection/>
            </div>
        </div>
    </nav>
</header>
  )
}
