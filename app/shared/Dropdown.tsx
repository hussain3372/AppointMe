import React, { useEffect, useRef, useState } from "react";
import Input from "../ui/Input";
import Image from "next/image";

interface DropdownOption {
  value: string;
  label: string;
}

export const Dropdown = React.forwardRef<
  HTMLDivElement,
  {
    isOpen: boolean;
    onToggle: () => void;
    options: DropdownOption[];
    selectedValue: string;
    onSelect: (value: string) => void;
    placeholder: string;
    title?: string;
  }
>(
  (
    {
      isOpen,
      onToggle,
      options,
      selectedValue,
      onSelect,
      placeholder,
      title,
    },
    ref
  ) => {
    const [openUpward, setOpenUpward] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === selectedValue);
    const inputTitle = title || placeholder;

    // Detect available space and choose direction
  useEffect(() => {
  if (isOpen && dropdownRef.current) {
    const rect = dropdownRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    queueMicrotask(() => {
      setOpenUpward(spaceBelow < 200 && spaceAbove > spaceBelow);
    });
  }
}, [isOpen]);


    return (
      <div ref={ref} className="relative">
        <div onClick={onToggle} className="cursor-pointer">
          <Input
            title={inputTitle}
            placeholder={placeholder}
            className="w-full cursor-pointer placeholder:text-[#414652]"
            value={selectedOption?.label || ""}
            readOnly
          />
        </div>

        <Image
          src="/images/dropdown.svg"
          alt="Dropdown"
          width={20}
          height={20}
          className="absolute top-4 right-3 pointer-events-none"
        />

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className={`
              absolute
              w-full
              bg-white 
              shadow-2xl 
              rounded-lg 
              z-20 
              border 
              border-gray-100
              ${openUpward ? "bottom-full mb-1" : "top-full mt-1"}
            `}
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onSelect(option.value);
                  onToggle();
                }}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 
                           first:rounded-t-lg last:rounded-b-lg"
              >
                <span className="text-sm text-gray-900">{option.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";
