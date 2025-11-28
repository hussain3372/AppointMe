"use client";

import { useState } from "react";
import Image from "next/image";
import StatusPills from "@/app/ui/StatusPills";
import ActionDropdown from "@/app/shared/ActionDropdown";

// ------------ DATA ------------
interface ActivityCard {
  id: number;
  icon: string;
  iconBg: string;
  status: "green" | "orange" | "blue";
  statusLabel: string;
  title: string;
  description: string;
  time: string;
}

interface Meeting {
  id: number;
  title: string;
  description: string;
  time: string;
  duration: string;
  attendees: string;
}

interface AnnouncementsProps {
  filterValues?: {
    status: string;
    date: string;
  };
}

const announcementsData: ActivityCard[] = [
  {
    id: 1,
    icon: "/images/mic-published.svg",
    iconBg: "#4FB3D21F",
    status: "green",
    statusLabel: "Published",
    title: "New leads follow-up",
    description: "Your follow-up sequence will start tomorrow at 9:00 AM.",
    time: "30 min ago",
  },
  {
    id: 2,
    icon: "/images/rocket-purple.png",
    iconBg: "#FFF0F6",
    status: "blue",
    statusLabel: "Scheduled",
    title: "New leads follow-up",
    description: "Your follow-up sequence will start tomorrow at 9:00 AM.",
    time: "1 day ago",
  },
  {
    id: 3,
    icon: "/images/mic-draft.svg",
    iconBg: "#FFF9E6",
    status: "orange",
    statusLabel: "Draft",
    title: "New leads follow-up",
    description: "Your follow-up sequence will start tomorrow at 9:00 AM.",
    time: "1 day ago",
  },
  {
    id: 4,
    icon: "/images/mic-published.svg",
    iconBg: "#4FB3D21F",
    status: "green",
    statusLabel: "Published",
    title: "New leads follow-up",
    description: "Your follow-up sequence will start tomorrow at 9:00 AM.",
    time: "30 min ago",
  },
  {
    id: 5,
    icon: "/images/mic-draft.svg",
    iconBg: "#E5D5211F",
    status: "orange",
    statusLabel: "Draft",
    title: "New leads follow-up",
    description: "Your follow-up sequence will start tomorrow at 9:00 AM.",
    time: "1 day ago",
  },
  {
    id: 6,
    icon: "/images/mic-secdule.svg",
    iconBg: "#4FB3D21F",
    status: "blue",
    statusLabel: "Scheduled",
    title: "New leads follow-up",
    description: "Your follow-up sequence will start tomorrow at 9:00 AM.",
    time: "1 day ago",
  },
  {
    id: 7,
    icon: "/images/mic-secdule.svg",
    iconBg: "#E861F41F",
    status: "blue",
    statusLabel: "Scheduled",
    title: "New leads follow-up",
    description: "Your follow-up sequence will start tomorrow at 9:00 AM.",
    time: "1 day ago",
  },
  {
    id: 8,
    icon: "/images/mic-published.svg",
    iconBg: "#4FB3D21F",
    status: "green",
    statusLabel: "Published",
    title: "New leads follow-up",
    description: "Your follow-up sequence will start tomorrow at 9:00 AM.",
    time: "30 min ago",
  },
  {
    id: 9,
    icon: "/images/mic-draft.svg",
    iconBg: "#E5D5211F",
    status: "orange",
    statusLabel: "Draft",
    title: "New leads follow-up",
    description: "Your follow-up sequence will start tomorrow at 9:00 AM.",
    time: "1 day ago",
  },
];

const meetingActions = (meeting: Meeting) => (
  <ul className="py-1 text-sm text-gray-700">
    <li>
      <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
        View
      </button>
    </li>
    <li>
      <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
        Edit
      </button>
    </li>
    <li>
      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">
        Delete
      </button>
    </li>
  </ul>
);

const Announcements: React.FC<AnnouncementsProps> = ({
  filterValues = { status: "", date: "" },
}) => {
  // -------- FILTER LOGIC --------
  const filteredData = announcementsData.filter((item) => {
    // Status filter logic
    const matchStatus = (() => {
      switch (filterValues.status) {
        case "Draft":
          return item.statusLabel === "Draft";
        case "Scheduled":
          return item.statusLabel === "Scheduled";
        case "Published":
          return item.statusLabel === "Published";
        case "All":
        case "":
          return true;
        default:
          return item.statusLabel === filterValues.status;
      }
    })();

    // Date filter logic
    const matchDate = (() => {
      switch (filterValues.date) {
        case "1 day ago":
          return item.time.includes("1 day ago");
        case "30 min ago":
          return item.time.includes("30 min ago");
        case "All":
        case "":
          return true;
        default:
          return true;
      }
    })();

    return matchStatus && matchDate;
  });

  return (
    <div className="sm:mb-[148px] mb-5">
      {/* -------- CARDS GRID -------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 rounded-lg bg-[#EEEEEE66] p-4">
        {filteredData.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow-sm p-3 flex flex-col justify-between"
          >
            {/* Top Row */}
            <div className="flex justify-between items-start mb-5">
              <div
                className="p-2 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: card.iconBg }}
              >
                <Image
                  src={card.icon}
                  alt="activity icon"
                  width={20}
                  height={20}
                />
              </div>

              <StatusPills label={card.statusLabel} variant={card.status} />
            </div>

            {/* Title + Description */}
            <div className="mb-5">
              <h3 className="font-medium body-3 text-[#111827] mb-1">
                {card.title}
              </h3>
              <p className="text-[#A0A3A9] font-normal heading-7">
                {card.description}
              </p>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between text-xs mt-auto">
              <p className="text-[#A0A3A9] font-normal body-5">{card.time}</p>

              <ActionDropdown row={card} actions={meetingActions} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
