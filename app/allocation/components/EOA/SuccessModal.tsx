import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { categoryIdSlugMap } from '@/app/comparison/utils/helpers';

type TSuccessModalProps = {
  closeModal: () => void
  selectedCategoryId: number | null
};

const SuccessModal = ({
  closeModal,
  selectedCategoryId,
}: TSuccessModalProps) => {
  const router = useRouter();

  const postLogin = () => {
    closeModal();

    if (selectedCategoryId)
      router.push(`/comparison/${categoryIdSlugMap.get(selectedCategoryId)}`);
  };

  return (
    <div className="mx-auto w-[460px] rounded-lg bg-rating-illustration bg-no-repeat px-6 py-12 shadow-lg">
      <div className="flex flex-col items-center justify-center gap-6">
        <Image
          src="/assets/images/op-character7.svg"
          alt="Success"
          width={150}
          height={150}
        />
        <h2 className="text-2xl font-bold text-dark-500">
          Wallet connected successfully!!
        </h2>
        <p className="text-center text-gray-400">
          You can now close this modal and continue voting
        </p>
        <button
          className="mt-4 w-full rounded-lg border bg-primary px-4 py-2 font-semibold text-white transition duration-300"
          onClick={postLogin}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
