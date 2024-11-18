import TextBlock from '../components/TextBlock';
import { ConnectButton } from '../utils/wallet/Connect';
export const LandingPart0 = () => {
  return (
    <div className="flex h-auto flex-col items-center justify-between gap-[88px] py-28">

      <div className="flex flex-col justify-center text-center text-6xl">
        <TextBlock
          mainText="Welcome to"
          highlightText="Optimism"
          description="Retro Funding 6 and Liquid Democracy experiment"
          header
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-14">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <p className="w-full text-center text-3xl font-bold text-dark-500 xl:text-4xl xl:leading-[3rem]">
            Vote on
            {' '}
            <span className="text-primary">Retro Funding 6</span>
          </p>
          <div className="max-w-screen-md text-wrap text-center text-2xl font-normal text-dark-500">
            Use Pairwise to vote on
            {' '}
            <span className="font-bold">Retro Funding 6</span>
            {' '}
            to reward contributions to Optimism Governance.
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <p className="w-full text-center text-3xl font-bold text-dark-500 xl:text-4xl xl:leading-[3rem]">
            Participate in
            {' '}
            <span className="text-primary">Liquid Democracy</span>
          </p>
          <div className="max-w-screen-md text-wrap text-center text-2xl font-normal text-dark-500">
            Use Pairwise to participate in our
            {' '}
            <span className="font-bold">Liquid Democracy</span>
            {' '}
            experiment that we&#39;re running for Retro Funding 6.
          </div>
        </div>
      </div>
      <div className="w-auto">
        <ConnectButton />
      </div>
    </div>
  );
};
