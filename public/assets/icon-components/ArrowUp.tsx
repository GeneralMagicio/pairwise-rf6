export const ArrowUpIcon = ({ color, width, height }: { color?: string, width?: number, height?: number }) => {
  return (
    <svg
      width={width ? `${width}` : '16'}
      height={height ? `${height}` : '16'}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99993 7.21893L4.70013 10.5188L3.75732 9.57599L7.99993 5.33333L12.2426 9.57599L11.2998 10.5188L7.99993 7.21893Z"
        fill={color || '#0F111A'}
      />
    </svg>
  );
};
