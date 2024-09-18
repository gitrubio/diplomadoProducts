import { Categoires } from '@/types/nav.types'
import { Dialog, DialogBackdrop, DialogPanel, Tab, TabGroup, TabList } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'


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
        className='fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0'
    />

    <div className='fixed inset-0 z-40 flex'>
        <DialogPanel
            transition
            className='relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full'
        >
            <div className='flex px-4 pb-2 pt-5'>
                <button
                    type='button'
                    onClick={() => setOpen(false)}
                    className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'
                >
                    <span className='absolute -inset-0.5' />
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon aria-hidden='true' className='h-6 w-6' />
                </button>
            </div>

            {/* Links */}
            <TabGroup className='mt-2'>
                <div className='border-b border-gray-200'>
                    <TabList className='-mb-px flex flex-col   '>
                        {navigation.categories.map((category) => (
                            <Tab
                                key={category.name}
                                className='flex-1 border-b-2 border-transparent  py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600'
                            >
                                {category.name}
                            </Tab>
                        ))}
                    </TabList>
                </div>
            </TabGroup>
        </DialogPanel>
    </div>
</Dialog>)
}
