import React from 'react';
import { useDisconnect } from 'wagmi';
import { NotBhCharacter } from '@/public/assets/icon-components/NotBhCharacter';
import { ArrowLeftIcon } from '@/public/assets/icon-components/ArrowLeft';
import { useAuth } from '../AuthProvider';

const NotBadgeHolder: React.FC = () => {
  const { signOut, redirectToComparisonPage } = useAuth();
  const { disconnectAsync } = useDisconnect();

  const handleLogout = async () => {
    await disconnectAsync();
    signOut();
  };

  return (
    <div className="relative flex flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-md">
      {/* <Image
        src="assets/images/vector3.svg"
        alt="vector"
        width={220}
        height={220}
        className="absolute -left-16 -top-16 overflow-hidden"
      /> */}
      <NotBhCharacter />
      <h2 className="mb-4 text-2xl font-bold">This is not a badgeholder</h2>
      <p className="mb-8 text-gray-600">
        The wallet you are connecting is not included as a badgeholder.
        You can participate as a guest, knowing that your vote will not be used to distribute funding this time.
      </p>
      <div className="flex justify-between gap-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 rounded-md border
        border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          <ArrowLeftIcon />
          <span> Back </span>
        </button>
        <button
          onClick={() => { redirectToComparisonPage(); }}
          className="rounded-md bg-primary px-4
        py-2 text-white hover:bg-red-600"
        >
          Continue as a guest →
        </button>
      </div>
    </div>
  );
};

export default NotBadgeHolder;
