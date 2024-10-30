import { FC } from 'react';

type TIconProps = {
  size?: number
  color?: string
};

export const ArrowRightIcon: FC<TIconProps> = ({ size = 12, color = '#404454' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.58585 6.00035L4.11096 3.52546L4.81807 2.81836L8.00005 6.00035L4.81807
      9.1823L4.11096 8.4752L6.58585 6.00035Z"
        fill={color}
      />
    </svg>
  );
};
