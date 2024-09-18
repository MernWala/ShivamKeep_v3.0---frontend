import React, { useContext, useEffect, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { RiEyeCloseFill, RiEyeFill } from 'react-icons/ri'
import { Loader } from '../components/BootstrapModals'
import axios from 'axios'
import GenralContext from '../context/GenralContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const Auth = () => {

    const navigate = useNavigate()
    const { backendHost, handleOnChange, setRegistrationTempState, setIsForgotPassword } = useContext(GenralContext)

    useEffect(() => {
        (async () => {

            try {
                let response = await axios.post(`${backendHost}/api/auth/get-user`, {}, {
                    withCredentials: true
                })

                if (response.status === 200) {
                    navigate('/post-login')
                }
            } catch (error) {
                console.error(error)
                console.log("Token Not Found");
            }

        })();
    }, [backendHost, navigate])

    const [authType, setAuthType] = useState('LOGIN')
    const toggleAuth = () => {
        if (authType === 'LOGIN') {
            setAuthType('REGISTER')
        } else {
            setAuthType('LOGIN')
        }
    }

    const [passEye, setPassEye] = useState(true)
    const [formProcess, setFormProcess] = useState(false)
    const [formStatus, setFormStatus] = useState('Sign in ...')

    const [formData, setFormData] = useState({})
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            setFormProcess(true)

            setFormStatus(authType === "LOGIN" ? "Sign in ..." : "Registering account ...")

            let response = await axios.post(`${backendHost}/api/auth/manual/${authType === 'LOGIN' ? 'login' : 'register'}`, formData, {
                headers: {
                    'content-type': 'application/json'
                },
                withCredentials: true
            });

            if (response.status === 200) {

                toast.success("Login Success")
                navigate('/post-login')

            } else if (response.status === 201) {
                toast.success("Account registration success")
                setRegistrationTempState(formData?.email)
                navigate(`/account/verify-email?access=VerifyAccount&email=${formData?.email}`)
            } else {
                toast.error("Server Error")
            }

        } catch (error) {
            toast.error(error?.response?.data ?? error?.message)
            setFormProcess(false)

        } finally {
            setTimeout(() => {
                setFormProcess(false)
            }, 1500);
        }
    }

    const handleForgotPassword = () => {
        setIsForgotPassword(true)
        navigate(`/account/verify-email?access=AccountRecovery${formData?.email ? `&email=${formData?.email}` : ''}`)
    }

    return (
        <section className={`tw-bg-gray-50 dark:tw-bg-gray-900 tw-min-h-[100vh] ${authType === 'REGISTER' && 'tw-py-10'}`}>
            <Loader show={formProcess} text={formStatus} />
            <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-px-6 tw-py-8 tw-mx-auto">
                <div className="tw-w-full tw-rounded-lg tw-shadow dark:tw-border md:tw-mt-0 sm:tw-max-w-md tw-xl:p-0 dark:tw-bg-gray-800 dark:tw-border-gray-700">
                    <div className="tw-p-6 tw-space-y-4 md:tw-space-y-6 sm:tw-p-8">
                        <h1 className="tw-text-center tw-text-xl tw-font-bold tw-leading-tight tw-tracking-tight tw-text-gray-900 md:tw-text-2xl dark:tw-text-white">
                            {authType === 'LOGIN' ?
                                'Sign in to your account'
                                :
                                'Create your free account'
                            }
                        </h1>
                        <form className="tw-space-y-4 md:tw-space-y-6" onSubmit={handleFormSubmit}>
                            <div className={authType === 'REGISTER' ? 'tw-block' : 'tw-hidden'}>
                                <label htmlFor="name" className="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 tw-border tw-border-gray-300 tw-text-gray-900 tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
                                    placeholder="Sample Name"
                                    onChange={(e) => { handleOnChange(e, formData, setFormData) }}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 tw-border tw-border-gray-300 tw-text-gray-900 tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
                                    placeholder="name@company.com"
                                    onChange={(e) => { handleOnChange(e, formData, setFormData) }}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Password</label>
                                <div className='tw-relative tw-flex tw-items-center tw-justify-end'>
                                    <input
                                        type={passEye === true ? 'password' : 'text'}
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 tw-border tw-border-gray-300 tw-text-gray-900 tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
                                        autoComplete="on"
                                        onChange={(e) => { handleOnChange(e, formData, setFormData) }}
                                    />
                                    <button type="button" className='tw-absolute tw-px-3 tw-h-full tw-text-xl tw-outline-none tw-text-neutral-400 focus:tw-text-neutral-50' onClick={() => { setPassEye(!passEye) }} disabled={formProcess}>
                                        {passEye === true ?
                                            <RiEyeCloseFill />
                                            :
                                            <RiEyeFill />
                                        }
                                    </button>
                                </div>
                            </div>

                            {authType === 'LOGIN' &&
                                <div className="tw-flex tw-items-center tw-justify-between">
                                    <button
                                        type="button"
                                        className="tw-border tw-border-transparent focus:tw-border-white tw-rounded-[3px] tw-px-3 tw-text-sm tw-font-medium tw-text-primary-600 tw-hover:underline dark:tw-text-primary-500 focus:tw-outline-none"
                                        onClick={handleForgotPassword}
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            }

                            <button type="submit" className={`tw-w-full tw-text-white tw-bg-primary-600 tw-hover:bg-primary-700 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-primary-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center dark:tw-bg-primary-600 dark:tw-hover:bg-primary-700 dark:focus:tw-ring-primary-800`}>
                                {authType === 'LOGIN' ?
                                    <>Sign in</>
                                    :
                                    <>Register</>
                                }
                            </button>

                            <p className="tw-text-sm tw-font-light tw-text-gray-500 dark:tw-text-gray-400 tw-text-center">
                                {authType === 'LOGIN' ?
                                    `Don't have an account yet?`
                                    :
                                    `Already have an account?`
                                }
                                <button type="button" className="focus:tw-outline-none focus:tw-underline focus:tw-border-neutral-50 tw-px-1 tw-border-transparent tw-font-medium tw-text-primary-600 tw-hover:underline dark:tw-text-primary-500" onClick={toggleAuth} disabled={formProcess}>
                                    {authType === 'LOGIN' ?
                                        'Sign up'
                                        :
                                        'Sign in'
                                    }
                                </button>
                            </p>

                            <div className='tw-my-5 tw-flex tw-justify-center tw-items-center tw-gap-2'>
                                <p className='tw-m-0 tw-w-[25%] tw-bg-white tw-border'></p>
                                <span className="tw-text-white tw-text-xs">Or</span>
                                <p className='tw-m-0 tw-w-[25%] tw-bg-white tw-border'></p>
                            </div>

                            <div className='tw-flex tw-flex-wrap'>
                                <div className="md:tw-w-1/2 tw-w-full">
                                    <div className="tw-p-2">
                                        <button type='button' className='tw-capitalize tw-flex tw-gap-1 tw-text-sm tw-items-center tw-justify-center tw-bg-gray-50 focus:tw-outline-none tw-border-2 tw-border-transparent tw-border-gray-300 tw-text-neutral-50 tw-rounded-lg tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 focus:tw-border-primary-600'>
                                            continue with
                                            <FcGoogle className='tw-text-xl' />
                                        </button>
                                    </div>
                                </div>
                                <div className="md:tw-w-1/2 tw-w-full">
                                    <div className="tw-p-2">
                                        <button type='button' className='tw-capitalize tw-flex tw-gap-1 tw-text-sm tw-items-center tw-justify-center tw-bg-gray-50 focus:tw-outline-none tw-border-2 tw-border-transparent tw-border-gray-300 tw-text-neutral-50 tw-rounded-lg tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 focus:tw-border-primary-600'>
                                            continue with
                                            <FaGithub className='tw-text-xl' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Auth