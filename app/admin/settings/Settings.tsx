"use client";

import React, { useState } from "react";
import Tabs from "./Tabs";
import AccountPreference from "./AccountPreference";
import Announcements from "./Announcements";
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
interface TabContent {
  label: string;
  component: React.ReactNode;
  icon: string;
}

const tabContents: TabContent[] = [
  {
    label: "Account preferences",
    component: <AccountPreference />,
    icon: "/images/account.svg",
  },
  {
    label: "Announcements",
    component: <Announcements />,
    icon: "/images/mic-vocal.svg",
  },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
   <div className="space-y-5">
  <div className="space-y-2">
    <h1 className="heading-4 font-medium text-[#111827] ">Settings</h1>
    <p className="heading-5 text-[#70747D]">
      Manage your account, organization, and billing settings.
    </p>
  </div>

  {/* Show button ONLY on Announcements tab */}
  {activeTab === 1 && (
    <div className="flex mt-3 sm:mt-0 sm:items-end sm:justify-end">
      <PrimaryBtn
        fontSize="12px"
        variant="filled"
        label="Create announcement"
        width="fit-content"
        imageSrc="/images/filled-arrow.svg"
        imagePosition="right"
      />
    </div>
  )}

  <div className="flex items-center max-w-[388px] w-full">
    <Tabs
      tabs={tabContents}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  </div>

  <div>{tabContents[activeTab].component}</div>
</div>

  );
};

export default Settings;
