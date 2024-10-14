import React, { useState } from 'react';
import { ArrowLeftIcon } from '@/public/assets/icon-components/ArrowLeft';
import { ArrowRightIcon } from '@/public/assets/icon-components/ArrowRightIcon';

interface TeamMember {
  profileImg: string
  urlLink: string
}

interface TeamProps {
  team: TeamMember[]
}

export const mockTeam: TeamProps['team'] = [
  { profileImg: 'https://assets.vercel.com/image/upload/q_auto/front/about/individual-investors/natfriedman.png',
    urlLink: 'https://x.com/natfriedman' },
  { profileImg: `https://assets.vercel.com/image/upload/q_auto/front/about/
    individual-investors/jordanwalke.png`, urlLink: 'link2' },
  { profileImg: `https://assets.vercel.com/image/upload/q_auto/front/about/
    individual-investors/navalravikant.png`, urlLink: 'link2' },
  { profileImg: `https://assets.vercel.com/image/upload/q_auto/front/about/
    individual-investors/jessiefrazelle.png`, urlLink: 'link2' },
  { profileImg: `https://assets.vercel.com/image/upload/q_auto/front/about/
    individual-investors/ilyasukhar.png`, urlLink: 'link2' },
  { profileImg: `https://assets.vercel.com/image/upload/q_auto/front/about/
    individual-investors/davidcramer.png`, urlLink: 'link2' },
  { profileImg: `https://assets.vercel.com/image/upload/q_auto/front/about/
    individual-investors/anthonycasalena.png`, urlLink: 'link2' },
  { profileImg: `https://assets.vercel.com/image/upload/q_auto/front/about/
    individual-investors/matiaswoloski.png`, urlLink: 'link2' },
];

const Team: React.FC<TeamProps> = ({ team }) => {
  const [expanded, setExpanded] = useState(false);

  const displayedTeam = expanded ? team : team.slice(0, 5);

  return (
    <div className="flex items-center">
      {displayedTeam.map((member, index) => (
        <a
          key={index}
          href={member.urlLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`${index !== 0 ? '-ml-2' : ''}`}
          style={{ zIndex: displayedTeam.length - index }}
        >
          <img
            src={member.profileImg}
            alt={`Team member ${index + 1}`}
            className="size-9 rounded-full object-cover"
          />
        </a>
      ))}
      {!expanded && team.length > 5 && (
        <button
          onClick={() => setExpanded(true)}
          className="-ml-2 flex size-9 items-center justify-center rounded-full
           bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300"
          style={{ zIndex: 0 }}
        >
          <ArrowRightIcon />
        </button>
      )}
      {expanded && team.length > 5 && (
        <button
          onClick={() => setExpanded(false)}
          className="-ml-2 flex size-9 items-center justify-center rounded-full
           bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300"
          style={{ zIndex: 0 }}
        >
          <ArrowLeftIcon />
        </button>
      )}
    </div>
  );
};

export default Team;
