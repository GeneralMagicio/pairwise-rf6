import Modal from "../utils/Modal"

interface FarcasterModalProps {
    isOpen: boolean,
    onClose: () => void,
}

const FarcasterModal: React.FC<FarcasterModalProps> = ({
    isOpen, onClose
})=>{
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>
                
            </div>
        </Modal>
    )
}
export default FarcasterModal;