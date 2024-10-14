import Image from 'next/image';
import TextBlock from '../components/TextBlock';

export const LandingPart2 = () => {
  return (
    <div className="flex h-[calc(0.65*100vh)] min-h-[calc(0.85*760px)] w-full flex-col-reverse
     items-center justify-center gap-20 md:flex-row md:justify-between md:gap-0"
    >
      <div className="relative h-[360px] w-full md:h-[540px]">
        <Image src="assets/images/landing-p2.svg" alt="landing part 2" width={700} height={540} />
      </div>
      <div className="flex max-w-[400px] flex-col gap-2 text-4xl font-bold md:max-w-[700px] sl:text-2xl">
        <TextBlock
          mainText="Choose the project that you consider had a greater"
          highlightText="impact"
          description=""
          highlightImage={{
            src: '/assets/images/scribble.svg',
            alt: 'scribble',
            styles: 'absolute inset-0 -top-3 h-[60px] w-full',
            height: 60,
            width: 100,
            scale: 2.4,
          }}
        />
      </div>
    </div>
  );
};
