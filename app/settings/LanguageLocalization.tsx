import React, { useState } from "react";
import Input from "../ui/Input";
import PrimaryBtn from "../ui/buttons/PrimaryBtn";
const LanguageLocalization: React.FC = () => {
  // Actual values (saved)
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("+5 GMT");
  const [dateFormat, setDateFormat] = useState("MM/DD/YY");

  // Temporary values while editing
  const [tempLanguage, setTempLanguage] = useState(language);
  const [tempTimezone, setTempTimezone] = useState(timezone);
  const [tempDateFormat, setTempDateFormat] = useState(dateFormat);

  // Editing mode
  const [isEditing, setIsEditing] = useState(false);

  // Start editing
  const startEditing = () => {
    setTempLanguage(language);
    setTempTimezone(timezone);
    setTempDateFormat(dateFormat);
    setIsEditing(true);
  };

  // Cancel editing
  const cancelEditing = () => {
    setTempLanguage(language);
    setTempTimezone(timezone);
    setTempDateFormat(dateFormat);
    setIsEditing(false);
  };

  // Save changes
  const saveChanges = () => {
    setLanguage(tempLanguage);
    setTimezone(tempTimezone);
    setDateFormat(tempDateFormat);
    setIsEditing(false);
  };

  return (
    <div className="bg-[#F6F6F6] rounded-lg p-6 space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h2 className="heading-4 font-medium mb-0 text-[#333]">
          Language & localization
        </h2>

        {!isEditing && (
        <button className="text-[#F87B1B] body-4  font-normal hover:underline"
            onClick={startEditing}
          >
            Edit
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        <Input
          as="select"
          title="Language"
          options={["Choose language", "English", "Spanish", "French"]}
          className="w-full"
          value={tempLanguage}
          disabled={!isEditing}
          onChange={(e) => setTempLanguage(e.target.value)}
        />

        <Input
          as="select"
          title="Time Zone"
          options={["+5 GMT", "+6 GMT"]}
          className="w-full"
          value={tempTimezone}
          disabled={!isEditing}
          onChange={(e) => setTempTimezone(e.target.value)}
        />

        <Input
          as="select"
          title="Date Format"
          options={["MM/DD/YY", "DD/MM/YY"]}
          className="w-full"
          value={tempDateFormat}
          disabled={!isEditing}
          onChange={(e) => setTempDateFormat(e.target.value)}
        />
      </div>

      {/* Edit Buttons */}
    {isEditing && (
  <div className="flex flex-col sm:flex-row items-end justify-end gap-3">

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

export default LanguageLocalization;
