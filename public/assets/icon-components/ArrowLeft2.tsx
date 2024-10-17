import { FC } from 'react';

type IconProps = {
  size?: number
  color?: string
};

export const ArrowLeft2Icon: FC<IconProps> = ({ size = 20, color = '#0F111A' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.3337 10.0003H4.66699M4.66699 10.0003L10.5003 15.8337M4.66699 10.0003L10.5003 4.16699"
      stroke={color}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
