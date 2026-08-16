import React, { Fragment, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { MdEditSquare } from 'react-icons/md';
import { useLogoutMutation, useUpdateProfileMutation } from '../store/rtk/auth.api';
import { useAppSelector } from '../store/hooks';
import { BaseModal } from './Modals';

const Avatar: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);
    const [logout] = useLogoutMutation();
    const [updateProfile] = useUpdateProfileMutation();

    const [updateProfileModal, setUpdateProfileModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const closeUpdateProfileModal = () => setUpdateProfileModal(false);

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
        toast.success('Link Copied');
        navigator.clipboard.writeText(`${window.location?.host}/#/shared-notes/${user?._id}`);
    };

    // Helper to safely format avatar sources (Buffer byte arrays, base64 strings, or static URLs)
    const getAvatarSrc = (): string => {
        if (!user?.picture) return '/placeholder.jpg';

        // 1. Convert Buffer JSON structure { type: 'Buffer', data: number[] } to valid Base64
        if (typeof user.picture === 'object' && Array.isArray(user.picture.data)) {
            const bytes = new Uint8Array(user.picture.data);

            // Safe chunked conversion to prevent call stack overflow on large buffers
            let binaryStr = '';
            const chunkSize = 0x8000; // 32KB chunks
            for (let i = 0; i < bytes.length; i += chunkSize) {
                binaryStr += String.fromCharCode.apply(
                    null,
                    bytes.subarray(i, i + chunkSize) as unknown as number[]
                );
            }

            return `data:image/png;base64,${btoa(binaryStr)}`;
        }

        // 2. Format pure string payloads
        if (typeof user.picture === 'string') {
            if (user.picture.startsWith('data:') || user.picture.startsWith('http')) {
                return user.picture;
            }
            return `data:image/png;base64,${user.picture}`;
        }

        return '/placeholder.jpg';
    };

    // Canvas Crop (60x60 centered) with memory cleanup
    const processAndCropImage = (file: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const objectUrl = URL.createObjectURL(file);

            img.src = objectUrl;

            img.onload = () => {
                URL.revokeObjectURL(objectUrl); // Free up browser memory

                const canvas = document.createElement('canvas');
                canvas.width = 60;
                canvas.height = 60;
                const ctx = canvas.getContext('2d');

                if (!ctx) return reject('Could not initialize canvas context');

                const minDimension = Math.min(img.width, img.height);
                const sourceX = (img.width - minDimension) / 2;
                const sourceY = (img.height - minDimension) / 2;

                ctx.drawImage(
                    img,
                    sourceX, sourceY, minDimension, minDimension,
                    0, 0, 60, 60
                );

                canvas.toBlob((blob) => {
                    if (blob) resolve(blob);
                    else reject('Canvas to blob conversion failed');
                }, 'image/png');
            };

            img.onerror = (err) => {
                URL.revokeObjectURL(objectUrl);
                reject(err);
            };
        });
    };

    // File Selection Handler
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setLoading(true);
            const croppedBlob = await processAndCropImage(file);

            const result = await updateProfile(croppedBlob).unwrap();

            if (result?.status === 200) {
                toast.success('Profile picture updated!');
                closeUpdateProfileModal();
            } else {
                throw new Error(result?.error || 'Upload failed');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update picture');
        } finally {
            setLoading(false);
            e.target.value = ''; // Reset file input value to allow re-selection
        }
    };

    return (
        <React.Fragment>
            <BaseModal
                title="Update Profile"
                close={closeUpdateProfileModal}
                show={updateProfileModal}
                key="updateProfileModal"
            >
                <div className="bg-white p-3">
                    <div className="flex p-3 rounded-full bg-indigo-100 gap-3 items-center">
                        <div className="w-14 h-14 rounded-full ring-2 ring-white shadow-sm relative flex-shrink-0">
                            <img
                                src={getAvatarSrc()}
                                alt="Avatar"
                                className="w-full h-full object-cover z-0 rounded-full"
                            />
                            <input
                                type="file"
                                name="profile"
                                id="profile"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={loading}
                                hidden
                            />
                            <label
                                htmlFor="profile"
                                className={`absolute bg-white right-0 bottom-0 text-indigo-700 z-[1] rounded-full p-1 shadow-md ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                    }`}
                            >
                                <MdEditSquare />
                            </label>
                        </div>
                        <div>
                            <p className="text-xl font-bold text-indigo-800 mb-1">{user?.name}</p>
                            <p className="text-xs text-indigo-400 italic">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </BaseModal>

            <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="outline-none">
                    <div className="flex">
                        <div className="flex relative rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11 border-2 border-indigo-800">
                            <img
                                src={getAvatarSrc()}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
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
                    <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none overflow-hidden z-50">
                        <div className="p-1 bg-indigo-800">
                            <p className="py-1 px-3 text-white font-medium truncate mb-0">
                                Welcome, {user?.name}
                            </p>
                        </div>
                        <div className="px-1 py-1">
                            <MenuItem>
                                <button
                                    onClick={handleCopy}
                                    type="button"
                                    className="outline-none hover:font-semibold w-full py-1 text-start px-4 focus:font-normal"
                                >
                                    Copy Share Link
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button
                                    onClick={() => setUpdateProfileModal(true)}
                                    type="button"
                                    className="outline-none hover:font-semibold w-full py-1 text-start px-4 focus:font-normal"
                                >
                                    Update Profile
                                </button>
                            </MenuItem>
                        </div>
                        <div className="px-1 py-1">
                            <MenuItem>
                                <button
                                    onClick={handleLogoutClick}
                                    className="outline-none w-full py-1 text-start px-4 transition-all hover:transition-all hover:text-red-800 hover:font-semibold"
                                    type="button"
                                >
                                    Logout
                                </button>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </Transition>
            </Menu>
        </React.Fragment>
    );
};

export default Avatar;