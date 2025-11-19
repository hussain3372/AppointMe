"use client";

import React from "react";
import ToggleButton from "../shared/ToggleButton";
import Image from "next/image";
import SecuritySettings from "./SecuritySettings";
import LanguageLocalization from "./LanguageLocalization";
import AccountManagement from "./AccountManagement";

interface NotificationItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const notifications: NotificationItem[] = [
  {
    id: 1,
    icon: (
      <Image
        src="/images/bell.png"
        width={24}
        height={24}
        alt="In app notifications"
      />
    ),
    title: "In app notifications",
    description:
      "Get instant alerts within the app about new leads, campaign updates, and account activity.",
  },
  {
    id: 2,
    icon: (
      <Image
        src="/images/mail-plus.png"
        width={24}
        height={24}
        alt="Email Notifications"
      />
    ),
    title: "Email Notifications",
    description:
      "Receive updates and reports in your inbox to stay informed wherever you are.",
  },
  {
    id: 3,
    icon: (
      <Image
        src="/images/globe.png"
        width={24}
        height={24}
        alt="Browser Push Notifications"
      />
    ),
    title: "Browser Push Notifications",
    description:
      "Enable quick desktop alerts for real-time campaign and lead updates.",
  },
];

const AccountPreference: React.FC = () => {
  return (
    <div className="space-y-5">
      <div className="bg-[#F6F6F6] rounded-lg shadow p-3 space-y-3 ">
        <h2 className="heading-4  font-medium mb-5 text-[#333]">
          Notification Preferences
        </h2>
        <div className="space-y-1">
          {notifications.map((item) => (
            <div key={item.id} className="flex justify-between items-start">
              <div className="flex gap-5 items-start">
                <div className="flex items-center justify-center h-12">
                  {item.icon}
                </div>
                <div className="py-1">
                  <h3 className="font-medium heading-5 text-[#111827] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[#70747D] text-normal body-4">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center h-12">
                <ToggleButton />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-5 ">
        <SecuritySettings />
        <LanguageLocalization />
        <AccountManagement />
      </div>
    </div>
  );
};

export default AccountPreference;