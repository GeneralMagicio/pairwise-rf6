import TextBlock from '../components/TextBlock';
import { ConnectButton } from '../utils/wallet/Connect';
export const LandingPart0 = () => {
  return (
    <div className="flex h-auto flex-col items-center justify-between gap-14 py-28">

      <div className="flex max-w-screen-lg flex-col justify-center text-center text-6xl">
        <TextBlock
          mainText="Welcome"
          highlightText="BadgeHolders"
          description="and guest voters"
          header
        />
      </div>
      <div className="max-w-screen-md text-wrap text-center text-2xl text-dark-500">
        Use Pairwise to vote on
        {' '}
        <span className="font-bold">Retro Funding 6</span>
        {' '}
        to reward contributions to Optimism Governance.
      </div>
      <div className="w-auto">
        <ConnectButton />
      </div>
    </div>
  );
};
