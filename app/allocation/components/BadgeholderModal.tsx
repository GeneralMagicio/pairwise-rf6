import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface BadgeholderModalProps {
  categoryName: string
  categorySlug: string
  onClose: () => void
}

const BadgeholderModal = ({
  categoryName,
  categorySlug,
  onClose,
}: BadgeholderModalProps) => {
  const router = useRouter();

  return (
    <div className="mx-auto w-[300px] rounded-lg bg-white bg-ballot bg-no-repeat px-6 py-8 shadow-lg md:w-[500px] md:px-10">
      <div className="mb-6">
        <Image
          src="/assets/images/op-voting-char.svg"
          alt="Delegate Decision Characters"
          width={300}
          height={150}
          layout="responsive"
        />
      </div>

      <h1 className="mb-6 text-center text-2xl font-medium">
        Welcome Badgeholder!
      </h1>

      <p className="text-center text-gray-500">Thank you for using Pairwise.</p>
      <p className="mb-6 text-center text-gray-500">
        Submitting your Ballot here also participates in our Liquid Democracy
        experiment that we’re running for Retro Funding 6.
      </p>
      <p className="my-2 text-center text-gray-500">
        You’re assigned to vote on the
        {' '}
        <strong className="text-gray-600">
          {' '}
          {categoryName}
          {' '}
          category.
        </strong>
      </p>

      <div className="mt-8 flex flex-col space-y-2">
        <button
          className="rounded-md bg-primary px-6 py-2 text-white"
          onClick={() => {
            router.push(`/comparison/${categorySlug}`);
          }}
        >
          Start voting
        </button>
        <button
          className="text-primary-primary rounded-md px-6 py-2"
          onClick={onClose}
        >
          Let me look around
        </button>
      </div>
    </div>
  );
};

export default BadgeholderModal;
