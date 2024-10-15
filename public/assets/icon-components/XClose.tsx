import { FC } from 'react';

type TIconProps = {
  size?: number
  color?: string
};

export const XCloseIcon: FC<TIconProps> = ({ size = 24, color = 'black' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
