interface TIcoProps {
  size?: number
  color?: string
}

export const ExpandVertical = ({ size = 16, color = '#000' }: TIcoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.3005 4.9678L8.00063 1.66797L4.70248 4.96615L7.33396 4.96681V11.0347H4.70117L8.00096 14.3346L11.3008 11.0348L8.66729 11.0348V4.96714L11.3005 4.9678Z"
        fill={color}
      />
    </svg>
  );
};
