import React, { useEffect, useState } from 'react';
import { RiEyeCloseFill, RiEyeFill } from 'react-icons/ri';
import { useLoginMutation, useLoginWithTokenQuery, useRegisterMutation, useSendRecoveryLinkMutation } from '../store/rtk/auth.api';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { type AuthFormData, resetAuthForm, updateAuthFormField } from '../store/slices/authSlice';
import { useNavigate } from 'react-router';
import { type AuthMode } from '../schemas/interface';
import { Loader } from '../components/Loader';
import { toast } from 'react-hot-toast';

const isFetchBaseQueryError = (error: unknown): error is { status: number; data?: unknown } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as { status: unknown }).status === 'number'
  );
};

export function Auth() {
  const [authType, setAuthType] = useState<AuthMode>('Login');
  const [passEye, setPassEye] = useState(true);
  const [formProcess, setFormProcess] = useState(false);
  const [formStatus, setFormStatus] = useState('Sign in ...');
  const formData = useAppSelector((state) => state.auth.formData);
  const { data: response } = useLoginWithTokenQuery();
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [recover] = useSendRecoveryLinkMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (response?.status === 200) {
      navigate("/app");
    }
  }, [response, navigate])

  const toggleAuth = () => {
    dispatch(resetAuthForm());
    setAuthType((current) => (current === 'Login' ? 'Register' : 'Login'));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateAuthFormField({ field: name as keyof AuthFormData, value }));
  };

  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormProcess(true);
    setFormStatus(authType === 'Login' ? 'Signing in ...' : 'Registering account ...');

    try {
      if (authType === 'Login') {
        const result = await login({ email: formData.email, password: formData.password }).unwrap();
        if (result?.status === 200) {
          toast.success("Login Succeed")
          navigate('/app');
          return;
        } else {
          toast.error("UserId/Password is incorrect");
        }
      } else if (authType === 'Register') {
        const result = await register({ name: formData.name, email: formData.email, password: formData.password }).unwrap();
        if (result?.status === 201) {
          toast.success('Check email for id validation');
          setFormStatus('Registration successful. Check your email for validation.');
          dispatch(resetAuthForm());
          setAuthType('Login');
        }
      } else if (authType === 'Recovery') {
        setFormStatus('Sending recovery link');
        const response = await recover(formData?.email).unwrap();
        if (response?.status === 200 && response?.data?.message) {
          toast.success(response?.data?.message);
        }
      }
    } catch (error: unknown) {
      if (isFetchBaseQueryError(error)) {
        if (error.status === 498) {
          toast.error('UserId/Password is incorrect');
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
      setFormStatus("");
      setAuthType('Login');
    }
  };

  return (
    <section className="bg-gray-50 content-center dark:bg-gray-900 min-h-[100vh]">
      <Loader show={formProcess} text={formStatus} />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {authType === 'Login' ? 'Sign in to your account' : authType === 'Register' ? 'Create your free account' : 'Recover your account'}
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
              <div className={authType === 'Register' ? 'block' : 'hidden'}>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Name </label>
                <input type="text" name="name" id="name" value={formData.name} className="bg-gray-50 focus:outline-none focus:ring-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sample Name" onChange={handleOnChange} />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Email </label>
                <input type="email" name="email" id="email" value={formData.email} className="bg-gray-50 focus:outline-none focus:ring-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" onChange={handleOnChange} />
              </div>

              <div>
                {['Login', 'Register'].includes(authType) && (
                  <React.Fragment>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Password </label>
                    <div className="relative flex items-center justify-end">
                      <input type={passEye ? 'password' : 'text'} name="password" id="password" value={formData.password} placeholder="••••••••" className="bg-gray-50 focus:outline-none focus:ring-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autoComplete="on" onChange={handleOnChange} />
                      <button type="button" className="absolute px-3 h-full text-xl outline-none text-neutral-400 focus:text-neutral-50" onClick={() => setPassEye((prev) => !prev)} disabled={formProcess}>
                        {passEye ? <RiEyeCloseFill /> : <RiEyeFill />}
                      </button>
                    </div>
                  </React.Fragment>
                )}
                {['Login', 'Register'].includes(authType) && (
                  <div className="flex items-center justify-between mt-2">
                    <button type="button" className="border border-transparent focus:border-white rounded-[3px] text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 focus:outline-none" onClick={() => setAuthType('Recovery')}>
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>

              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" disabled={formProcess}>
                {authType === 'Login' ? 'Sign in' : authType === 'Register' ? 'Register' : 'Send Recovery Link'}
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                {authType === 'Login' ? `Don't have an account yet?` : `Already have an account?`}
                <button type="button" className="focus:outline-none focus:underline focus:border-neutral-50 px-1 border-transparent font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={toggleAuth} disabled={formProcess}>
                  {authType === 'Login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
