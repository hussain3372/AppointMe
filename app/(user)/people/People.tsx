"use client";

import React, { useState } from "react";
import PeopleTable from "./PeopleTable";
import { motion, AnimatePresence } from "framer-motion";
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import LightBtn from "@/app/ui/buttons/LightButton";
import Drawer from "./drawer/page";
import ConfirmationModal from "@/app/shared/ConfirmationModal";

interface CampaignDrawerProps {
  campaigns: string[];
  selectedCampaigns?: string[];
  onClose: () => void;
  onSubmit: (selected: string[]) => void;
}

const CampaignDrawer: React.FC<
  CampaignDrawerProps & { openNewDrawer: () => void }
> = ({
  campaigns,
  selectedCampaigns = [],
  onClose,
  onSubmit,
  openNewDrawer,
}) => {
  const [selected, setSelected] = useState<string[]>(selectedCampaigns);

  const toggleCampaign = (campaign: string) => {
    setSelected((prev) =>
      prev.includes(campaign)
        ? prev.filter((c) => c !== campaign)
        : [...prev, campaign]
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/40"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Drawer */}
        <motion.div
          className="relative w-full sm:w-[580px] h-full bg-white rounded-l-lg flex flex-col"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 25 }}
        >
          {/* Scrollable Content */}
          <div className="overflow-auto p-6 flex-1">
            <h2 className="heading-4 font-medium text-[#111827] mb-1">
              Add to campaign
            </h2>
            <p className="text-[#70747D] body-4  mb-8">
              Select a campaign to include these leads and start your outreach.
            </p>

            <div className="flex justify-between items-center mb-6">
              <span className="font-medium heading-5 text-[#111827]">
                Select campaign
              </span>
              <button
                className="text-[#F87B1B] heading-6 font-normal underline cursor-pointer"
                style={{ textUnderlineOffset: "6px" }}
                onClick={openNewDrawer}
              >
                Add new campaign
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              {campaigns.map((campaign) => {
                const checked = selected.includes(campaign);
                return (
                  <div
                    key={campaign}
                    className="flex items-center justify-between p-3 bg-[#F6F6F6] rounded-lg cursor-pointer hover:shadow-sm"
                    onClick={() => toggleCampaign(campaign)}
                  >
                    <span className="text-[#414652] font-normal body-4">
                      {campaign}
                    </span>
                    <div
                      className="w-[18px] h-[18px] cursor-pointer relative"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCampaign(campaign);
                      }}
                    >
                      <div
                        className={`w-full h-full rounded border-2 transition-all ${
                          checked
                            ? "bg-orange-500 border-orange-500"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        {checked && (
                          <div className="relative w-full h-full">
                            {/* Large tick */}
                            <svg
                              className="absolute top-0.5"
                              width="12"
                              height="10"
                              viewBox="0 0 12 10"
                              fill="none"
                            >
                              <path
                                d="M1 5L4.5 8.5L11 1"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {/* Small tick */}
                            <svg
                              className="absolute top-[7px] left-1"
                              width="8"
                              height="6"
                              viewBox="0 0 8 6"
                              fill="none"
                            >
                              <path
                                d="M1 3L3 5L7 1"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex gap-3 p-6 ">
            <LightBtn
              label="Go back"
              color="#11224E"
              imageSrc="/images/arrow-left.svg"
              imagePosition="left"
              onClick={onClose}
            />
            <PrimaryBtn
              label="Add"
              color="#FFFFFF"
              fontSize="12px"
              imageSrc="/images/arrow-right.svg"
              imagePosition="right"
              onClick={() => onSubmit(selected)}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const People = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddNewDrawerOpen, setIsAddNewDrawerOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // Move modal state here

  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const campaigns = [
    "Product launch outreach",
    "Demo request follow-ups",
    "New leads nurturing",
    "Q4 sales pipeline boost",
  ];

  const handleSubmitCampaigns = (selected: string[]) => {
    console.log("Selected campaigns:", selected);
    setSelectedCampaigns(selected);
    setIsDrawerOpen(false);
  };

  const handleLaunchCampaign = () => {
    setIsAddNewDrawerOpen(false); 
    setIsConfirmationModalOpen(true); 
  };

  const handleConfirmLaunch = () => {
    setIsConfirmationModalOpen(false);
    console.log("Campaign launched!");
  };

  const handleCancelLaunch = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <div className="relative ">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="space-y-2">
          <h1 className="heading-4 text-[#111827] font-medium">
            People dashboard
          </h1>
          <p className="heading-5 font-normal text-[#70747D]">
            Get a clear snapshot of your lead performance and activity.
          </p>
        </div>
      </div>

      {/* Table */}
      <PeopleTable setIsDrawerOpen={setIsDrawerOpen} />

      {/* Campaign Drawer */}
      {isDrawerOpen && (
        <CampaignDrawer
          campaigns={campaigns}
          selectedCampaigns={selectedCampaigns}
          onClose={() => setIsDrawerOpen(false)}
          onSubmit={handleSubmitCampaigns}
          openNewDrawer={() => {
            setIsDrawerOpen(false);
            setIsAddNewDrawerOpen(true);
          }}
        />
      )}

      <AnimatePresence>
        {isAddNewDrawerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddNewDrawerOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="bg-white w-[91vw] md:w-[40vw] top-0 overflow-auto hide-scrollbar fixed right-0 h-full z-50 pb-5 rounded-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 25 }}
            >
              {/* Pass the onLaunchCampaign callback to open modal and close drawer */}
              <Drawer onLaunchCampaign={handleLaunchCampaign} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Confirmation Modal - Now at the People level so it persists */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onConfirm={handleConfirmLaunch}
        onClose={handleCancelLaunch}
        confirmText="Launch campaign"
        cancelText="Go back"
        icon="/images/delete.png"
        title="Launch this campaign?"
        message="This campaign will be launched and will not be editable"
      />
    </div>
  );
};

export default People;
