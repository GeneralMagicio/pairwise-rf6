import { useEffect, useState } from "react";
import Modal from "@/app/utils/Modal";
import { useSignIn, QRCode } from '@farcaster/auth-kit';
import Image from "next/image"

interface FarcasterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FarcasterModal: React.FC<FarcasterModalProps> = ({ isOpen, onClose }) => {
    const {
        signIn,
        connect,
        isConnected,
        isSuccess,
        url,
        data,
    } = useSignIn({
        onSuccess: ({ fid }) => console.log('Your fid:', fid),
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            connect(); // Establish the relay connection when modal opens
        }
    }, [isOpen, connect]);

    useEffect(() => {
        if (isConnected) {
            signIn();
        }
    }, [isConnected, signIn]);

    const handleCopyLink = async () => {
        try {
            if (url) await navigator.clipboard.writeText(url);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    useEffect(() => {
        if (data && data.username) {
            setTimeout(() => {
                setIsLoading(true);
            }, 2000);
        }
    }, [data]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {url &&!isSuccess && (
                <div className="relative flex flex-col items-center space-y-4 p-2 text-center">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full shadow-md rounded-full p-2 text-sm"
                        aria-label="Close"
                    >
                        <span>&times;</span>
                    </button>
                    
                    <div className="relative w-auto h-auto">
                        <QRCode uri={url}/>
                        <div className="absolute top-1/2 left-1/2 w-1/4 h-1/4 -translate-x-1/2 -translate-y-1/2 bg-white">
                            <Image src="/assets/images/farcaster-icon.svg" layout="fill" objectFit="contain" alt="Farcaster Icon"/>
                        </div>
                    </div>
                    <p className="text-nowrap text-lg font-semibold">Sign In With Farcaster</p>
                    <p className="text-wrap text-sm w-fit text-gray-600">
                        Scan the QR code with your phone or enter the link on your mobile browser
                    </p>
                    <button
                        onClick={handleCopyLink}
                        className="bg-gray-100 text-gray-800 py-2 px-4 rounded-md shadow-md hover:bg-gray-200 flex items-center space-x-2"
                    >
                        <span>Copy link</span>
                    </button>
                </div>
            )}
            {isSuccess && data?.username && (
                isLoading?
                <div>

                </div>
                :
                <p></p>
            )}
        </Modal>
    );
};

export default FarcasterModal;