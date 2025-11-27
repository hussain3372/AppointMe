"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import Input from "@/app/ui/Input";
import ConfirmationModal from "@/app/shared/ConfirmationModal";
import { useRouter } from "next/navigation";
const Profile: React.FC = () => {
  const router = useRouter();
  // Profile image
  const [profileImg, setProfileImg] = useState<string>("/images/Avatar.svg");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Inputs state
  const [name, setName] = useState<string>("Julia Smith");
  const [email, setEmail] = useState<string>("Julia@gmail.com");

  // Temporary values while editing
  const [tempName, setTempName] = useState<string>(name);
  const [tempEmail, setTempEmail] = useState<string>(email);

  // Editing mode
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Logout modal
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  // Change image handler
  const handleChangeImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setProfileImg(imageURL);
  };

  // Start Editing
  const startEditing = () => {
    setTempName(name);
    setTempEmail(email);
    setIsEditing(true);
  };

  // Cancel editing - restore previous values
  const cancelEditing = () => {
    setTempName(name);
    setTempEmail(email);
    setIsEditing(false);
  };

  // Save changes
  const saveChanges = () => {
    setName(tempName);
    setEmail(tempEmail);
    setIsEditing(false);
  };

  const confirmLogout = () => {
    console.log("User logged out!");
    setIsLogoutModalOpen(false);

    // Redirect to login page
    router.push("/login");
  };
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h1 className="heading-4 text-[#111827] font-medium">Profile</h1>
        <p className="body-3 text-[#70747D] font-normal">
          Customize your profile and make it truly yours.
        </p>
      </div>

      <div className="bg-[#F6F6F6] p-3 rounded-xl space-y-3">
        {/* Profile Image */}
        <div className="bg-white rounded-xl p-3 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div className="flex items-center gap-5">
            <div>
              <Image
                src={profileImg}
                width={80}
                height={80}
                alt="Avatar"
                className="rounded-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <h1 className="heading-3 font-medium text-[#000000CC]">{name}</h1>
              <p className="text-[#00000066] body-2 font-normal">{email}</p>
            </div>
          </div>

          <div className="flex items-end justify-end">
            <PrimaryBtn
              variant="soft"
              fontSize="12px"
              label="Change photo"
              width="fit-content"
              imageSrc="/images/soft-arrow.svg"
              imagePosition="right"
              onClick={handleChangeImage}
            />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Personal Info */}
        <div className="bg-white rounded-xl p-3 space-y-4">
          <div className="flex items-start justify-between w-full">
            <div className="">
              <h1 className="text-[#000000CC] heading-4 font-medium mb-2">
                Personal Information
              </h1>
              <p className="text-[#00000066] font-normal heading-5">
                Keep your personal information accurate and up to date.
              </p>
            </div>

            {!isEditing && (
              <button
                className="text-[#F87B1B] body-4 border-b border-[#F87B1B] cursor-pointer"
                onClick={startEditing}
              >
                Edit
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-8">
            <Input
              title="Name"
              placeholder="Enter your name"
              className="w-full"
              value={tempName}
              disabled={!isEditing}
              onChange={(e) => setTempName(e.target.value)}
            />

            <Input
              title="Email"
              placeholder="Enter your email"
              className="w-full"
              value={tempEmail}
              disabled={!isEditing}
              onChange={(e) => setTempEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Logout Row */}
        <div
          className="bg-white rounded-xl cursor-pointer p-3 space-y-4"
          onClick={() => setIsLogoutModalOpen(true)}
        >
          <div className="flex items-center justify-between w-full">
            <div className="space-y-2">
              <h1 className="text-[#000000CC] heading-4 font-medium">Logout</h1>
              <p className="text-[#00000066] body-3 font-normal">
                End your current session securely. Logging out ensures your
                information stays private, especially on shared devices.
              </p>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15.9299 11.4573L7.57045 3.4923C7.43097 3.35933 7.24565 3.28516 7.05295 3.28516C6.86024 3.28516 6.67493 3.35933 6.53545 3.4923L6.52645 3.5013C6.4586 3.56576 6.40457 3.64335 6.36765 3.72935C6.33073 3.81535 6.31169 3.90796 6.31169 4.00155C6.31169 4.09514 6.33073 4.18775 6.36765 4.27375C6.40457 4.35975 6.4586 4.43734 6.52645 4.5018L14.3984 12.0018L6.52645 19.4988C6.4586 19.5633 6.40457 19.6408 6.36765 19.7268C6.33073 19.8128 6.31169 19.9055 6.31169 19.999C6.31169 20.0926 6.33073 20.1852 6.36765 20.2712C6.40457 20.3572 6.4586 20.4348 6.52645 20.4993L6.53545 20.5083C6.67493 20.6413 6.86024 20.7154 7.05295 20.7154C7.24565 20.7154 7.43097 20.6413 7.57045 20.5083L15.9299 12.5433C16.0035 12.4733 16.062 12.389 16.102 12.2957C16.142 12.2023 16.1626 12.1018 16.1626 12.0003C16.1626 11.8988 16.142 11.7983 16.102 11.7049C16.062 11.6116 16.0035 11.5273 15.9299 11.4573Z"
                fill="black"
                fillOpacity="0.4"
              />
            </svg>
          </div>
        </div>

        {/* Edit Buttons */}
        {isEditing && (
          <div className="flex flex-col sm:flex-row items-end justify-end gap-3">
            <PrimaryBtn
              fontSize="12px"
              variant="soft"
              label="Go back"
              width="fit-content"
              imageSrc="/images/back-arrow.svg"
              imagePosition="left"
              onClick={cancelEditing}
            />

            <PrimaryBtn
              fontSize="12px"
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

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
        title="Are you sure you want to logout?"
        message="You’ll be signed out of your account and need to log in again to continue."
        icon="/images/logout.svg"
        confirmText="Logout"
        cancelText="Go back"
      />
    </div>
  );
};

export default Profile;
