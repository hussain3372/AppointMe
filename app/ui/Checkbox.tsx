// components/Checkbox.tsx
import React from 'react';

interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChecked?: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  defaultChecked = false,
  onChecked,
  size = 'md',
  disabled = false,
  className = '',
}) => {
  // Use controlled state if checked prop is provided, otherwise use internal state
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleClick = () => {
    if (!disabled) {
      const newChecked = !isChecked;
      
      // Update internal state only if uncontrolled
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      
      // Call the callback
      if (onChecked) {
        onChecked(newChecked);
      }
    }
  };

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const iconSizes = {
    sm: { width: 10, height: 8 },
    md: { width: 12, height: 10 },
    lg: { width: 14, height: 12 },
  };

  const smallIconSizes = {
    sm: { width: 6, height: 4 },
    md: { width: 8, height: 6 },
    lg: { width: 10, height: 8 },
  };

  const positioning = {
    sm: { large: 'top-0.5', small: 'top-[5px] left-0.5' },
    md: { large: 'top-0.5', small: 'top-[7px] left-1' },
    lg: { large: 'top-0.5', small: 'top-[9px] left-1' },
  };

  return (
    <div
      className={`
        relative 
        ${sizeClasses[size]} 
        rounded border-2 
        ${isChecked 
          ? 'bg-orange-500 border-orange-500' 
          : 'bg-white border-gray-300'
        }
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer hover:border-orange-400'
        }
        transition-colors duration-200
        ${className}
      `}
      onClick={handleClick}
      role="checkbox"
      aria-checked={isChecked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {isChecked && (
        <div className="relative w-full h-full">
          {/* Large tick */}
          <svg
            className={`absolute ${positioning[size].large}`}
            width={iconSizes[size].width}
            height={iconSizes[size].height}
            viewBox="0 0 12 10"
            fill="none"
          >
            <path
              d="M1 5L4.5 8.5L11 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Small tick */}
          <svg
            className={`absolute ${positioning[size].small}`}
            width={smallIconSizes[size].width}
            height={smallIconSizes[size].height}
            viewBox="0 0 8 6"
            fill="none"
          >
            <path
              d="M1 3L3 5L7 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Checkbox;