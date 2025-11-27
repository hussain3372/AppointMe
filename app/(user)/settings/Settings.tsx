"use client";

import React, { useState } from "react";
import Tabs from "./Tabs";
import AccountPreference from "./AccountPreference";
import OrganizationDetails from "./OrganizationDetails"
import SubscriptionPlans from "./SubscriptionPlans";
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
    label: "Organization branding",
    component: <OrganizationDetails />,
    icon: "/images/branding.svg",
  },
  {
    label: "Billing & subscription",
    component: <SubscriptionPlans />,
    icon: "/images/billing.svg",
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

      <div className="flex items-center max-w-[631px] w-full">
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
