import React, { useState } from 'react'
import { Loader } from '../../components/BootstrapModals'
import { Spinner } from 'react-bootstrap'

const Page = () => {

    const [formProcess, setFormProcess] = useState(false)
    const [formState, setFormState] = useState('')
    const [otpState, setOtpState] = useState()

    const [otpDetails, setOtpDetails] = useState()
    const handleSendOTP = (e) => {
        e.preventDefault();
        try {

            setOtpState('Sending OTP')

            // TODO - API call for sending OTP

            setTimeout(() => {
                setOtpDetails(1234);
            }, 3000);

        } catch (error) {

        } finally {

        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        try {

            setFormProcess(true);
            setFormState('Verifying OTP ...')

            // TODO - API call for verifying OTP || Server provide token for reset password

            // after verifing OTP
            setFormState('Redirecting for password change ...')

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
                        <div className='tw-p-6 sm:tw-p-8 pb-0'>
                            <h1 className="tw-text-xl tw-mb-0 tw-font-semibold tw-leading-tight tw-text-gray-900 md:tw-text-2xl dark:tw-text-white tw-tracking-wider">Enter your email</h1>
                        </div>
                        <form className={`tw-p-6 tw-space-y-5 md:tw-space-y-7 sm:tw-p-8 ${otpDetails && 'pb-0'}`} onSubmit={handleSendOTP}>
                            <div className='tw-space-y-2 md:tw-space-y-3'>
                                <div>
                                    <input type="email" name="email" id="email" className="tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 tw-border tw-border-gray-300 tw-text-gray-900 tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500" placeholder="name@company.com" />
                                </div>
                                <div className={otpDetails ? 'tw-hidden' : 'tw-block'}>
                                    <button type="submit" className="tw-w-full tw-text-white tw-bg-primary-600 tw-hover:bg-primary-700 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-primary-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center dark:tw-bg-primary-600 dark:tw-hover:bg-primary-700 dark:focus:tw-ring-primary-800" disabled={formProcess}>
                                        {otpState ?
                                            <span className='tw-flex tw-items-center tw-gap-2 tw-justify-center'>
                                                <Spinner animation="border" variant="light" size='sm' /> {otpState}
                                            </span>
                                            :
                                            <span>Send OTP</span>
                                        }
                                    </button>
                                </div>
                            </div>
                        </form>
                        <form className={`tw-p-6 tw-pt-3 sm:tw-pt-4 tw-space-y-5 md:tw-space-y-7 sm:tw-p-8 ${otpDetails ? 'tw-block' : 'tw-hidden'}`} onSubmit={handleFormSubmit}>
                            <div className='tw-space-y-2 md:tw-space-y-4'>
                                <div>
                                    <input type="number" name="email" id="email" className="no-spinner tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 tw-border tw-border-gray-300 tw-text-gray-900 tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500 " placeholder="OTP - X X X X" />
                                </div>
                                <div>
                                    <button type="submit" className="tw-w-full tw-text-white tw-bg-primary-600 tw-hover:bg-primary-700 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-primary-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center dark:tw-bg-primary-600 dark:tw-hover:bg-primary-700 dark:focus:tw-ring-primary-800" disabled={formProcess}>Verify</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Page