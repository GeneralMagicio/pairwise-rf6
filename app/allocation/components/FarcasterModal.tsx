import { useEffect, useState } from "react";
import Modal from "@/app/utils/Modal";
import { useSignIn, QRCode } from '@farcaster/auth-kit';
import Image from "next/image"
import styles from '../../styles/Spinner.module.css';

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

    const [delegates,setDelegateAmount] = useState<{username: string, points: Number}[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    console.log(isSuccess)

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

    useEffect(()=>{
        if (data && data.username) {
                setDelegateAmount([
                    {
                        username: "username1",
                        points: 200,
                    },
                    {
                        username: "username2",
                        points: 300,
                    }
                ])
                setIsLoading(true);
        }
    }, [isSuccess])

    const handleCopyLink = async () => {
        try {
            if (url) await navigator.clipboard.writeText(url);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };
    useEffect(() => {
        if (data && data.username) {
            setIsLoading(false);
            setDelegateAmount([
                { username: "username1", points: 200 },
                { username: "username2", points: 300 }
            ]);
            setIsLoading(true);
        }
    }, [data?.username]);

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
                (<div className="flex flex-col w-full items-center justify-center gap-6 px-4 py-6">
                    
                    <div className="flex flex-col w-full items-center justify-center gap-2">
                        <div className="flex items-center justify-center">
                            <div className={styles.spinner}></div>
                        </div>
                        <div className="text-lg text-[#05060B]">Looking for Voting Power on Farcaster</div>
                        <div className="text-[#636779] font-normal text-sm tex-wrap text-center">Searching Farcaster for people who delegated voting power to you.</div>
                    </div>
                </div>)
                :
                (<div>
                    {delegates && delegates.length==0 && (<div className="flex flex-col w-full items-center justify-center gap-6 px-4 py-10">
                        <Image src="assets/images/world-star-success.svg" width={100} height={100} alt=""/>
                        <div className="gap-2 flex flex-col items-center">
                            <div className="text-sm text-[#232634]">
                                <div>Successfully connected to your Farcaster account</div>
                                <div>@{data.username}</div>
                            </div>
                            <p className="font-semibold text-mxl text-wrap">You currently don’t have any delegations to your Farcaster account</p>
                            <p className="text-[#636779] text-sm text-wrap">You can always check back later if someone has delegated you voting power</p>
                        </div>
                        <button className="bg-[#FF0420] w-full text-white py-2.5 px-5 rounded-lg" onClick={onClose}><p className="p-0.5">Done</p></button>
                    </div>)}
                    {delegates && delegates.length>0 && (<div className="flex flex-col w-full items-center justify-center gap-6 px-4 py-10">
                        <Image src="assets/images/star-old.svg" width={100} height={100} alt=""/>
                        <div className="gap-2 flex flex-col items-center">
                            <div className="text-sm text-[#232634]">
                                <div>Successfully connected to your Farcaster account</div>
                                <div>@{data.username}</div>
                            </div>
                            <p className="font-semibold text-mxl text-wrap">You have been delegated voting power from the users below</p>
                            {delegates.map(({username,points})=><div className="text-center w-full gap-1 text-[#636779] text-md text-wrap">
                                <span className="text-sm text-[#FF0420]">{points.toString()}</span> from @{username}
                            </div>)}
                        </div>
                        <div className="text-[#FF0420] font-semibold w-full text-center">
                            <div className="text-base ">Your current voting power</div>
                            <div className="text-5xl font-bold text-[#FF0420] p-3">{20000}</div>
                        </div>
                        <button className="bg-[#FF0420] w-full text-white py-2.5 px-5 rounded-lg" onClick={onClose}><p className="p-0.5">Done</p></button>
                    </div>)}
                </div>)
            )}
        </Modal>
    );
};

export default FarcasterModal;