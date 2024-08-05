import React, { useContext, useState } from 'react'
import { Loader } from '../../components/BootstrapModals'
import { Spinner } from 'react-bootstrap'
import GenralContext from '../../context/GenralContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Page = () => {

    let navigate = useNavigate()

    const { registrationTempState, backendHost, isForgotPassword } = useContext(GenralContext)

    const [formProcess, setFormProcess] = useState(false)
    const [formState, setFormState] = useState('')
    const [otpState, setOtpState] = useState()

    const [otpDetails, setOtpDetails] = useState()

    const [formData, setFormData] = useState("")
    const [formResponse, setFormResponse] = useState()
    const handleSendOTP = async (e) => {
        e.preventDefault();

        try {

            setOtpState('Sending OTP')

            let response = await axios.post(`${backendHost}/api/auth/send-otp/`, {
                email: registrationTempState ?? formData
            })

            if (response?.status === 201) {
                setOtpDetails(true)
                setFormResponse(response?.data)
                toast.success("OTP send success. OTP expire after 5 min")
            }

        } catch (error) {

            if (error?.response?.status === 400) {
                toast.error(error?.response?.data)
            } else {
                toast.error("Somthing went wrong")
            }

        } finally {
            setFormProcess(false)
            setOtpState()
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {

            setFormProcess(true);
            setFormState('Verifying OTP ...')

            let response = await axios.post(`${backendHost}/api/auth/match-otp/`, {
                otp: formData * 1,
                _id: formResponse
            }, { withCredentials: true })

            if (response?.status === 200) {
                setOtpDetails(true)
                toast.success("Account verified")
            }

            // after verifing OTP
            setFormState('Redirecting you to workspace ...')

            setTimeout(() => {
                navigate('/post-login')
            }, 1500);

        } catch (error) {

            setFormProcess(false);
            if (error?.response?.status === 400) {
                setOtpDetails(false)
                toast.error(error?.response?.data)
            } else {
                toast.error("Somthing went wrong")
            }

        } finally {

        }
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault()

        try {

            setOtpState('Sending Mail')

            let response = await axios.post(`${backendHost}/api/recover`, {
                email: formData,
                url: `http://localhost:3000/#/account/change-password`
            })

            if (response?.status === 201) {
                toast.success("Check mail for password reset link")
                setFormData()
            }

        } catch (error) {

            if (error?.response?.status === 400) {
                toast.error(error?.response?.data)
            } else {
                toast.error("Somthing went wrong")
            }

            console.error(error);
        } finally {

            setTimeout(() => {
                setOtpState()
            }, 300);

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
                        <form className={`tw-p-6 tw-space-y-5 md:tw-space-y-7 sm:tw-p-8 ${otpDetails && 'pb-0'}`} onSubmit={isForgotPassword === true ? handleForgotPassword : handleSendOTP}>
                            <div className='tw-space-y-2 md:tw-space-y-3'>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 tw-border tw-border-gray-300 tw-text-gray-900 tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
                                        placeholder="name@company.com"
                                        defaultValue={registrationTempState ?? ''}
                                        onChange={(e) => { setFormData(e.target.value) }}
                                    />
                                </div>
                                <div className={otpDetails ? 'tw-hidden' : 'tw-block'}>
                                    <button type="submit" className="tw-w-full tw-text-white tw-bg-primary-600 tw-hover:bg-primary-700 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-primary-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center dark:tw-bg-primary-600 dark:tw-hover:bg-primary-700 dark:focus:tw-ring-primary-800" disabled={formProcess}>
                                        {otpState?.length > 0 ?
                                            <span className='tw-flex tw-items-center tw-gap-2 tw-justify-center'>
                                                <Spinner animation="border" variant="light" size='sm' /> {otpState}
                                            </span>
                                            :
                                            <span>Submit</span>
                                        }
                                    </button>
                                </div>
                            </div>
                        </form>
                        <form className={`tw-p-6 tw-pt-3 sm:tw-pt-4 tw-space-y-5 md:tw-space-y-7 sm:tw-p-8 ${otpDetails ? 'tw-block' : 'tw-hidden'}`} onSubmit={handleFormSubmit}>
                            <div className='tw-space-y-2 md:tw-space-y-4'>
                                <div>
                                    <input
                                        type="number"
                                        name="text"
                                        id="text"
                                        className="no-spinner tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 tw-border tw-border-gray-300 tw-text-gray-900 tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500 "
                                        placeholder="OTP - X X X X"
                                        onChange={(e) => { setFormData(e.target.value) }}
                                    />
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