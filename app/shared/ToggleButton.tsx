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
  className={`w-[33.333px] h-5 flex items-center rounded-full p-1 border-2 border-[#111827] duration-300 ${
    enabled ? "bg-[#11224E]" : "bg-transparent"
  }`}
>
  <div
    className={`w-3 h-3 rounded-full shadow-md border-2 border-[#111827] transform duration-300 bg-white ${
      enabled ? "translate-x-3" : "translate-x-0"
    }`}
  />
</button>

  );
};

export default ToggleButton;
