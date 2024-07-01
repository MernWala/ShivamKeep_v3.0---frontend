import axios from 'axios';
import React, { useContext } from 'react'
import { NavLink } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import GenralContext from '../context/GenralContext'

const Avatar = ({ user }) => {

    const navigate = useNavigate()
    let { backendHost } = useContext(GenralContext)

    const handleLogout = async () => {
        try {

            let response = await axios.post(`${backendHost}/api/auth/logout`, {}, {
                withCredentials: true
            })

            if (response?.status === 200) {
                toast.success("Logout Success")
                navigate('/')
            }

        } catch (error) {
            toast.error("Server Error")
            console.error(error)
        }
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant='' id="avatar-dropdown">
                <div className="tw-relative">
                    <div className="tw-relative tw-inline-block tw-rounded-full tw-overflow-hidden tw-h-9 tw-w-9 md:tw-h-11 md:tw-w-11 tw-border-2 tw-border-indigo-800">
                        <img src={user || '/images/placeholder.jpg'} alt="Avatar" />
                    </div>
                    <span className="tw-absolute tw-block tw-rounded-full tw-bg-green-500 tw-ring-2 tw-ring-white tw-top-0 tw-right-0 tw-h-2 tw-w-2 md:tw-h-3 md:tw-w-3" />
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className='p-0 overflow-hidden'>
                <NavLink className='p-0' >
                    <button className='tw-w-full py-1 tw-text-start tw-px-4' type="button">Edit Profile</button>
                </NavLink>
                <div>
                    <button onClick={handleLogout} className='tw-w-full py-1 tw-text-start tw-px-4 tw-transition-all hover:tw-transition-all hover:tw-bg-red-800 hover:tw-text-neutral-50' type="button">Logout</button>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default Avatar;
