type TCheckboxProps = {
  checked?: boolean
  disabled?: boolean
  onChange: () => void
};

export const Checkbox = ({ checked, disabled, onChange }: TCheckboxProps) => {
  return (
    <div className="inline-flex items-center">
      <label className="relative flex cursor-pointer items-center">
        <input
          type="checkbox"
          className={`0 peer size-4 cursor-pointer appearance-none rounded border transition-all checked:border-primary checked:bg-primary
          ${disabled ? 'cursor-not-allowed border-gray-200 bg-gray-50' : 'cursor-pointer border-gray-400 shadow hover:shadow-md'}`}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            >
            </path>
          </svg>
        </span>
      </label>
    </div>
  );
};
