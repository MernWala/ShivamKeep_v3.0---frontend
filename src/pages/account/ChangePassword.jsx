import React, { useState } from 'react'
import { Loader } from '../../components/BootstrapModals'
import { RiEyeCloseFill, RiEyeFill } from 'react-icons/ri'

const Page = () => {

    const [formProcess, setFormProcess] = useState(false)
    const [formState, setFormState] = useState('')

    const [passEye, setPassEye] = useState(true)
    const [rePassEye, setRePassEye] = useState(true)

    const handleFormSubmit = (e) => {
        e.preventDefault();
        try {

            setFormProcess(true);
            setFormState('Updating password ...')

            // TODO - API call for updating account password

        } catch (error) {

        } finally {

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
                                <input type={rePassEye === true ? 'password' : 'text'} name="password" id="password" placeholder="••••••••" className="tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 tw-border tw-border-gray-300 tw-text-gray-900 tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500" autoComplete="on" />
                                <button type="button" className='tw-absolute tw-px-3 tw-h-full tw-text-xl tw-outline-none tw-text-neutral-400 focus:tw-text-neutral-50' onClick={() => { setRePassEye(!rePassEye) }} disabled={formProcess}>
                                    {rePassEye === true ?
                                        <RiEyeCloseFill />
                                        :
                                        <RiEyeFill />
                                    }
                                </button>
                            </div>
                            <div className='tw-relative tw-flex tw-items-center tw-justify-end'>
                                <input type={passEye === true ? 'password' : 'text'} name="re-password" id="repassword" placeholder="••••••••" className="tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 tw-border tw-border-gray-300 tw-text-gray-900 tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500" autoComplete="on" />
                                <button type="button" className='tw-absolute tw-px-3 tw-h-full tw-text-xl tw-outline-none tw-text-neutral-400 focus:tw-text-neutral-50' onClick={() => { setPassEye(!passEye) }} disabled={formProcess}>
                                    {passEye === true ?
                                        <RiEyeCloseFill />
                                        :
                                        <RiEyeFill />
                                    }
                                </button>
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