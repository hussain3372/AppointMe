"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Calculate position when opening
  useEffect(() => {
    if (open && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      // Check if dropdown would overflow on the right
      const dropdownWidth = 190;
      const spaceOnRight = viewportWidth - buttonRect.left;
      
      // If not enough space on right, align to right edge
      setAlignRight(spaceOnRight < dropdownWidth);
    }
  }, [open]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-[#F6F6F6] text-[#70747D] text-[12px] font-normal hover:bg-[#e2dddd] focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <span>{value || label}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className={`absolute top-full mt-2 w-[180px] rounded-xl bg-white border border-gray-200 shadow-lg z-50 ${
          alignRight ? 'right-0' : 'left-0'
        }`}>
          <ul className="max-h-56 overflow-y-auto">
            {options.map((opt) => (
              <li
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`px-4 py-2.5 cursor-pointer text-[#222222] text-sm font-medium hover:bg-orange-50 hover:text-orange-600 transition ${
                  value === opt
                    ? "bg-orange-100 text-orange-600 font-medium"
                    : ""
                }`}
              >
                {opt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;