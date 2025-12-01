"use client";
import LightBtn from "@/app/ui/buttons/LightButton";
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import Checkbox from "@/app/ui/Checkbox";
import Input from "@/app/ui/Input";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AnnouncementScheduleDrawerProps {
  onClose: () => void;
  onAddPlan: (data: {
    title: string;
    description: string;
    logo: string | null;
    publishOptions: string[];
    publishDate?: Date | null;
    publishTime?: string;
  }) => void;
}

interface FormErrors {
  title?: string;
  description?: string;
  publishOptions?: string;
}

export default function AnnouncementScheduleDrawer({
  onClose,
  onAddPlan,
}: AnnouncementScheduleDrawerProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState<string | null>(null);
  const [publishOptions, setPublishOptions] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const datePickerRef = useRef<DatePicker | null>(null);
  const timeInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const togglePublish = (option: string) => {
    setPublishOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onAddPlan({
      title,
      description,
      logo,
      publishOptions,
      publishDate: startDate,
      publishTime: selectedTime,
    });
  };

  const handleDateInputClick = () => {
    datePickerRef.current?.setFocus();
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
  };

  const formatTimeForDisplay = (timeString: string) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="flex p-5 flex-col h-full justify-between overflow-hidden">
      <div className="space-y-8 overflow-y-auto overflow-x-hidden pr-2">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h4 className="heading-4 font-medium text-[#111827]">
              Create announcement
            </h4>
            <p className="heading-6 font-normal text-[#70747D]">
              Give your announcement a clear, descriptive title.
            </p>
          </div>

          <p className="heading-6 font-regular text-[#F87B1B] underline cursor-pointer">
            Save as draft
          </p>
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

        {/* LOGO UPLOAD */}
        <div
          className="border border-dashed border-[#F87B1B] rounded-[10px] bg-[#FEEFE4] p-5 text-center cursor-pointer"
          onClick={handleUploadClick}
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

          {logo ? (
            <div className="flex flex-col items-center">
              <Image
                src={logo}
                alt="Logo Preview"
                width={60}
                height={60}
                className="rounded-md object-cover"
              />
              <p className="text-[#FF6B2C] text-sm mt-2">
                Click to change logo
              </p>
            </div>
          ) : (
            <>
              <Image
                src="/images/upload.svg"
                width={40}
                height={40}
                alt="Upload"
                className="mx-auto mb-2"
              />
              <h3 className="heading-5 font-medium text-[#111827]">
                Attach Image(optional)
              </h3>
              <p className="text-[#70747D] text-sm">
                Upload file in png, jpeg, and pdf
              </p>
            </>
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
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
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

        {/* SCHEDULE */}
        <h1 className="font-medium body-3 text-[#111827]">Schedule</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* DATE PICKER */}
          <div className="relative z-10">
            <div onClick={handleDateInputClick} className="cursor-pointer">
              <Input
                title="Publish date"
                placeholder="Choose date"
                className="w-full cursor-pointer bg-white"
                value={startDate ? startDate.toLocaleDateString() : ""}
                readOnly
              />
            </div>
            <DatePicker
              ref={datePickerRef}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Enter Start date"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              popperPlacement="top-start"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              wrapperClassName="absolute top-0 left-0 w-full"
              calendarClassName="!z-[9999]"
            />
            <Image
              src="/images/calender.svg"
              alt="Select date"
              height={20}
              width={20}
              className="absolute top-3 right-3 pointer-events-none z-20"
            />
          </div>

          {/* TIME PICKER */}
          <div className="relative pb-5">
            <div
              className="cursor-pointer"
              onClick={() => timeInputRef.current?.showPicker()}
            >
              <Input
                title="Publish time"
                placeholder="Choose time"
                className="w-full cursor-pointer"
                value={formatTimeForDisplay(selectedTime)}
                readOnly
              />
            </div>
            <input
              ref={timeInputRef}
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Image
              src="/images/clock.svg"
              alt="Select time"
              height={20}
              width={20}
              className="absolute top-3 right-3 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex gap-3 w-full ">
        <LightBtn
          imageSrc="/images/arrow-left.svg"
          imagePosition="left"
          label="Go back"
          onClick={onClose}
        />
        <PrimaryBtn
          imageSrc="/images/arrow-right.svg"
          imagePosition="right"
          label="Schedule"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
