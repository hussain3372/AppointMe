"use client";
import LightBtn from "@/app/ui/buttons/LightButton";
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import Checkbox from "@/app/ui/Checkbox";
import Input from "@/app/ui/Input";
import Image from "next/image";
import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AnnouncementPublishDrawerProps {
  onClose: () => void;

  // Only update logic (no add)
  onUpdatePlan?: (data: {
    title: string;
    description: string;
    logo: string | null;
    publishOptions: string[];
    publishDate?: Date | null;
    publishTime?: string;
  }) => void;

  // Initial data when editing
  initialData?: {
    title: string;
    description: string;
    logo: string | null;
    publishOptions: string[];
    publishDate?: Date | null;
    publishTime?: string;
  };
}

interface FormErrors {
  title?: string;
  description?: string;
  publishOptions?: string;
}

export default function AnnouncementScheduleDrawer({
  onClose,
  onUpdatePlan,
  initialData,
}: AnnouncementPublishDrawerProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [logo, setLogo] = useState<string | null>(initialData?.logo || null);
  const [publishOptions, setPublishOptions] = useState<string[]>(
    initialData?.publishOptions || []
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [startDate] = useState<Date | null>(initialData?.publishDate || null);
  const [selectedTime] = useState(initialData?.publishTime || "");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const publishList = ["Publish now", "Schedule for later"];

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (publishOptions.length === 0)
      newErrors.publishOptions = "Select at least one publish option";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  const togglePublish = (option: string) => {
    setPublishOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = () => {
    if (!validate()) return;

    // **Only update logic**
    onUpdatePlan?.({
      title,
      description,
      logo,
      publishOptions,
      publishDate: startDate,
      publishTime: selectedTime,
    });
  };

  return (
    <div className="flex p-5 flex-col h-full justify-between overflow-hidden">
      <div className="space-y-8 overflow-y-auto overflow-x-hidden pr-2">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h4 className="heading-4 font-medium text-[#111827]">
              Edit announcement
            </h4>
            <p className="heading-6 font-normal text-[#70747D]">
              Update your announcement details.
            </p>
          </div>
        </div>

        {/* TITLE */}
        <div className="space-y-2">
          <Input
            title="Title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <Input
            title="Description"
            placeholder="Add description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* IMAGE UPLOAD */}
        <div
          className="relative border border-dashed border-[#F87B1B] rounded-[10px] bg-[#FEEFE4] p-5 h-40 flex items-center cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="flex items-center gap-4 flex-1">
            <Image
              src={logo || "/images/static.svg"}
              alt="Logo Preview"
              width={140}
              height={90}
              className="rounded-md object-cover"
            />

            <div className="flex flex-col justify-between h-full">
              <h5 className="heading-5 font-medium text-[#111827] py-3">
                Screenshot-89764
              </h5>

              <p className="text-sm text-[#414652] break-all">
                {logo
                  ? logo.length > 30
                    ? logo.slice(0, 30) + "..."
                    : logo
                  : "https://static-url.com"}
              </p>

              <button
                type="button"
                className="heading-6 font-regular text-[#F87B1B] underline cursor-pointer mt-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUploadClick();
                }}
              >
                Replace
              </button>
            </div>
          </div>

          {logo && (
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setLogo(null);
              }}
            >
              <Image
                src="/images/delete-publish.svg"
                alt="Delete"
                width={20}
                height={20}
              />
            </div>
          )}
        </div>

        {/* PUBLISH OPTIONS */}
        <div className="space-y-3">
          <h5 className="heading-5 font-medium text-[#111827]">
            Publish options
          </h5>
          {errors.publishOptions && (
            <p className="text-red-500 text-sm">{errors.publishOptions}</p>
          )}
          <div className="grid grid-cols-2 gap-4">
            {publishList.map((item) => (
              <div
                key={item}
                className="bg-[#F6F6F6] rounded-lg flex justify-between p-3"
              >
                <p className="heading-6 text-[#414652]">{item}</p>
                <Checkbox
                  checked={publishOptions.includes(item)}
                  onChecked={() => togglePublish(item)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex gap-3 w-full">
        <LightBtn
          imageSrc="/images/arrow-left.svg"
          imagePosition="left"
          label="Go back"
          onClick={onClose}
        />
        <PrimaryBtn
          imageSrc="/images/arrow-right.svg"
          imagePosition="right"
          label="Publis "
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
