import { Dispatch, FC } from 'react';
import Image from 'next/image';
import { usePostHog } from 'posthog-js/react';
import TextBlock from '../../components/TextBlock';

const IntroView: FC<{ setUserAsVisited: Dispatch<void> }> = ({
  setUserAsVisited,
}) => {
  const posthog = usePostHog();
  return (
    <div className="relative flex h-[86vh] w-full flex-col-reverse items-center
    justify-end gap-8 px-8 py-2 lg:flex-row lg:gap-0 lg:p-0"
    >
      <div className="left-0 my-10 flex size-full flex-col items-start justify-end sm:mt-0 md:mb-0 md:justify-center">
        <div className="ml-0 flex w-4/5 flex-col justify-center gap-16
        sm:ml-[20px] sm:w-3/5 md:w-[50%] lg:ml-[100px] lg:w-[35%] xl:ml-[200px]"
        >
          <TextBlock
            mainText="Use the"
            highlightText="Stars"
            description="for faster comparisons"
            highlightImage={{
              src: '/assets/images/star-vector.png',
              alt: 'Star',
              styles: 'absolute -top-12 left-[16px] -z-10',
              width: 70,
              height: 70,
            }}
          />
          <TextBlock
            mainText="Choose the project that you consider had a greater"
            highlightText="impact"
            description=""
            highlightImage={{
              src: '/assets/images/scribble.svg',
              alt: 'scribble',
              styles: 'absolute inset-0 -top-3 -z-10 h-[60px] w-full',
              height: 60,
              width: 100,
              scale: 2.4,
            }}
          />
          <ActionButton
            onClick={() => {
              posthog.capture('Let\'s do it');
              setUserAsVisited();
            }}
            text="Let's do it!"
          />
        </div>
      </div>

      <Image
        src="/assets/images/intro-page.svg"
        alt="Voting Intro"
        className="absolute right-0 top-0 -z-50"
        width={1167}
        height={1167}
      />
    </div>
  );
};

const ActionButton: FC<{ onClick: () => void, text: string }> = ({ onClick, text }) => (
  <button
    onClick={onClick}
    className="mt-10 w-full rounded-lg bg-primary px-8 py-3 text-xl font-bold text-white sm:w-[70%]"
  >
    {text}
  </button>
);

export default IntroView;
