"use client";

import React, { useState } from "react";
import Tabs from "./Tabs";
import AccountPreference from "./AccountPreference";
import Announcements from "./Announcements";
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import FilterDropdown from "../../shared/FilterDropdown";
import { AnimatePresence, motion } from "framer-motion";
import AnnouncementScheduleDrawer from "./AnnouncementScheduleDrawer";
import AnnouncementPublishDrawer from "./AnnouncementPublishDrawer";

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
    component: <Announcements filterValues={{ status: "", date: "" }} />,
    icon: "/images/mic-vocal.svg",
  },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isScheduleDrawerOpen, setIsScheduleDrawerOpen] = useState(false);
  const [isPublishDrawerOpen, setIsPublishDrawerOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [filterValues, setFilterValues] = useState<{
    status: string;
    date: string;
  }>({
    status: "",
    date: "",
  });

  const filters = [
    {
      key: "status",
      label: "Status",
      options: ["All", "Draft", "Scheduled", "Published"],
    },
    {
      key: "date",
      label: "Date",
      options: ["All", "1 day ago", "30 min ago"],
    },
  ];

  /* ------------- DRAWER HANDLERS ------------- */
  const handleOpenScheduleDrawer = () => setIsScheduleDrawerOpen(true);
  const handleCloseScheduleDrawer = () => setIsScheduleDrawerOpen(false);

  const handleScheduleSubmit = (data: any) => {
    console.log("Schedule data:", data);
    setEditingPlan(data); // <-- add this
    setIsScheduleDrawerOpen(false);
    setIsPublishDrawerOpen(true);
  };

  const handleClosePublishDrawer = () => setIsPublishDrawerOpen(false);

  const handleAddNewPlan = (data: any) => {
    // keep the data for publish drawer
    handleScheduleSubmit(data);
  };

  const extractPlanDataForEdit = (plan: any) => {
    return { ...plan };
  };

  const handleUpdatePlan = (updatedData: any) => {
    console.log("Updated plan:", updatedData);
    handleClosePublishDrawer();
  };

  return (
    <div className="space-y-5">
      {/* ---------- Header + Button ---------- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3">
        <div className="space-y-2">
          <h1 className="heading-4 font-medium text-[#111827]">Settings</h1>
          <p className="heading-5 text-[#70747D]">
            Manage your account, organization, and billing settings.
          </p>
        </div>

        {activeTab === 1 && (
          <PrimaryBtn
            fontSize="12px"
            variant="filled"
            label="Create announcement"
            width="fit-content"
            imageSrc="/images/filled-arrow.svg"
            imagePosition="right"
            onClick={handleOpenScheduleDrawer}
          />
        )}
      </div>

      {/* ---------- Tabs + Filters ---------- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3">
        {/* Tabs */}
        <div className="flex items-center max-w-[388px] w-full">
          <Tabs
            tabs={tabContents}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Filters */}
        {activeTab === 1 && (
          <div className="flex flex-wrap gap-2 justify-end w-full sm:w-auto">
            {filters.map((filter) => (
              <FilterDropdown
                key={filter.key}
                label={filter.label}
                options={filter.options}
                value={
                  filterValues[filter.key as keyof typeof filterValues] || ""
                }
                onChange={(value) =>
                  setFilterValues((prev) => ({
                    ...prev,
                    [filter.key]: value === "All" ? "" : value,
                  }))
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* ---------- Tab Content ---------- */}
      <div>
        {activeTab === 1 ? (
          <Announcements filterValues={filterValues} />
        ) : (
          tabContents[activeTab].component
        )}
      </div>

      {/* ---------- Schedule Drawer ---------- */}
      <AnimatePresence>
        {isScheduleDrawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 min-h-screen bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseScheduleDrawer}
            />
            <motion.div
              className="bg-white w-[91vw] md:w-[40vw] top-0 overflow-auto hide-scrollbar fixed right-0 h-full z-50 pb-5 rounded-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            >
              <AnnouncementScheduleDrawer
                onClose={handleCloseScheduleDrawer}
                onAddPlan={handleAddNewPlan}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ---------- Publish Drawer ---------- */}
      <AnimatePresence>
        {isPublishDrawerOpen && editingPlan && (
          <>
            <motion.div
              className="fixed inset-0 min-h-screen bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClosePublishDrawer}
            />
            <motion.div
              className="bg-white w-[91vw] md:w-[40vw] top-0 overflow-auto hide-scrollbar fixed right-0 h-full z-50 pb-5 rounded-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            >
              <AnnouncementPublishDrawer
                onClose={handleClosePublishDrawer}
                onUpdatePlan={handleUpdatePlan}
                initialData={extractPlanDataForEdit(editingPlan)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
