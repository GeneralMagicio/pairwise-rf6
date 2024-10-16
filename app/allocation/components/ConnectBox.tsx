import React from "react";
import Image from "next/image";
import { WorldIdIcon } from "@/public/assets/icon-components/WorldIdIcon";
import { XIcon } from "@/public/assets/icon-components/XIcon";
import { WarpcastIcon } from "@/public/assets/icon-components/WarpcastIcon";

interface ConnectBoxProps {
  onConnectWorldID: () => void;
  onConnectTwitter: () => void;
  onConnectFarcaster: () => void;
}

const ConnectBox: React.FC<ConnectBoxProps> = ({
  onConnectWorldID,
  onConnectTwitter,
  onConnectFarcaster,
}) => {
  return (
    <div className="max-w-md rounded-xl border bg-white p-6">
      <h2 className="mb-4 w-full border-b pb-2 text-2xl font-semibold text-gray-700">
        Your voting power
      </h2>

      <div className="mb-2">
        <h3 className="mb-2 text-sm font-semibold text-gray-600">
          Your badges
        </h3>
        <button>
          <Image
            src="/assets/images/badges.svg"
            alt="Badges"
            width={64}
            height={16}
          />
        </button>
      </div>

      <p className="mb-4 text-sm text-gray-600">
        Increase your voting power by connecting to WorldID
      </p>

      <button
        onClick={onConnectWorldID}
        className="mb-4 flex w-full items-center border justify-center gap-2 rounded-md bg-gray-50 border-[#CBD5E0] px-4 py-2 text-gray-700 font-semibold"
      >
        <WorldIdIcon />
        Connect with WorldID
      </button>

      <hr className="my-6" />

      <div className="flex flex-col w-full items-center justify-center gap-6 bg-voting-power p-4 rounded-xl">
        <p className="text-4xl text-[#2C6074] font-bold">
          You have extra powers now!
        </p>
        <p className="text-gray-600 font-medium">
          Some people have delegated their voting power to you. With great power
          comes great responsibility. Use it wisely.
        </p>

        <button
          onClick={onConnectTwitter}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-800 border border-[##CBD5E0] font-semibold"
        >
          <XIcon />
          Connect with X (Twitter)
        </button>

        <button
          onClick={onConnectFarcaster}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-800 border border-[##CBD5E0] font-semibold"
        >
          <WarpcastIcon />
          Connect with Farcaster
        </button>
      </div>
    </div>
  );
};

export default ConnectBox;
