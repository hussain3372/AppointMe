"use client";
import React, { useEffect, useRef, useState } from "react";
import LightBtn from "@/app/ui/buttons/LightButton";
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import Input from "@/app/ui/Input";
import { Dropdown } from "@/app/shared/Dropdown";
import Image from "next/image";
import toast from "react-hot-toast";
import { Meeting } from "./MeetingPage";

interface DropdownOption {
  value: string;
  label: string;
}

interface Participant {
  id: string;
  email: string;
}

interface MeetingDrawerProps {
  onClose: () => void;
  onAddMeeting: (meeting: Meeting) => void;
}

export default function MeetingDrawer({
  onClose,
  onAddMeeting,
}: MeetingDrawerProps) {
  const [followUpsOpen, setFollowUpsOpen] = useState(false);
  const [selectedFollowUps, setSelectedFollowUps] = useState("");
  const followUpsRef = useRef<HTMLDivElement>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [meetingType, setMeetingType] = useState<"zoom" | "teams">("zoom");
  const [participantInput, setParticipantInput] = useState<string>("");
  const [participants, setParticipants] = useState<Participant[]>([]);

  const startTimeRef = useRef<HTMLInputElement | null>(null);
  const endTimeRef = useRef<HTMLInputElement | null>(null);

  const followUpsOptions: DropdownOption[] = [
    { value: "1", label: "1h" },
    { value: "2", label: "2h" },
    { value: "3", label: "3h" },
    { value: "4", label: "4h" },
    { value: "5", label: "5h" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        followUpsRef.current &&
        !followUpsRef.current.contains(event.target as Node)
      ) {
        setFollowUpsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatTimeForDisplay = (timeString: string) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleAddParticipant = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && participantInput.trim()) {
      e.preventDefault();
      setParticipants((prev) => [
        ...prev,
        { id: Date.now().toString(), email: participantInput.trim() },
      ]);
      setParticipantInput("");
    }
  };

  const handleRemoveParticipant = (id: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCreateMeeting = () => {
    if (!title || !startTime || !endTime) {
      toast.error("Please fill all fields");
      return;
    }

    const start = new Date();
    start.setHours(parseInt(startTime.split(":")[0]));
    start.setMinutes(parseInt(startTime.split(":")[1]));

    const end = new Date();
    end.setHours(parseInt(endTime.split(":")[0]));
    end.setMinutes(parseInt(endTime.split(":")[1]));

    const newMeeting: Meeting = {
      id: Date.now().toString(),
      title,
      start,
      end,
      type: meetingType,
      color: meetingType === "zoom" ? "blue" : "green",
      link:
        meetingType === "zoom"
          ? "https://zoom.us/j/123456789"
          : "https://teams.microsoft.com/l/meetup-join/abcdef",
    };

    onAddMeeting(newMeeting);
    onClose();
    toast.success("Meeting added to calendar");
  };

  return (
    <div className="p-5 flex flex-col justify-between h-full">
      <div className="space-y-8 flex-1">
        <div className="space-y-1">
          <h4 className="heading-4 font-medium text-[#111827] ">
            Book a meeting
          </h4>
          <p className="heading-6 font-regular text-[#70747D]">
            Create or share a meeting invite with your lead.
          </p>
        </div>

        <div className="space-y-4">
          <Input
            title="Meeting title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            title="Note"
            placeholder="Add Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <Dropdown
            isOpen={followUpsOpen}
            onToggle={() => setFollowUpsOpen(!followUpsOpen)}
            options={followUpsOptions}
            selectedValue={selectedFollowUps}
            onSelect={setSelectedFollowUps}
            placeholder="Choose duration"
            title="Duration"
            ref={followUpsRef}
          />

          <div className="flex gap-4">
            <div
              className="relative w-full"
              onClick={() => startTimeRef.current?.showPicker()}
            >
              <Input
                title="Start time"
                placeholder="Choose start time"
                value={formatTimeForDisplay(startTime)}
                readOnly
              />
              <input
                ref={startTimeRef}
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            <div
              className="relative w-full"
              onClick={() => endTimeRef.current?.showPicker()}
            >
              <Input
                title="End time"
                placeholder="Choose end time"
                value={formatTimeForDisplay(endTime)}
                readOnly
              />
              <input
                ref={endTimeRef}
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h5 className="heading-5 font-medium text-[#111827]">Participants</h5>
          <Input
            title="Participant"
            placeholder="Enter participant and press Enter"
            value={participantInput}
            onChange={(e) => setParticipantInput(e.target.value)}
            onKeyDown={handleAddParticipant}
          />
          {participants.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {participants.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-2 bg-[#F3F4F6] px-3 py-2 rounded-lg max-w-[200px] relative"
                >
                  <span className="text-sm text-[#111827] truncate flex-1">
                    {p.email}
                  </span>
                  <button
                    onClick={() => handleRemoveParticipant(p.id)}
                    className="text-red-500 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h5 className="heading-5 font-medium">Location</h5>
          <div className="flex flex-wrap gap-3">
            <div className="p-2 flex items-center rounded-md gap-2 bg-[#FEF4ED]">
              <Image
                src="/images/google-meet.png"
                alt="Google meet"
                height={24}
                width={24}
              />
              <p className="heading-7 font-regular text-[#111827]">
                Google Meet
              </p>
            </div>
            <div className="p-2 flex items-center rounded-md gap-2 bg-[#FEF4ED]">
              <Image
                src="/images/zoom.png"
                alt="Google meet"
                height={24}
                width={24}
              />
              <p className="heading-7 font-regular text-[#111827]">
                Google Meet
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="flex gap-3 pt-6 mt-6">
        <LightBtn
          label="Go back"
          imageSrc="/images/arrow-left.svg"
          imagePosition="left"
          onClick={onClose}
        />
        <PrimaryBtn
        fontSize="12px"
          label="Create"
          imageSrc="/images/arrow-right.svg"
          imagePosition="right"
          onClick={handleCreateMeeting}
        />
      </div>
    </div>
  );
}
