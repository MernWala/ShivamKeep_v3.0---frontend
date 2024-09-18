import axios from 'axios';
import React, { useContext } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import GenralContext from '../context/GenralContext'
import EditProfileOffCanvas from './EditProfileOffCanvas';
import ShareButton from './ShareButton';

const Avatar = () => {

    const navigate = useNavigate()
    let { backendHost, userDetails, editProfile, setEditProfile } = useContext(GenralContext)

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
        <>
            <EditProfileOffCanvas show={editProfile?.show} setState={setEditProfile} />
            <Dropdown>
                <Dropdown.Toggle variant='' id="avatar-dropdown" className='tw-leading-[0] p-0'>
                    <div className="tw-relative">
                        <div className="tw-relative tw-inline-block tw-rounded-full tw-overflow-hidden tw-h-9 tw-w-9 md:tw-h-11 md:tw-w-11 tw-border-2 tw-border-indigo-800">
                            <img
                                src={userDetails?.auxilary ? userDetails?.auxilary : userDetails?.picture ? `${backendHost}${userDetails?.picture}` : '/images/placeholder.jpg'}
                                alt="Avatar"
                            />
                        </div>
                        <span className="tw-absolute tw-block tw-rounded-full tw-bg-green-500 tw-ring-2 tw-ring-white tw-top-0 tw-right-0 tw-h-2 tw-w-2 md:tw-h-3 md:tw-w-3" />
                    </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className='p-0 overflow-hidden'>
                    <div className='tw-bg-indigo-900 tw-select-none'>
                        <span className='tw-px-2 tw-py-1 text-truncate tw-block tw-max-w-40 tw-text-neutral-50'>
                            Welcome <span className="tw-font-semibold"> {userDetails?.name} </span>
                        </span>
                    </div>
                    <div>
                        <ShareButton />
                    </div>
                    <div className='p-0' onClick={() => { setEditProfile({ show: true }) }}>
                        <button className='tw-outline-none hover:tw-font-semibold tw-w-full py-1 tw-text-start tw-px-4' type="button">Edit Profile</button>
                    </div>
                    <div>
                        <button onClick={handleLogout} className='tw-outline-none tw-w-full py-1 tw-text-start tw-px-4 tw-transition-all hover:tw-transition-all hover:tw-text-red-800 hover:tw-font-semibold' type="button">Logout</button>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}

export default Avatar;
