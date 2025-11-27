// TruncateTooltip.tsx
"use client";
import React from "react";

interface TruncateTooltipProps {
  children: string;
  maxWidth?: string;
}

const TruncateTooltip: React.FC<TruncateTooltipProps> = ({ 
  children, 
  maxWidth = "100%" 
}) => {
  return (
    <div 
      className="truncate w-full" 
      style={{ maxWidth }}
      title={children}
    >
      {children}
    </div>
  );
};

export default TruncateTooltip;