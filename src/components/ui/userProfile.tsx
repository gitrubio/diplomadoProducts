import useAuht from "@/hooks/useAuth"
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
    const {Logout} = useAuht()

    return (
        <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="">
                <div className=" hidden sm:flex items-center gap-4 pl-5">
                    <div className=" relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <span className="font-medium text-gray-600 dark:text-gray-300 text-primary-400 ">{username.charAt(0) + username.charAt(1)}</span>
                    </div>
                    <div className="flex flex-col items-start font-medium dark:text-white">
                        <div>{username}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{userEmail}</div>
                    </div>
                </div>
            </MenuButton>
            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
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
                                className=" text-red-500 flex items-center block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 "
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
