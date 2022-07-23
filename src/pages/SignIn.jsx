import {
  GithubAuthProvider,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPopup,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { FC, useState } from 'react';

import { Navigate } from 'react-router-dom';
import Title from '../components/Title';
import { auth } from '../shared/firebase';
import { useQueryParams } from '../hooks/useQueryParams';
import { useStore } from '../store';

const SignIn = () => {
  const currentUser = useStore((state) => state.currentUser);

  const queryParams = useQueryParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [mode, setMode] = useState('');
  const [isSend, setIsSend] = useState(false);

  const handleSignIn = (provider) => {
    setLoading(true);

    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        setError(`Error: ${err.code}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };
  const requestOtp = async (e) => {
    e.preventDefault();
    if(`+84${phoneNumber}`.length < 12){
      setError(`Error: Invalid phone number`);
      return;
    }
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    try {
      const res = await signInWithPhoneNumber(auth, `+84${phoneNumber}`, appVerifier);
      window.confirmationResult = res;
      setIsSend(true);
      setError(null)
    } catch (error) {
      setError(`Error: ${err.code}`);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if(otp.length < 6) {
      setError('Error: Invalid OTP');
      return;
    }
    const confirmationResult = window.confirmationResult;
    try {
      await confirmationResult.confirm(otp);
      setError(null);
    } catch (error) {
      setError(`Error: ${error.code}`);
    }
  };
  if (currentUser) return <Navigate to={queryParams.get('redirect') || '/'} />;

  return (
    <>
      <Title value="Sign In - VMC Social" />
      <div className="min-h-screen w-screen bg-[url('/bg.png')] bg-no-repeat bg-cover bg-center">
        <div className="w-full min-h-screen flex justify-center items-center bg-[#00000056]">
          <div className="w-[90vw] max-w-[350px] bg-black p-10 flex flex-col items-center gap-6 rounded-xl">
            <h1 className="text-3xl font-semibold">Sign In</h1>

            {error && <div className="p-3 bg-red-200 text-red-600 border border-red-400 w-full rounded">{error}</div>}

            {mode === 'phone' ? (
              <>
              <div onClick={() => setMode('')} className="flex items-center cursor-pointer mr-auto text-gray-400 hover:text-gray-300">
                <i class="fas fa-angle-left w-[24px] text-xl"></i>
                <div>Back</div>
              </div>
              <div class="w-full mb-6">
                <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Your Phone number <br/>
                  (Eg: +84-123456789)
                </label>
                <div className="flex items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <div className="mr-1">+84</div>
                  <input
                    value={phoneNumber}
                    type="email"
                    id="email"
                    className="bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="123456789"
                    required
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                {isSend && (
                  <div className="mt-4">
                    <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      OTP Confimation <br/>
                      Eg: 123456
                    </label>
                    <div className="flex items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <input
                        value={otp}
                        type="email"
                        id="email"
                        className="bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="123456"
                        required
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                <button
                  onClick={isSend ? verifyOtp : requestOtp}
                  type="submit"
                  class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {isSend ? 'Confirm' : 'Send OTP'}
                </button>
                <div id="recaptcha-container"></div>
              </div>
              </>
            ) : (
              <>
                <button
                  disabled={loading}
                  onClick={() => handleSignIn(new GoogleAuthProvider())}
                  className="flex items-center bg-white text-black p-3 gap-3 rounded-md cursor-pointer hover:brightness-90 disabled:!brightness-75 disabled:!cursor-default transition duration-300 w-full"
                >
                  <img className="w-6 h-6" src="/google.svg" alt="" />

                  <span>Sign In With Google</span>
                </button>

                <button
                  disabled={loading}
                  onClick={() => handleSignIn(new GithubAuthProvider())}
                  className="flex items-center bg-sky-500	 text-white p-3 gap-3 rounded-md cursor-pointer hover:brightness-90 disabled:!brightness-75 disabled:!cursor-default transition duration-300 w-full"
                >
                  <img className="w-6 h-6" src="/github-brands.svg" alt="" />

                  <span>Sign In With Github</span>
                </button>
                <button
                  disabled={loading}
                  onClick={() => setMode('phone')}
                  className="flex items-center bg-white text-black p-3 gap-3 rounded-md cursor-pointer hover:brightness-90 disabled:!brightness-75 disabled:!cursor-default transition duration-300 w-full"
                >
                  <img className="w-6 h-6" src="/phone-solid.svg" alt="" />

                  <span>Sign In With Phone number</span>
                </button>
              </>
            )}

            {/* <input className="text-red-600" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <input className="text-red-600" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button className="bg-white" onClick={requestOtp}>
              Submit phone
            </button>
            <button className="bg-white" onClick={verifyOtp}>
              Submit phone
            </button>
            <div id="recaptcha-container"></div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
