export const OpenSourceIcon = ({ color }: { color?: string }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={color || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.00067 1.33334C11.6825 1.33334 14.6673 4.31811 14.6673 8.00001C14.6673
         10.7535 12.998 13.1171 10.6162 14.134L8.9372 9.76761C9.56986 9.43174 10.0007
          8.76621 10.0007 8.00001C10.0007 6.89541 9.1052 6.00001 8.00067 6.00001C6.89607
           6.00001 6.00065 6.89541 6.00065 8.00001C6.00065 8.76648 6.43177 9.43221 7.06473
           9.76794L5.38575 14.1343C3.0036 13.1175 1.33398 10.7537 1.33398 8.00001C1.33398
            4.31811 4.31875 1.33334 8.00067 1.33334Z"
        fill={color || '#404454'}
      />
    </svg>
  );
};
