import React, { useState } from 'react';
import { RiEyeCloseFill, RiEyeFill } from 'react-icons/ri';
import { useResetPasswordMutation } from '../store/rtk/auth.api';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';

const isFetchBaseQueryError = (error: unknown): error is { status: number; data?: unknown } => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        typeof (error as { status: unknown }).status === 'number'
    );
};

export function Recovery() {
    const [passEye, setPassEye] = useState<boolean>(false);
    const [formData, setFormData] = useState<{ pass: string, rePass: string }>({ pass: "", rePass: "" });
    const [formProcess, setFormProcess] = useState<boolean>(false);
    const [resetPassword] = useResetPasswordMutation();
    const { token } = useParams();
    const navigate = useNavigate();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (formData?.pass !== formData?.rePass) {
                toast.error("Passowrd not matched");
            } else {
                setFormProcess(true);
                const response = await resetPassword({
                    newPassowrd: formData?.rePass,
                    recoveryToken: token ?? "",
                }).unwrap();

                if (response?.status === 200 && response?.data?.message) {
                    toast.success(response?.data?.message);
                    toast.success("Redirecting to login");
                    navigate("/auth");
                }
            }
        } catch (error: unknown) {
            if (isFetchBaseQueryError(error)) {
                if (error.status === 400) {
                    toast.error('Token expired, try again');
                } else if (
                    typeof error.data === 'object' &&
                    error.data !== null &&
                    'message' in error.data &&
                    typeof (error.data as { message?: unknown }).message === 'string'
                ) {
                    toast.error((error.data as { message: string }).message);
                } else {
                    toast.error('Something went wrong, try after sometime!');
                }
            } else if (error instanceof Error) {
                toast.error(error.message || 'Something went wrong, try after sometime!');
            } else {
                toast.error('Something went wrong, try after sometime!');
            }
        } finally {
            setFormProcess(false);
        }
    };

    return (
        <section className="bg-gray-50 content-center dark:bg-gray-900 min-h-[100vh]">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full">
                <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Enter New Password
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Password </label>
                                <div className="relative flex items-center justify-end">
                                    <input type={passEye ? 'password' : 'text'} name="pass" id="password" value={formData.pass} placeholder="••••••••" className="bg-gray-50 focus:outline-none focus:ring-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autoComplete="on" onChange={handleOnChange} />
                                    <button type="button" className="absolute px-3 h-full text-xl outline-none text-neutral-400 focus:text-neutral-50" onClick={() => setPassEye((prev) => !prev)} disabled={formProcess}>
                                        {passEye ? <RiEyeCloseFill /> : <RiEyeFill />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Re-enter Password </label>
                                <div className="relative flex items-center justify-end">
                                    <input type={'password'} name="rePass" id="password" value={formData.rePass} placeholder="••••••••" className="bg-gray-50 focus:outline-none focus:ring-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autoComplete="on" onChange={handleOnChange} />
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" disabled={formProcess}>
                                Update Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
