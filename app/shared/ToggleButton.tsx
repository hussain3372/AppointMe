"use client";

import React, { useState } from "react";

interface ToggleButtonProps {
  initial?: boolean;
  onToggle?: (state: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ initial = false, onToggle }) => {
  const [enabled, setEnabled] = useState(initial);

  const handleClick = () => {
    setEnabled(!enabled);
    if (onToggle) onToggle(!enabled);
  };

  return (
 <button
  onClick={handleClick}
  className={`w-[33.333px] h-5 flex items-center rounded-full p-1  duration-300 ${
    enabled ? "bg-[#F87B1B]" : "bg-transparent border-2 border-[#111827]"
  }`}
>
  <div
    className={`w-2 h-2 rounded-full shadow-md  transform duration-300 bg-white ${
      enabled ? "translate-x-4" : "translate-x-0 border-2 border-[#111827]"
    }`}
  />
</button>

  );
};

export default ToggleButton;
