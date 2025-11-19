import React, {
  useState,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  useRef,
} from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import PrimaryBtn from "../ui/buttons/PrimaryBtn";

// Input Component (same as provided)
interface BaseInputProps {
  title: string;
  className?: string;
  spanClassName?: string;
}

interface InputOnlyProps extends BaseInputProps {
  as?: "input";
  type?: HTMLInputElement["type"];
  options?: never;
}

interface SelectOnlyProps extends BaseInputProps {
  as: "select";
  options: string[];
  type?: never;
}

type InputProps =
  | (InputOnlyProps & InputHTMLAttributes<HTMLInputElement>)
  | (SelectOnlyProps & SelectHTMLAttributes<HTMLSelectElement>);

const Input: React.FC<InputProps> = ({
  title,
  className,
  spanClassName,
  as = "input",
  options = [],
  type,
  disabled = false,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const commonClasses = `text-[#222] text-[12px] font-medium leading-4 border border-[#DDDDDD] rounded-xl focus:outline-none focus:border-orange-500 focus:ring-offset-1 px-3 py-4 bg-white ${
    disabled ? "bg-gray-100 text-gray-500" : ""
  } ${className || ""}`;

  return (
    <div className="relative w-full">
      {as === "input" ? (
        <input
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          type={inputType}
          className={commonClasses}
          disabled={disabled}
        />
      ) : (
        <select
          {...(rest as SelectHTMLAttributes<HTMLSelectElement>)}
          className={commonClasses}
          disabled={disabled}
        >
          {options.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      <span
        className={`bg-white absolute left-3 -top-2 py-0 px-1.5 text-[12px] font-normal leading-4 ${
          disabled ? "text-gray-400" : "text-[#22222299]"
        } ${spanClassName || ""}`}
      >
        {title}
      </span>

      {type === "password" && !disabled && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  );
};

// Organization Details Component
const OrganizationDetails: React.FC = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Actual values (saved)
  const [companyName, setCompanyName] = useState<string>("Tech Corp");
  const [organizationId, setOrganizationId] = useState<string>("ORG-12345");
  const [industry, setIndustry] = useState<string>("Technology");
  const [websiteUrl, setWebsiteUrl] = useState<string>("www.techcorp.com");
  const [email, setEmail] = useState<string>("contact@techcorp.com");
  const [phoneNumber, setPhoneNumber] = useState<string>("+1 234 567 8900");

  // Temporary values while editing
  const [tempCompanyName, setTempCompanyName] = useState<string>(companyName);
  const [tempOrganizationId, setTempOrganizationId] = useState<string>(organizationId);
  const [tempIndustry, setTempIndustry] = useState<string>(industry);
  const [tempWebsiteUrl, setTempWebsiteUrl] = useState<string>(websiteUrl);
  const [tempEmail, setTempEmail] = useState<string>(email);
  const [tempPhoneNumber, setTempPhoneNumber] = useState<string>(phoneNumber);

  // Editing mode
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // File upload handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    if (isEditing) {
      document.getElementById("logo-upload")?.click();
    }
  };

  // Start editing
  const startEditing = () => {
    setTempCompanyName(companyName);
    setTempOrganizationId(organizationId);
    setTempIndustry(industry);
    setTempWebsiteUrl(websiteUrl);
    setTempEmail(email);
    setTempPhoneNumber(phoneNumber);
    setIsEditing(true);
  };

  // Cancel editing - restore previous values
  const cancelEditing = () => {
    setTempCompanyName(companyName);
    setTempOrganizationId(organizationId);
    setTempIndustry(industry);
    setTempWebsiteUrl(websiteUrl);
    setTempEmail(email);
    setTempPhoneNumber(phoneNumber);
    setIsEditing(false);
  };

  // Save changes
  const saveChanges = () => {
    setCompanyName(tempCompanyName);
    setOrganizationId(tempOrganizationId);
    setIndustry(tempIndustry);
    setWebsiteUrl(tempWebsiteUrl);
    setEmail(tempEmail);
    setPhoneNumber(tempPhoneNumber);
    setIsEditing(false);
  };

  return (
    <div className="w-full bg-white mb-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-[#333] heading-4 font-medium">
          Organization details
        </h1>
        {!isEditing && (
          <button
            className="text-[#F87B1B] body-4 font-normal hover:underline cursor-pointer"
            onClick={startEditing}
          >
            Edit
          </button>
        )}
      </div>

      {/* Form Fields - First Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Input
          title="Company name"
          placeholder="Enter name"
          className="w-full"
          value={tempCompanyName}
          disabled={!isEditing}
          onChange={(e) => setTempCompanyName(e.target.value)}
        />
        <Input
          title="Organization ID"
          placeholder="Enter ID"
          className="w-full"
          value={tempOrganizationId}
          disabled={!isEditing}
          onChange={(e) => setTempOrganizationId(e.target.value)}
        />
        <Input
          as="select"
          title="Industry"
          options={["Choose industry", "Technology", "Healthcare", "Finance", "Education"]}
          className="w-full"
          value={tempIndustry}
          disabled={!isEditing}
          onChange={(e) => setTempIndustry(e.target.value)}
        />
      </div>

      {/* Form Fields - Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          title="Website url"
          placeholder="Enter URL"
          type="url"
          className="w-full"
          value={tempWebsiteUrl}
          disabled={!isEditing}
          onChange={(e) => setTempWebsiteUrl(e.target.value)}
        />
        <Input
          title="Email"
          placeholder="Enter email"
          type="email"
          className="w-full"
          value={tempEmail}
          disabled={!isEditing}
          onChange={(e) => setTempEmail(e.target.value)}
        />
        <Input
          title="Phone number"
          placeholder="Enter number"
          type="tel"
          className="w-full"
          value={tempPhoneNumber}
          disabled={!isEditing}
          onChange={(e) => setTempPhoneNumber(e.target.value)}
        />
      </div>

      {/* Upload Logo Section */}
      <div
        className={`border border-dashed border-[#F87B1B] rounded-[10px] bg-[#FEEFE4] p-5 text-center transition-colors ${
          isEditing 
            ? "hover:bg-[#FFE8DC] cursor-pointer" 
            : "cursor-default"
        }`}
        onDragOver={isEditing ? handleDragOver : undefined}
        onDrop={isEditing ? handleDrop : undefined}
        onClick={handleUploadClick}
      >
        <input
          id="logo-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={!isEditing}
        />

        {logo ? (
          <div className="flex flex-col items-center">
            <Image
              src="/images/upload.svg"
              width={24}
              height={24}
              alt="Arrow"
            />
            <p className="text-[#FF6B2C] text-sm font-medium">
              Click to change logo
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-3">
              <Image
                src="/images/upload.svg"
                width={40}
                height={40}
                alt="Arrow"
              />
            </div>
            <h3 className="text-[#111827] heading-5 font-medium mb-1">
              Upload logo
            </h3>
            <p className="text-[#70747D] text-sm font-normal body-5">
              Drag and drop your logo/favicon here or click to upload
            </p>
          </div>
        )}
      </div>

      {/* Edit Buttons */}
      {isEditing && (
        <div className="flex flex-col sm:flex-row items-end justify-end gap-3 mt-6">
          <PrimaryBtn
            variant="soft"
            label="Go back"
            width="fit-content"
            imageSrc="/images/back-arrow.svg"
            imagePosition="left"
            onClick={cancelEditing}
          />

          <PrimaryBtn
            variant="filled"
            label="Save changes"
            width="fit-content"
            imageSrc="/images/filled-arrow.svg"
            imagePosition="right"
            onClick={saveChanges}
          />
        </div>
      )}
    </div>
  );
};

export default OrganizationDetails;