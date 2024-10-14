import React, { useState } from 'react';
import { Wallet } from 'thirdweb/wallets';
import { preAuthenticate } from 'thirdweb/wallets/in-app';
import { ExternalLinkIcon } from '@/public/assets/icon-components/ExternalLink';
import { brandColor } from '@/app/lib/constants';
import { Strategy } from '@/app/lib/third-web/methods';
import { MethodSelection } from './MethodSelection';
import { client } from '@/app/lib/third-web/provider';
import { OTPVerification } from './OTPVerification';
import SuccessModal from './SuccessModal';
import ConnectEOAModal from './ConnectEOAModal';
import VerificationLoading from './VerificationLoading';

export enum OtpStatus {
  SENT,
  VERIFIED,
  INCORRECT,
  FAILED,
  EXPIRED,
}

export enum Step {
  EMAIL,
  OTP,
  LOADING,
  CONNECT_EOA,
  SUCCESS,
}

export type TOTPData = {
  email: string;
  emailError: string;
  verificationCode: string;
  loading: boolean;
  otpStatus: OtpStatus;
  sentAt?: number;
};

export type TOAuthData = {
  email: string;
  loading: boolean;
  error: string;
};

type TEmailLoginModalProps = {
  closeModal: () => void;
};

const EmailLoginModal = ({ closeModal }: TEmailLoginModalProps) => {

  const [otpData, setOtpData] = useState<TOTPData>({
    email: '',
    emailError: '',
    verificationCode: '',
    loading: false,
    otpStatus: OtpStatus.SENT,
    sentAt: 0,
  });
  const [oAuthData, setOAuthData] = useState<TOAuthData>({
    email: '',
    loading: false,
    error: '',
  });
  const [step, setStep] = useState<Step>(Step.EMAIL);
  const [eoaWallet, setEoaWallet] = useState<Wallet | null>(null);
  const [pickedMethod, setPickedMethod] = useState<Strategy | 'email' | null>(
    null
  );

  const goBack = () => {
    setStep(otpData.otpStatus !== OtpStatus.VERIFIED ? Step.EMAIL : Step.OTP);
    setPickedMethod('email');
  };

  const sendOTP = async () => {
    step !== Step.OTP && setStep(Step.OTP);

    setOtpData({ ...otpData, loading: true });

    try {
      await preAuthenticate({
        client,
        strategy: 'email',
        email: otpData.email,
      });

      setOtpData({
        ...otpData,
        loading: false,
        otpStatus: OtpStatus.SENT,
        sentAt: Date.now(),
      });
    } catch (e) {
      setOtpData({
        ...otpData,
        loading: false,
        otpStatus: OtpStatus.FAILED,
        sentAt: 0,
      });
    }
  };

  if ([Step.EMAIL, Step.OTP].includes(step)) {
    return (
      <div className="mx-auto w-[1100px] rounded-lg bg-rating-illustration bg-no-repeat p-10 shadow-lg">
        <div className="flex justify-center gap-6 py-2">
          <div className="flex w-1/2 flex-col gap-4 px-4 py-8">
            <h2 className="text-2xl font-bold text-dark-500">
              Why you need to log in with Email?
            </h2>
            <p className="text-gray-600">
              Pairwise allows for{' '}
              <strong className="text-dark-500">anonymous voting</strong>,
              letting you express your views without any fear of judgment.
            </p>
            <p className="text-lg font-bold text-dark-500">How it works?</p>
            <ul className="mt-4 flex flex-col gap-4 text-gray-600">
              <li className="flex gap-2">
                <span>1. </span>
                <span>
                  Web2 login creates an <strong>AA wallet</strong>
                </span>
              </li>
              <li className="flex gap-2">
                <span>2. </span>
                <span>
                  Using a <strong>zk proof</strong> your new AA wallet connects
                  to your existing OP mainnet address
                </span>
              </li>
              <li className="flex gap-2">
                <span>3. </span>
                <span>
                  Your AA wallet is used to create votes as attestations, and
                  your OP mainnet address is <strong>never used again</strong>
                </span>
              </li>
            </ul>
            <p className="mt-10 flex gap-2 text-lg text-gray-600">
              Learn more about how it works
              <span className="flex items-center gap-1 font-medium text-primary">
                Read full blog post
                <ExternalLinkIcon size={16} color={brandColor.primary} />
              </span>
            </p>
          </div>
          <div className="border-l-2 border-gray-100"></div>
          <div className="flex w-1/2 flex-col items-center justify-center gap-2">
            {step === Step.EMAIL ? (
              <MethodSelection
                otpData={otpData}
                oAuthData={oAuthData}
                pickedMethod={pickedMethod}
                setOtpData={setOtpData}
                setPickedMethod={setPickedMethod}
                setEoaWallet={setEoaWallet}
                setOAuthData={setOAuthData}
                sendOTP={sendOTP}
                setStep={setStep}
              />
            ) : (
              <OTPVerification
                otpData={otpData}
                setOtpData={setOtpData}
                handleGoBack={goBack}
                setEoaWallet={setEoaWallet}
                setStep={setStep}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === Step.LOADING) {
    return <VerificationLoading email={otpData.email} />;
  }

  if (step === Step.CONNECT_EOA) {
    return (
      <ConnectEOAModal
        email={otpData.email}
        eoaWallet={eoaWallet}
        setStep={setStep}
      />
    );
  }

  if (step === Step.SUCCESS) {
    return <SuccessModal closeModal={closeModal} />;
  }
};

export default EmailLoginModal;
