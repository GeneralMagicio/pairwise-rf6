import React, { useState, useRef, useEffect, ReactNode } from 'react';

interface DropdownProps {
  children: ReactNode
  customClass?: string
}

const Dropdown: React.FC<DropdownProps> = ({ children, customClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current
        && !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${customClass}`} ref={dropdownRef}>
      <button
        className="rounded-lg border border-gray-300 p-2 shadow-md"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 5.25a.75.75 0 110-1.5.75.75 0 010 1.5zm0 5.25a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 rounded-md border bg-white p-4 shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
