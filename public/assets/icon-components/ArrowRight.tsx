import { FC } from 'react';

type TIconProps = {
  size?: number
  color?: string
};

export const ArrowRightIcon: FC<TIconProps> = ({ size = 20, color = 'white' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.16675 9.99984H15.8334M15.8334 9.99984L10.0001 4.1665M15.8334 9.99984L10.0001 15.8332"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
