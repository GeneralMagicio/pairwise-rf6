import React, {
  FC,
  KeyboardEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import { Wallet } from 'thirdweb/wallets';
import { TOTPData, OtpStatus, Step } from './EmailLoginModal';
import { EditIcon } from '@/public/assets/icon-components/Edit';
import { BackArrowIcon } from '@/public/assets/icon-components/BackArrow';
import {
  createEmailEoa,
  createSmartWalletFromEOA,
} from '@/app/lib/third-web/methods';

interface IOTPVerificationProps {
  otpData: TOTPData
  setOtpData: (data: TOTPData) => void
  handleGoBack: () => void
  setEoaWallet: (wallet: Wallet) => void
  setStep: (step: number) => void
  resendOTP: () => void
}

const FIVE_MINUTES = 5 * 60 * 1000;
const INITIAL_TIMER = 5 * 60;

export const OTPVerification: FC<IOTPVerificationProps> = ({
  otpData,
  setOtpData,
  handleGoBack,
  setEoaWallet,
  setStep,
  resendOTP,
}) => {
  const [timer, setTimer] = useState<number>(INITIAL_TIMER);

  useEffect(() => {
    setTimer(INITIAL_TIMER);

    if (otpData.sentAt && otpData.sentAt >= Date.now() - FIVE_MINUTES) {
      const intervalId = setInterval(() => {
        setTimer((prev: number) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [otpData.sentAt]);

  const handleVerificationCodeChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const index = Number(e.currentTarget.getAttribute('data-index'));

    // Only accept digits
    if (value && !/^\d$/.test(value)) return;

    const newVerificationCode = otpData.verificationCode.split('');
    newVerificationCode[index] = value;

    setOtpData({
      ...otpData,
      verificationCode: newVerificationCode.join(''),
    });
  };

  const handleKeyPress
    = (next: string, prev: string) => (e: KeyboardEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;

      if (target.value.length === 1 && e.key !== 'Backspace') {
        const nextInput = document.getElementById(`otp-${next}`);
        if (nextInput) nextInput.focus();
      }

      if (e.key === 'Backspace' && target.value.length === 0) {
        const prevInput = document.getElementById(`otp-${prev}`);
        if (prevInput) prevInput.focus();
      }
    };

  const handleEmailLogin = async () => {
    setOtpData({ ...otpData, loading: true });
    setStep(Step.LOADING);

    const { email, verificationCode } = otpData;

    if (!email || !verificationCode) {
      setOtpData({
        ...otpData,
        loading: false,
        otpStatus: OtpStatus.INCORRECT,
      });
      setStep(Step.OTP);
      return;
    }

    try {
      const emailEoa = await createEmailEoa(email, verificationCode);
      const account = emailEoa.getAccount();

      if (!account) throw new Error('Unable to create an email EOA');

      const smartWallet = await createSmartWalletFromEOA(account);
      setEoaWallet(smartWallet);
      setStep(Step.CONNECT_EOA);
    }
    catch {
      setOtpData({
        ...otpData,
        loading: false,
        otpStatus: OtpStatus.INCORRECT,
      });
      setStep(Step.OTP);
    }
  };

  const statusBorderClassSuffix: Record<OtpStatus, string> = {
    [OtpStatus.VERIFIED]: 'success',
    [OtpStatus.INCORRECT]: 'error',
    [OtpStatus.FAILED]: 'error',
    [OtpStatus.EXPIRED]: 'expired',
    [OtpStatus.SENT]: '',
  };

  const borderColour
    = `border-2 border-status-border-${
      statusBorderClassSuffix[otpData.otpStatus]
    }` || 'border border-gray-300';

  const otpCodeFilled = otpData.verificationCode.length === 6;

  return (
    <>
      <div className="mb-4 w-full px-8 text-lg text-gray-600">
        <button
          className="flex items-center justify-start gap-4"
          onClick={handleGoBack}
        >
          <BackArrowIcon />
          <p>Back</p>
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-6">
        <h2 className="text-2xl font-bold">Verify Email</h2>
        <p className="mb-4 text-center text-sm leading-7 text-gray-400">
          Please enter the 4-digit secure code sent to your email
          {' '}
          <strong className="flex justify-center gap-2">
            {otpData.email}
            <button onClick={handleGoBack}>
              <EditIcon />
            </button>
          </strong>
        </p>

        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className={`size-16 rounded-md text-center text-4xl font-semibold outline-none transition duration-300 placeholder:opacity-45 ${borderColour}`}
              onChange={handleVerificationCodeChange}
              onKeyUp={handleKeyPress(
                index === 5 ? '' : String(index + 1),
                String(index - 1)
              )}
              id={`otp-${index}`}
              data-index={index}
              value={otpData.verificationCode[index] || ''}
              aria-label={`OTP input ${index + 1}`}
              placeholder="0"
            />
          ))}
        </div>

        {otpData.otpStatus === OtpStatus.INCORRECT && (
          <p className="text-center text-sm text-status-text-error">
            Incorrect OTP
          </p>
        )}

        {otpData.otpStatus === OtpStatus.EXPIRED && (
          <p className="text-center text-sm text-status-text-expired">
            OTP Expired. Please try Resend Code.
          </p>
        )}

        <button
          className={`w-full rounded-lg border px-4 py-2 font-semibold ${
            otpCodeFilled
              ? 'bg-primary text-white'
              : 'bg-gray-300 text-gray-500'
          } transition duration-300`}
          onClick={() => handleEmailLogin()}
          disabled={!otpCodeFilled}
        >
          Submit
        </button>

        <div className="flex flex-col items-center justify-center gap-2 text-sm font-medium">
          <p className="text-center text-gray-400">Didn't receive code?</p>
          {!otpData.sentAt
          || (otpData.sentAt && otpData.sentAt > Date.now() - FIVE_MINUTES)
            ? (
                <p className="text-gray-400">
                  Resend Code in
                  {' '}
                  <span className="text-primary">
                    {timer > 60
                      ? `${Math.floor(timer / 60)}:${(timer % 60)
                        .toString()
                        .padStart(2, '0')}`
                      : `${timer}s`}
                  </span>
                </p>
              )
            : (
                <button
                  className="text-primary"
                  onClick={() => {
                    resendOTP();
                  }}
                >
                  Resend Code
                </button>
              )}
        </div>
      </div>
    </>
  );
};