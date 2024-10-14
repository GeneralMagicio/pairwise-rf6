import Modal from "../utils/Modal";
import Image from 'next/image';

interface FarcasterModalProps {
    isOpen: boolean,
    onClose: () => void,
}

const WorldIdSignInSuccessModal: React.FC<FarcasterModalProps> = ({
    isOpen, onClose
})=>{
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col w-full items-center justify-center gap-6 px-4 py-10">
                <Image src="assets/images/world-star-success.svg" width={100} height={100} alt=""/>
                <div className="gap-2 flex flex-col items-center">
                    <div className="text-sm text-[#232634]">Successfully connected to your World ID</div>
                    <div className="text-mxl font-semibold text-[#05060B]">Your voting power has been increased by <span className="text-[#FF0420]">+150</span></div>
                </div>
                <div className="text-[#FF0420] font-semibold w-full text-center">
                    <div className="text-base ">Your current voting power</div>
                    <div className="text-5xl font-bold text-[#FF0420] p-3">{20000}</div>
                </div>
                <button className="bg-[#FF0420] w-full text-white py-2.5 px-5 rounded-lg" onClick={onClose}><p className="p-0.5">Done</p></button>
            </div>
        </Modal>
    )
}
export default WorldIdSignInSuccessModal;