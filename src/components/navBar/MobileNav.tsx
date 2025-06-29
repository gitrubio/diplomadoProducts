import { Categoires } from '@/types/nav.types'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import SearchInput from '../ui/SearchInput'

interface MobileNavProps {
    open: boolean
    setOpen: (value: boolean) => void
    navigation: {
        categories: Categoires[]
    }
}
export default function MobileNav({open,setOpen,navigation} : MobileNavProps) {
  return (
    <Dialog open={open} onClose={setOpen} className='relative z-40 lg:hidden'>
    <DialogBackdrop
        transition
        className='fixed inset-0 bg-[#131921] bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0'
    />

    <div className='fixed inset-0 z-40 flex text-white'>
        <DialogPanel
            transition
            className='relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-[#131921] pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full'
        >
            <div className='flex px-4 pb-2 pt-5'>
                <button
                    type='button'
                    onClick={() => setOpen(false)}
                    className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 '
                >
                    <span className='absolute -inset-0.5' />
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon aria-hidden='true' className='h-6 w-6' />
                </button>
            </div>

            {/* Search for mobile */}
            <div className='px-4 py-4'>
                <SearchInput />
            </div>

            {/* Navigation Links */}
            <div className='mt-2'>
                <div className='border-b border-white'>
                    <div className='flex flex-col'>
                        {navigation.categories.map((category) => (
                            <NavLink
                                key={category.id}
                                to={category.id}
                                onClick={() => setOpen(false)}
                                className='border-b border-white py-4 px-4 text-base font-medium hover:bg-gray-800 transition-colors'
                            >
                                {category.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </DialogPanel>
    </div>
</Dialog>)
}
