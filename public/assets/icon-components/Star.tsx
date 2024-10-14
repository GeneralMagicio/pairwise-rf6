export const StarIcon = ({ color, size }: { color?: string, size?: number }) => {
  return (
    <svg
      width={size || '16'}
      height={size || '16'}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.00056 12.1733L3.29826 14.8055L4.34848 9.51994L0.39209 5.86121L5.74345 5.22672L8.00056
        0.333344L10.2576 5.22672L15.609 5.86121L11.6526 9.51994L12.7028 14.8055L8.00056 12.1733Z"
        fill={color || '#404454'}
      />
    </svg>
  );
};
