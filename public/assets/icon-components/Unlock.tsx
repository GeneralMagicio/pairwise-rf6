import { FC } from 'react';

type TIconProps = {
  size?: number;
  color?: string;
};

export const UnlockIcon: FC<TIconProps> = ({ size = 20, color = 'currentColor' }) => {
  return (
    <svg
      height={size}
      width={size}
      fill="none"
      stroke={color}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
      />
    </svg>
  );
};
