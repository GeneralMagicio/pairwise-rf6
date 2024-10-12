export const WarningIcon = ({
  color,
  size,
}: {
  color?: string
  size?: number
}) => {
  return (
    <svg
      width={size || '19'}
      height={size || '17'}
      viewBox="0 0 19 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.49982 6.49995V9.83328M9.49982 13.1666H9.50815M8.34591 2.24305L1.49184
         14.0819C1.11167 14.7386 0.921587 15.0669 0.949681 15.3364C0.974186 15.5714
          1.09733 15.785 1.28846 15.924C1.50759 16.0833 1.88698 16.0833 2.64575 16.0833H16.3539C17.1127
          16.0833 17.492 16.0833 17.7112 15.924C17.9023 15.785 18.0254 15.5714 18.05 15.3364C18.078
           15.0669 17.888 14.7386 17.5078 14.0819L10.6537 2.24305C10.2749 1.58875 10.0855 1.26159
           9.8384 1.15172C9.62285 1.05587 9.37678 1.05587 9.16123 1.15172C8.91413 1.26159 8.72472 1.58875 8.34591 2.24305Z"
        stroke={color || '#FF0420'}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
