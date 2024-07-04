import React, { useContext, useState } from 'react'
import { Loader } from '../../components/BootstrapModals'
import { RiEyeCloseFill, RiEyeFill } from 'react-icons/ri'
import axios from 'axios'
import GenralContext from '../../context/GenralContext'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

const Page = () => {

    const { backendHost, handleOnChange } = useContext(GenralContext)

    const [formProcess, setFormProcess] = useState(false)
    const [formState, setFormState] = useState('')
    const [passEye, setPassEye] = useState(true)

    let location = useLocation()
    let navigate = useNavigate()

    const [formData, setFormData] = useState({})
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {

            setFormProcess(true);
            setFormState('Updating password ...')

            if (formData?.pass !== formData?.rePass) {
                toast.error("Password not matched")
                return;
            }

            let response = await axios.post(`${backendHost}/api/recover/change-pass`, {
                token: location.search.slice(7),
                password: formData?.pass
            }, { withCredentials: true })

            if (response?.status === 200) {
                toast.success("Password Changed")
                navigate('/')
            }

        } catch (error) {

            if (error?.response?.status === 400) {
                toast.error(error?.response?.data)
            } else {
                toast.error("Somthing went wrong")
            }

        } finally {
            setFormProcess(false)
            setFormState()
        }
    }

    return (
        <>
            <section className={`tw-bg-gray-50 dark:tw-bg-gray-900 tw-min-h-[100vh]`}>
                <Loader show={formProcess} text={formState} />
                <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-px-6 tw-py-8 tw-mx-auto md:tw-h-screen lg:tw-py-0">
                    <div className="tw-w-full tw-rounded-lg tw-shadow dark:tw-border md:tw-mt-0 sm:tw-max-w-md tw-xl:p-0 dark:tw-bg-gray-800 dark:tw-border-gray-700">
                        <form className="tw-p-6 tw-space-y-4 md:tw-space-y-6 sm:tw-p-8" onSubmit={handleFormSubmit}>
                            <div>
                                <h1 className="tw-text-xl tw-font-semibold tw-leading-tight tw-text-gray-900 md:tw-text-2xl dark:tw-text-white tw-tracking-wider">Change password</h1>
                            </div>
                            <div className='tw-relative tw-flex tw-items-center tw-justify-end'>
                                <input
                                    type={passEye === true ? 'password' : 'text'}
                                    name="pass"
                                    id="password"
                                    placeholder="••••••••"
                                    className="tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 tw-border tw-border-gray-300 tw-text-gray-900 tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
                                    onChange={(e) => { handleOnChange(e, formData, setFormData) }}
                                    autoComplete="true"
                                />
                                <button type="button" className='tw-absolute tw-px-3 tw-h-full tw-text-xl tw-outline-none tw-text-neutral-400 focus:tw-text-neutral-50' onClick={() => { setPassEye(!passEye) }} disabled={formProcess}>
                                    {passEye === true ?
                                        <RiEyeCloseFill />
                                        :
                                        <RiEyeFill />
                                    }
                                </button>
                            </div>
                            <div className='tw-relative tw-flex tw-items-center tw-justify-end'>
                                <input
                                    type='password'
                                    name="rePass"
                                    id="repassword"
                                    placeholder="••••••••"
                                    className="tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 tw-border tw-border-gray-300 tw-text-gray-900 tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
                                    onChange={(e) => { handleOnChange(e, formData, setFormData) }}
                                    autoComplete="true"
                                />
                            </div>
                            <div>
                                <button type="submit" className="tw-w-full tw-text-white tw-bg-primary-600 tw-hover:bg-primary-700 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-primary-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center dark:tw-bg-primary-600 dark:tw-hover:bg-primary-700 dark:focus:tw-ring-primary-800" disabled={formProcess}>Change Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Page