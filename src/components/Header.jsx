import React, { useState } from 'react'
import { FaNoteSticky } from "react-icons/fa6";
import { MdOutlineNightsStay } from 'react-icons/md';
import { WiDaySunny } from 'react-icons/wi';
import Avatar from './Avatar';
import { NavLink } from 'react-router-dom'

const Header = () => {

    const [theme, setTheme] = useState({
        effect: 'dark'
    })

    const toggleTheme = () => {
        if (theme?.effect === 'light') {
            setTheme({
                effect: 'dark'
            })
        } else {
            setTheme({
                effect: 'light'
            })
        }
    }

    return (
        <header className="tw-text-gray-600 tw-body-font tw-border-b tw-shadow-sm tw-bg-neutral-50 tw-sticky tw-top-0 tw-z-10">
            <div className="tw-mx-auto tw-flex tw-flex-wrap tw-py-3 tw-px-5 tw-items-center">
                <NavLink to="/post-login" className="tw-flex tw-title-font tw-font-medium tw-items-center tw-text-gray-900">
                    <FaNoteSticky size={35} className='tw-text-indigo-900' />
                    <span className="tw-ml-2 tw-text-2xl tw-font-bold tw-text-indigo-800">Shivam Keep</span>
                </NavLink>

                <div className="tw-ml-auto tw-flex tw-items-center tw-gap-1">
                    <div className="tw-bg-indigo-900 tw-p-[11px] tw-rounded-full tw-shadow-md tw-shadow-neutral-100 tw-outline-none" onClick={toggleTheme}>
                        {theme?.effect === 'light' ?
                            <MdOutlineNightsStay size={25} className='tw-text-white' />
                            :
                            <WiDaySunny size={25} className='tw-text-white' />
                        }
                    </div>
                    <div className={'tw-rounded-full tw-flex tw-align-middle tw-outline-none'}>
                        <Avatar user={''} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header