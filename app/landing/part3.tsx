import Image from 'next/image';
import TextBlock from '../components/TextBlock';

export const LandingPart3 = () => {
  return (
    <div className="flex h-[calc(0.65*100vh)] min-h-[calc(0.85*760px)] w-full flex-row items-center justify-center gap-20">
      <div className="relative flex max-w-[400px] flex-col gap-2 text-4xl font-bold xl:max-w-[600px] sl:text-2xl">
        <div className="relative">
          <TextBlock
            mainText="After completion you will update your"
            highlightText="Ballot"
            description="and you&#39;re done!"
          />
        </div>
        <Image
          src="/assets/images/accent.svg"
          alt="accent"
          className="absolute -right-12 top-full scale-210"
          width={100}
          height={60}
        />
      </div>
      <div className="relative flex h-[450px] w-full justify-end md:h-[620px]">
        <Image src="assets/images/landing-p3.svg" alt="landing part 3" width={700} height={620} />
      </div>
    </div>
  );
};
