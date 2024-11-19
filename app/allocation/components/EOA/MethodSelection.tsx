import React, { FC, FormEvent } from 'react';
import Image from 'next/image';
import { useConnect } from 'thirdweb/react';
import { usePostHog } from 'posthog-js/react';
import {
  createSmartWalletFromEOA,
  createSocialEoa,
  Strategy,
} from '@/app/lib/third-web/methods';
import { TOTPData, TOAuthData, Step } from './EmailLoginModal';
import { InfoIcon } from '@/public/assets/icon-components/Info';
import { axiosInstance } from '@/app/utils/axiosInstance';

interface IMethodSelectionProps {
  pickedMethod: Strategy | 'email' | null
  otpData: TOTPData
  oAuthData: TOAuthData
  setPickedMethod: (method: Strategy | 'email' | null) => void
  setOAuthData: (data: TOAuthData) => void
  setOtpData: (data: TOTPData) => void
  sendOTP: () => void
  setStep: (step: Step) => void
  closeModal: () => void
}

export const MethodSelection: FC<IMethodSelectionProps> = ({
  pickedMethod,
  otpData,
  oAuthData,
  setPickedMethod,
  setOAuthData,
  setOtpData,
  sendOTP,
  setStep,
  closeModal,
}) => {
  const { connect } = useConnect();
  const posthog = usePostHog();

  const getUserSmartWallet = async () => {
    const userSmartWallet = await axiosInstance.get('auth/thirdweb/sa-address');
    return userSmartWallet.data;
  };

  const handleOAuthConnect = (strategy: Strategy) => async () => {
    try {
      posthog.capture('Continue with Gmail');
      setPickedMethod(strategy);
      setOAuthData({ ...oAuthData, loading: true });
      const socialEoa = await createSocialEoa(strategy);
      const account = socialEoa.getAccount();

      if (!account) throw new Error(`Unable to create a ${strategy} EOA`);

      const smartWallet = await createSmartWalletFromEOA(account);
      setOAuthData({ ...oAuthData, loading: false });

      const userSmartWallet = await getUserSmartWallet();

      connect(smartWallet);

      if (!userSmartWallet) {
        setStep(Step.CONNECT_EOA);
        setPickedMethod(null);
      }
      else {
        closeModal();
      }
    }
    catch (error: any) {
      setOAuthData({
        ...oAuthData,
        loading: true,
        error: 'There was a problem connecting to your Google account',
      });
    }
  };

  const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setPickedMethod(value ? 'email' : null);

    // Simple email validation (basic regex for email validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value && !emailRegex.test(value)) {
      setOtpData({
        ...otpData,
        email: value,
        emailError: 'Please enter a valid email',
      });
    }
    else {
      setOtpData({
        ...otpData,
        email: value,
        emailError: '',
      });
    }
  };

  const handleEmailBlur = () => {
    if (!otpData.email) setPickedMethod(null);
  };

  const dismissOAuthError = () => {
    setOAuthData({ ...oAuthData, loading: false, error: '' });
    setStep(Step.EMAIL);
    setPickedMethod(null);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-dark-500">Log in with Email</h1>
      {!pickedMethod || pickedMethod === Strategy.Google
        ? (
            <div className="w-full px-6">
              <p className="text-center text-gray-400">
                Select a Google account to continue
              </p>
              {oAuthData.loading
                ? (
                    <div className="flex w-full flex-col items-center justify-center gap-2 text-sm text-gray-400">
                      <Image
                        src="/assets/images/spinner.gif"
                        alt="Loading"
                        width={150}
                        height={150}
                      />
                      <p>Hold on...</p>
                      <p>Logging in with Google</p>
                      {oAuthData.error && (
                        <div className="mt-4 flex w-[90%] flex-col items-start gap-1 rounded-lg border border-primary bg-status-bg-error px-3 py-2">
                          <p className="text-sm font-semibold text-primary">
                            An error occurred!
                          </p>
                          <p className="text-center text-xs text-dark-500">
                            {oAuthData.error}
                          </p>
                          <div className="mt-4 flex gap-4">
                            <button
                              className="font-semibold text-gray-400"
                              onClick={dismissOAuthError}
                            >
                              Dismiss
                            </button>
                            <button className="font-semibold text-primary">
                              Learn more
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                : (
                    <button
                      className="my-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 font-semibold text-gray-600 shadow-sm"
                      onClick={handleOAuthConnect(Strategy.Google)}
                    >
                      <Image
                        src="/assets/images/google.svg"
                        alt="Google Icon"
                        width={25}
                        height={25}
                      />
                      <span>Continue with Google</span>
                    </button>
                  )}
            </div>
          )
        : null}
      {!pickedMethod && <div className="w-full border-b border-gray-200"></div>}
      {!pickedMethod || pickedMethod === 'email'
        ? (
            <div
              className={`flex w-full flex-col items-center ${
                !pickedMethod ? 'gap-4 px-6 pt-6' : 'gap-8 py-1'
              }`}
            >
              <p className="text-sm text-gray-400">
                {!pickedMethod
                  ? 'Or continue with Email'
                  : 'Enter your email to continue'}
              </p>
              <div className="relative w-full">
                <div className="flex items-center">
                  <input
                    type="email"
                    value={otpData.email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    placeholder="Enter your email"
                    className={`w-full rounded-lg border px-4 py-2 placeholder:text-gray-500 
          ${otpData.emailError ? 'border-red-500' : 'border-gray-200'} 
          focus:outline-none ${
            otpData.email && otpData.emailError
              ? 'focus:ring-red-500'
              : 'focus:ring-gray-200'
            } 
          transition duration-300`}
                  />
                  {otpData.email && otpData.emailError
                    ? (
                        <div className="pointer-events-none absolute right-3">
                          <InfoIcon size={20} />
                        </div>
                      )
                    : null}
                </div>
                {otpData.emailError && (
                  <p className="mt-2 text-sm text-red-500">{otpData.emailError}</p>
                )}
              </div>
              <button
                className={`w-full rounded-lg border px-4 py-2 text-sm font-semibold shadow-sm ${
                  !otpData.email || otpData.emailError
                    ? 'text-gray-500'
                    : 'bg-primary text-white'
                } transition duration-300`}
                onClick={sendOTP}
                disabled={!otpData.email || !!otpData.emailError}
              >
                Continue
              </button>
            </div>
          )
        : null}
    </>
  );
};
