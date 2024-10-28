import Image from 'next/image';
import TextBlock from '../components/TextBlock';

export const LandingPartDelegate = () => {
  return (
    <div>
      <div className="mb-[120px] flex h-[calc(0.65*100vh)] min-h-[calc(0.85*760px)] flex-col justify-center gap-20 md:flex-row md:justify-between md:gap-0">
        <div className="flex max-w-[400px] flex-col justify-center text-4xl font-bold md:max-w-[400px] sl:text-3xl">
          <TextBlock
            mainText="Use Pairwise to"
            highlightText="Vote"
            midtext="or"
            maintext2="Delegate"
            description="your voting decision to someone you trust."
            highlightImage={{
              src: '/assets/images/star-vector.png',
              alt: 'Star',
              styles: 'absolute -top-7 left-2',
              width: 45,
              height: 45,
            }}
          />
        </div>
        <div className="relative w-full md:h-[650px] md:w-[750px]">
          <Image
            src="assets/images/delegate-landing.svg"
            alt="landing part Delegate"
            width={750}
            height={650}
          />
        </div>
      </div>
    </div>
  );
};
