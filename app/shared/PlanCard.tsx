"use client";
import React, { useState } from "react";
import Image from "next/image";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CustomCheckbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <div
      className="relative w-[18px] h-[18px] cursor-pointer"
      onClick={() => onChange(!checked)}
    >
      <div
        className={`w-full h-full rounded border-2 transition-all ${
          checked
            ? "bg-orange-500 border-orange-500"
            : "bg-white border-gray-300"
        }`}
      >
        {checked && (
          <div className="relative w-full h-full">
            {/* Large tick */}
            <svg
              className="absolute top-0.5"
              width="12"
              height="10"
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
              className="absolute top-[7px] left-1"
              width="8"
              height="6"
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
    </div>
  );
};

interface PricingCardProps {
  // Required props
  title: string;
  showFeature?:boolean;
  description: string;
  price: string;
  period?: string;
  buttonText: string;
  features: string[];
  onBuyNow?: () => void;
  isSelected?: boolean;
  showBorder?: boolean;
  percentage?: string; // e.g. "-15%" - MOVED THIS LINE

  // === CARD CONTAINER STYLING ===
  /** Card background color */
  bgColor?: string;
  /** Card text color */
  textColor?: string;
  /** Card padding */
  padding?: string;
  /** Card maximum width */
  cardMaxWidth?: string;
  /** Card border radius */
  cardRadius?: string;
  /** Card shadow */
  cardShadow?: string;
  /** Card border styling */
  borderStyle?: string;

  // === BORDER COLORS ===
  /** Default border color */
  defaultBorderColor?: string;
  /** Hover border color */
  hoverBorderColor?: string;
  /** Professional plan border color (optional) */
  professionalBorderColor?: string;

  // === HEADER SECTION ===
  titleClass?: string;
  titleWeight?: string;
  /** Title text color */
  titleColor?: string;
  /** Additional title classes */
  titleClasses?: string;
  /** Description font size */
  descriptionClass?: string;
  /** Description font weight */
  descriptionWeight?: string;
  /** Description text color */
  descriptionColor?: string;
  /** Additional description classes */
  descriptionClasses?: string;
  /** Space between title and description */
  headerSpacing?: string;

  // === PRICE SECTION ===
  /** Price font size */
  priceSize?: string;
  /** Price font weight */
  priceWeight?: string;
  /** Price text color */
  priceColor?: string;
  /** Additional price classes */
  priceClasses?: string;
  /** Period font size */
  periodSize?: string;
  /** Period font weight */
  periodWeight?: string;
  /** Period text color */
  periodColor?: string;
  /** Additional period classes */
  periodClasses?: string;
  /** Space above price section */
  priceSpacing?: string;
  /** Space between price and period */
  pricePeriodSpacing?: string;

  // === BUTTON SECTION ===
  /** Show/hide button */
  showButton?: boolean;
  /** Button background color */
  buttonBg?: string;
  /** Button text color */
  buttonTextColor?: string;
  /** Button font size */
  buttonClass?: string;
  /** Button font weight */
  buttonWeight?: string;
  /** Button padding */
  buttonPadding?: string;
  /** Button border radius */
  buttonRadius?: string;
  /** Button width */
  buttonWidth?: string;
  /** Space above button */
  buttonSpacing?: string;
  /** Additional button classes */
  buttonClasses?: string;
  /** Button hover background */
  hoverButtonBg?: string;
  /** Button hover text color */
  hoverButtonText?: string;

  // === FEATURES SECTION ===
  /** Feature list font size */
  featureSize?: string;
  /** Feature list font weight */
  featureWeight?: string;
  /** Feature list text color */
  featureColor?: string;
  /** Space between features */
  featureSpacing?: string;
  /** Additional feature classes */
  featureClasses?: string;
  /** Show check icons */
  showFeatureIcons?: boolean;
  /** Check icon source */
  checkIconSrc?: string;
  /** Check icon width */
  featureIconWidth?: number;
  /** Check icon height */
  featureIconHeight?: number;
  /** Feature hover effect */
  featureHoverEffect?: boolean;
  /** Space between icon and text */
  featureIconSpacing?: string;

  // === DIVIDER SECTION ===
  /** Show/hide divider */
  showDivider?: boolean;
  /** Divider styling classes */
  dividerStyle?: string;
  /** Divider spacing (margin) */
  dividerWidth?: string;
  /** Divider height */
  dividerHeight?: string;

  // === HOVER EFFECTS ===
  /** Enable all hover effects */
  enableHoverEffects?: boolean;
  /** Hover transform effect */
  hoverTransform?: string;
  /** Hover transition duration */
  hoverTransition?: string;
  /** Show hover overlay */
  hoverOverlay?: boolean;
  /** Hover overlay gradient */
  overlayGradient?: string;

  // === SPECIAL EFFECTS ===
  /** Mark as professional plan */
  isProfessionalPlan?: boolean;
  /** Enable professional glow effect */
  professionalGlow?: boolean;
  showCheckboxes?: boolean;
  isCurrentPlan?: boolean;
  checkedFeatures?: Record<string, boolean>;
  onFeatureCheck?: (feature: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  // Required props
  title,
  showFeature,
  description,
  price,
  period,
  percentage, // ADDED THIS LINE
  isCurrentPlan,
  showBorder = true,
  onBuyNow,
  buttonText,
  features,

  // Card container defaults - UPDATED
  bgColor = "bg-white bg-opacity-80", // Changed from "bg-black"
  textColor = "text-black", // Changed from "text-white"
  padding = "px-6 py-4",
  cardMaxWidth = "w-full max-w-[399px]",
  cardRadius = "rounded-[24px]", // Changed from "rounded-2xl"
  cardShadow = "shadow-lg",
  borderStyle = "border border-[#FDD5B6]", // Changed from complex border

  // Border color defaults - UPDATED
  defaultBorderColor = "#FDD5B6", // Changed from "#2f3030"
  hoverBorderColor = "#FDD5B6", // You can change this for hover effect
  professionalBorderColor = "#FDD5B6",

  // Header defaults - UPDATED for black text
  titleClass = "text-[24px] leading-[28px]",
  titleWeight = "font-medium",
  titleColor = "text-black", // Added black color
  titleClasses = "",
  descriptionClass = "text-[16px] leading-[20px]",
  descriptionWeight = "font-normal",
  descriptionColor = "text-gray-600", // Changed from "text-[#FFFFFFCC]"
  descriptionClasses = "",
  headerSpacing = "pt-1",

  // Price defaults - UPDATED for black theme
  priceSize = "text-[60px] leading-[68px]",
  priceWeight = "font-medium",
  priceColor = "text-black", // Changed from "text-[#EFFC76]"
  periodSize = "text-[16px] leading-[20px]",
  periodWeight = "font-medium",
  periodColor = "text-gray-600", // Changed from "text-[#FFFFFFCC]"
  periodClasses = "",
  priceSpacing = "mt-[32px]",
  pricePeriodSpacing = "pt-1",

  // Button defaults - UPDATED
  showButton = true,
  buttonBg = "bg-[#11224E]", // Your preferred button color
  buttonTextColor = "text-white",
  buttonClass = "text-[12px]",
  buttonWeight = "font-normal",
  buttonPadding = "py-3 px-6", // Adjusted padding
  buttonRadius = "rounded-full", // Changed to full rounded
  buttonWidth = "w-full",
  buttonSpacing = "my-6",
  buttonClasses = "",
  hoverButtonBg = "bg-white", // Your hover color
  hoverButtonText = "text-[#111827]",

  // Features defaults - UPDATED for black text
  featureSize = "text-[14px] leading-[20px]",
  featureWeight = "font-normal",
  featureColor = "!text-[#111827]", // Added black color
  featureSpacing = "space-y-4", // Increased spacing
  featureClasses = "",
  showFeatureIcons = true,
  checkIconSrc = "/images/check.png",
  featureIconWidth = 18,
  featureIconHeight = 13,
  featureHoverEffect = true,

  // ... rest of your props remain the same
  showDivider = true,
  // Adjusted spacing
  dividerWidth = "w-full",
  dividerHeight = "h-[1px]",

  // Hover defaults
  enableHoverEffects = true,
  hoverTransform = "translateY(-4px)", // Reduced transform
  hoverTransition = "all 0.3s ease",

  // Special effects defaults
  isProfessionalPlan = false,
  showCheckboxes = false,
  checkedFeatures = {},
  onFeatureCheck,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine border color based on props
  const getBorderColor = () => {
    if (!enableHoverEffects) return defaultBorderColor;

    if (isHovered) {
      return hoverBorderColor;
    }

    return isProfessionalPlan ? professionalBorderColor : defaultBorderColor;
  };

  const cardStyle = {
    ...(enableHoverEffects
      ? {
          borderColor: getBorderColor(),
          transform: isHovered ? hoverTransform : "translateY(0)",
          transition: hoverTransition,
        }
      : {}),
    backgroundColor: bgColor?.startsWith("#") ? bgColor : undefined,
  };

  return (
    <div
      style={cardStyle}
      className={`${cardRadius} ${cardMaxWidth} ${
        showBorder ? borderStyle : ""
      } ${cardShadow} ${
        bgColor?.startsWith("#") ? "" : bgColor
      } ${textColor} flex flex-col relative overflow-hidden ${padding} h-full`}
      onMouseEnter={enableHoverEffects ? () => setIsHovered(true) : undefined}
      onMouseLeave={enableHoverEffects ? () => setIsHovered(false) : undefined}
    >
      {/* ---- Current Plan Badge ---- */}
      {isCurrentPlan && (
        <span
          className="
        absolute top-4 right-4 
        bg-[#FEF4ED] text-[#F87B1B]
        heading-7  font-normal 
        px-3 py-1 rounded-[20px] shadow-sm z-20
      "
        >
          Current plan
        </span>
      )}

      {/* Header */}
      <div className="relative z-10">
        <h3
          className={`${titleClass} ${titleWeight} ${titleColor} ${titleClasses}`}
        >
          {title}
        </h3>
        <p
          className={`${descriptionClass} ${descriptionWeight} ${descriptionColor} ${descriptionClasses} ${headerSpacing}`}
        >
          {description}
        </p>
      </div>

      {/* Price */}
      <div className={`${priceSpacing} relative z-10`}>
        <div className="flex items-center gap-3">
          <p className={`${priceSize} ${priceWeight} ${priceColor}`}>{price}</p>

          {percentage && (
            <span
              className={`
            text-sm font-medium px-2 py-1 rounded-[20px]
            ${
              isProfessionalPlan
                ? "bg-white bg-opacity-20 text-[#333]"
                : "bg-[#FEF4ED] text-[#F87B1B]"
            }
          `}
            >
              {percentage}
            </span>
          )}
        </div>

        <span
          className={`${periodSize} ${periodWeight} ${periodColor} ${periodClasses} ${pricePeriodSpacing}`}
        >
          {period}
        </span>
      </div>

      {/* Button */}
      {showButton && (
        <button
          onClick={onBuyNow}
          className={`${buttonSpacing} ${buttonWidth} ${buttonPadding} leading-4  ${buttonRadius} ${buttonClass} ${buttonWeight} ${buttonClasses} cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 relative z-10 ${
            isHovered && enableHoverEffects
              ? `${hoverButtonBg} ${hoverButtonText} shadow-md`
              : `${buttonBg} ${buttonTextColor} shadow-md`
          }`}
        >
          {buttonText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M3.3335 8.00065H12.6668M12.6668 8.00065L8.00016 3.33398M12.6668 8.00065L8.00016 12.6673"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {showDivider && (
        <div
          className={`${dividerHeight} ${dividerWidth} mx-auto relative z-10`}
        ></div>
      )}

      {/* Features */}
      <div className="grow">
        {
          showFeature && (
          <h5 className="heading-5 font-medium text-[#111827] pb-3">Features</h5>
          )
        }
        <ul className={`${featureSpacing} relative z-10 h-full`}>
          {features.map((feature, idx) => (
            <li
              key={idx}
              className={`flex items-start ${featureSize} ${featureWeight} ${featureColor} ${featureClasses} ${
                featureHoverEffect
                  ? "transition-transform duration-300 hover:translate-x-1"
                  : ""
              }`}
            >
              {showCheckboxes ? (
                <div className="shrink-0 mt-0.5 mr-3">
                  <CustomCheckbox
                    checked={checkedFeatures[feature] || false}
                    onChange={() => onFeatureCheck?.(feature)}
                  />
                </div>
              ) : (
                showFeatureIcons && (
                  <div className="shrink-0 mt-0.5 mr-3">
                    <Image
                      width={featureIconWidth}
                      height={featureIconHeight}
                      src={checkIconSrc}
                      alt="check"
                    />
                  </div>
                )
              )}
              <span className="flex-1 whitespace-normal leading-relaxed heading-6 font-normal">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
