import { FC } from 'react';
import { MirrorIcon } from '@/public/assets/icon-components/MirrorIcon';
import { WarpcastIcon } from '@/public/assets/icon-components/WarpcastIcon';
import { WebsiteIcon } from '@/public/assets/icon-components/WebsiteIcon';
import { XIcon } from '@/public/assets/icon-components/XIcon';

interface Props {
  type: 'website' | 'warpcast' | 'x' | 'mirror'
  address: string
}

const ensureHttpsPrefix = (url: string): string => {
  return url.startsWith('http') ? url : `https://${url}`;
};

const getIcon = (type: Props['type']) => {
  switch (type) {
    case 'mirror':
      return <MirrorIcon />;
    case 'warpcast':
      return <WarpcastIcon />;
    case 'website':
      return <WebsiteIcon />;
    case 'x':
      return <XIcon />;
    default:
      return <WebsiteIcon />;
  }
};

export const ExternalLink: FC<Props> = ({ address, type }) => {
  return (
    <div className="flex items-center gap-1">
      {getIcon(type)}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={ensureHttpsPrefix(address)}
        className="break-all"
      >
        {type === 'website' ? address : address.replace(/^https?:\/\//, '')}
      </a>
    </div>
  );
};
