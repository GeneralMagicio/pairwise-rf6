export const InfoIcon = ({ size }: { size?: number }) => {
  return (
    <svg
      width={size || 64}
      height={size || 64}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 42.6667V32M32 21.3333H32.0267M58.6667 32C58.6667 46.7276 46.7276 58.6667
         32 58.6667C17.2724 58.6667 5.33334 46.7276 5.33334 32C5.33334 17.2724 17.2724
          5.33333 32 5.33333C46.7276 5.33333 58.6667 17.2724 58.6667 32Z"
        stroke="#FF0420"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
