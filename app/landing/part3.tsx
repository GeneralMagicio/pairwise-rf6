import Image from 'next/image';
import TextBlock from '../components/TextBlock';

export const LandingPart3 = () => {
  return (
    <div className="flex h-[calc(0.65*100vh)] min-h-[calc(0.85*760px)] w-full flex-col items-center justify-center gap-20 md:flex-row md:justify-between md:gap-0">
      <div className="flex max-w-[400px] flex-col gap-2 text-4xl font-bold xl:max-w-[600px] sl:text-2xl">
        <TextBlock
          mainText="After completion you will be redirected back to the Optimism website, and your Pairwise ranked projects will be updated on your"
          highlightText="Ballot"
          description=""
          highlightImage={{
            src: '/assets/images/accent.svg',
            alt: 'accent',
            styles: 'absolute -right-12 top-8',
            height: 60,
            width: 100,
            scale: 2.1,
          }}
        />
      </div>
      <div className="relative flex h-[450px] w-full justify-end md:h-[620px]">
        <Image src="assets/images/landing-p3.svg" alt="landing part 2" width={700} height={620} />
      </div>
    </div>
  );
};
