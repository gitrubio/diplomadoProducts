import useAuth from "@/hooks/useAuth"
import useUserSession from "@/store/store"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { ClockIcon, ComputerDesktopIcon } from "@heroicons/react/16/solid"
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"
import { FaSignOutAlt } from "react-icons/fa"
import { NavLink } from "react-router-dom"

interface UserProfileProps {
    username: string
    userEmail: string
}
export default function UserProfile({ username, userEmail }: UserProfileProps) {
    const {admin} = useUserSession()
    const {Logout} = useAuth()

    return (
        <Menu as="div" className="relative inline-block text-left  ml-2 p-2">
            <MenuButton className="">
                <div className="flex items-center gap-2 ">
                    <div className=" relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-white rounded-full dark:bg-gray-600">
                        <span className="font-bold  dark:text-gray-300 text-[#3B6F00] ">{username.charAt(0).toUpperCase() + username.charAt(1).toUpperCase() }</span>
                    </div>
                    <div className="hidden md:flex flex-col items-start font-bold dark:text-white">
                        <div>{username}</div>
                      
                    </div>
                </div>
            </MenuButton>
            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="">
                    {admin &&  
                    <MenuItem>
                        <NavLink
                            to={"/dashboard"}
                            className="flex px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                            
                    <ComputerDesktopIcon className="h-5 w-5 mr-2" />
                            Dashboard
                        </NavLink>
                    </MenuItem>}
                    <MenuItem>
                        <a
                            href="#"
                            className="flex px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                            
                    <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                            Account settings
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <NavLink
                            to={"/history"}
                            className="flex px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                            
                    <ClockIcon className="h-5 w-5 mr-2" />
                    history
                        </NavLink>
                    </MenuItem>
                  
                 
                        <MenuItem>
                            <button
                            onClick={Logout}
                                type="submit"
                                className="  items-center block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 "
                            >
                                <FaSignOutAlt className="inline-block mr-2" />
                                Sign out
                            </button>
                        </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    )
}
