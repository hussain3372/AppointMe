import React from "react";
import Image from "next/image";

interface DropdownOption {
  value: string;
  label: string;
}

// Dropdown component with forwardRef
export const StatsDropdown = React.forwardRef<HTMLDivElement, {
  isOpen: boolean;
  onToggle: () => void;
  options: DropdownOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder: string;
  title?: string; // Optional title prop
}>(({ 
  isOpen, 
  onToggle, 
  options, 
  selectedValue, 
  onSelect, 
  placeholder,
  title // Destructure the new title prop
}, ref) => {
  const selectedOption = options.find(opt => opt.value === selectedValue);

  return (
    <div ref={ref} className="relative">
      {/* Dropdown Trigger */}
      <div
        onClick={onToggle}
        className="cursor-pointer transition-colors duration-150 flex gap-1 items-center justify-between"
      >
        <div>

          <span className="text-sm text-gray-900">
            {selectedOption?.label || placeholder}
          </span>
        </div>
        <Image
          src='/images/dropdown.svg' 
          alt="Dropdown" 
          width={16} 
          height={16} 
          className={`pointer-events-none transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full min-w-[142px] -left-20 bg-white shadow-lg rounded-lg z-10 mt-1 border border-gray-200 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onSelect(option.value);
                onToggle();
              }}
              className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${
                option.value === selectedValue ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <span className={`text-sm ${
                option.value === selectedValue ? 'text-blue-600 font-medium' : 'text-gray-900'
              }`}>
                {option.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

// Add display name for better debugging
StatsDropdown.displayName = "StatsDropdown";