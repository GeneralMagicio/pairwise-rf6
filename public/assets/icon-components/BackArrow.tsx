type TIconProps = {
  size?: string
  color?: string
}

export const BackArrowIcon = ({ size, color }: TIconProps) => {
  return (
    <svg
      width={size || '24'}
      height={size || '25'}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 16.5L3 12.5M3 12.5L7 8.5M3 12.5L21 12.5"
        stroke={color || '#404454'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
