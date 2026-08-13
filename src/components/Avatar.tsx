import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useLogoutMutation } from '../store/rtk/auth.api';
import { useAppSelector } from '../store/hooks';
import { Fragment } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'

const Avatar = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);

    const [logout] = useLogoutMutation();
    const handleLogoutClick = async () => {
        try {
            await logout().unwrap();
            navigate('/auth');
        } catch (error) {
            toast.error('Server Error');
            console.error(error);
        }
    }

    const handleCopy = () => {
        toast.success("Link Copied");
        navigator.clipboard.writeText(`${window.location?.host}/#/shared-notes/${user?._id}`)
    }


    return (
        <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="outline-none">
                <div className="flex">
                    <div className="flex relative rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11 border-2 border-indigo-800">
                        {/* <img
                             src={user?.auxilary ? user?.auxilary : user?.picture ? `${backendHost}${user?.picture}` : '/images/placeholder.jpg'}
                             alt="Avatar"
                         /> */}
                    </div>
                    <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
                </div>
            </MenuButton>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div className="px-1 py-1 ">
                        <MenuItem>
                            <button onClick={handleCopy} type='button' className={'outline-none hover:font-semibold w-full py-1 text-start px-4 focus:font-normal'}>
                                Copy Share Link
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button onClick={handleCopy} type='button' className={'outline-none hover:font-semibold w-full py-1 text-start px-4 focus:font-normal'}>
                                Update Profile
                            </button>
                        </MenuItem>
                    </div>
                    <div className="px-1 py-1">
                        <MenuItem>
                            <button onClick={handleLogoutClick} className='outline-none w-full py-1 text-start px-4 transition-all hover:transition-all hover:text-red-800 hover:font-semibold' type="button">
                                Logout
                            </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </Transition>
        </Menu>
    );
}

export default Avatar;
