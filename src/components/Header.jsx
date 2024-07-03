import React, { useContext } from 'react'
import { FaNoteSticky } from "react-icons/fa6";
import Avatar from './Avatar';
import { NavLink } from 'react-router-dom'
import ShareButton from './ShareButton';
import GenralContext from '../context/GenralContext';

const Header = ({

    shareMode = false,
    sharedModeUser

}) => {

    const { userDetails } = useContext(GenralContext)

    return (
        <header className="tw-text-gray-600 tw-body-font tw-border-b tw-shadow-sm tw-bg-neutral-50 tw-sticky tw-top-0 tw-z-10">
            <div className="tw-mx-auto tw-flex tw-flex-wrap tw-py-3 tw-px-5 tw-items-center">
                <NavLink to="/post-login" className="tw-flex tw-title-font tw-font-medium tw-items-center tw-text-gray-900">
                    <FaNoteSticky size={35} className='tw-text-indigo-900' />
                    <span className="tw-select-none tw-ml-2 tw-text-2xl tw-font-bold tw-text-indigo-800">Shivam Keep</span>
                </NavLink>

                <div className="tw-ml-auto tw-flex tw-items-center tw-gap-1">
                    {shareMode && sharedModeUser ?
                        <div className={'tw-rounded-full tw-flex tw-items-center tw-outline-none'}>
                            <span className={'tw-mx-1 tw-outline-none focus:tw-ring-2 tw-ring-indigo-600 tw-bg-indigo-900 tw-px-4 tw-py-2 tw-rounded-full tw-font-semibold tw-text-neutral-50 tw-flex tw-items-center gap-1'}>
                                {sharedModeUser?.name}'s Notes
                            </span>
                        </div>
                        :
                        <div className={'tw-rounded-full tw-flex tw-items-center tw-outline-none'}>
                            <ShareButton />
                            <Avatar />
                        </div>
                    }
                </div>
            </div>
        </header >
    )
}

export default Header