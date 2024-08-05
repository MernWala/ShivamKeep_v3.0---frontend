import React, { useContext, useState, useRef } from 'react'
import { Offcanvas } from 'react-bootstrap'
import GenralContext from '../context/GenralContext'
import { MdEdit } from 'react-icons/md'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const EditProfileOffCanvas = ({

    show, setState

}) => {

    const { userDetails, backendHost, setUserDetails } = useContext(GenralContext)
    const ImgTag = useRef("")

    const [nameData, setNameData] = useState(userDetails?.name)

    const handleEditProfile = async (e) => {
        e.preventDefault();

        try {

            if (nameData !== userDetails?.name) {
                let nameResponse = await axios.post(`${backendHost}/api/auth/update-name`, {
                    name: nameData,
                    _id: userDetails?._id
                }, {
                    withCredentials: true
                })

                setUserDetails({ ...userDetails, name: nameResponse?.name })
                setNameData(undefined)
            }

        } catch (error) {

            if (error?.response?.status === 400) {
                console.error(error);
                toast.error(error?.response?.data)
            }

            console.error(error);
        }

    }

    const handleImageChange = async (e) => {
        try {

            const file = e.target.files[0];
            setUserDetails({
                ...userDetails,
                auxilary: URL.createObjectURL(file),
            })

            const formData = new FormData();
            formData.append('avatar', file);

            let imgResponse = await axios.post(`${backendHost}/api/auth/update-profile?id=${userDetails?._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            if (imgResponse?.status === 200) {
                toast.success("Profile Updated")
            }

        } catch (error) {
            toast.error("Profile update failed")
            console.error(error);
        }
    };


    return (
        <>
            <Offcanvas show={show} onHide={() => { setState({}) }} placement={'end'} backdropClassName='tw-backdrop-blur-sm'>
                <Offcanvas.Header closeButton className='tw-bg-gray-800 tw-border-b tw-border-white'>
                    <Offcanvas.Title className={'text-white'}>
                        <span className="tw-flex tw-items-center tw-gap-1">Welcome, <span className={`tw-max-w-52 text-truncate tw-block`}>{userDetails?.name}</span></span>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='tw-bg-gray-800 tw-text-white'>
                    <form onSubmit={handleEditProfile}>
                        <div className="tw-space-y-5 tw-mt-4">
                            <div className='tw-flex tw-justify-center tw-items-center'>
                                <div className={`tw-w-40 tw-h-40 tw-rounded-full tw-relative`}>
                                    <img
                                        src={userDetails?.auxilary ? userDetails?.auxilary : userDetails?.picture ? `${backendHost}${userDetails?.picture}` : '/images/placeholder.jpg'}
                                        alt=""
                                        className='tw-relative tw-z-[0] tw-rounded-full tw-border-4 tw-border-neutral-50 tw-w-40 tw-h-40 tw-object-cover' ref={ImgTag}
                                    />
                                    <div className='tw-absolute tw-bottom-[.5rem] tw-right-[.5rem] tw-z-[1] tw-border-4 tw-border-gray-800 tw-rounded-full tw-flex tw-items-center tw-justify-center'>
                                        <input
                                            hidden
                                            type="file"
                                            id='input_img'
                                            accept='image/*'
                                            name="picture"
                                            onChange={(e) => { handleImageChange(e) }}
                                        />
                                        <label htmlFor="input_img" className='tw-bg-indigo-800 tw-leading-none tw-p-[.3rem] tw-rounded-full tw-w-full tw-h-full tw-border-0 tw-cursor-pointer'>
                                            <MdEdit />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='tw-block'>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 tw-border tw-border-gray-300 tw-text-gray-900 tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
                                        placeholder="Sample Name"
                                        value={userDetails?.email}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div>
                                <div className='tw-block'>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 tw-border tw-border-gray-300 tw-text-gray-900 tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
                                        placeholder="Sample Name"
                                        defaultValue={userDetails?.name}
                                        onChange={(e) => { setNameData(e.target.value) }}
                                    />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className={`tw-w-full tw-text-white tw-bg-primary-600 tw-hover:bg-primary-700 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-primary-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center dark:tw-bg-primary-600 dark:tw-hover:bg-primary-700 dark:focus:tw-ring-primary-800`}>
                                    Update Details
                                </button>
                            </div>
                        </div>
                    </form>
                </Offcanvas.Body>
            </Offcanvas >
        </>
    )
}

export default EditProfileOffCanvas