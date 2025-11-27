"use client";

import { useState } from "react";
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import CompaignsTable from "./CompaignsTable";

const CampaignManagement = () => {
  const stats = [
    {
      id: 1,
      value: "20",
      title: "Total campaigns",
      img: "/images/card1.svg",
    },
    {
      id: 2,
      value: "12",
      title: "Active campaigns",
      img: "/images/card1.svg",
    },
    {
      id: 3,
      value: "4,998",
      title: "Leads reached",
      img: "/images/card3.svg",
    },
    {
      id: 4,
      value: "76%",
      title: "Reply rate",
      img: "/images/card4.svg",
    },
    {
      id: 1,
      value: "60%",
      title: "Conversion rate",
      img: "/images/card4.svg",
    },
  ];

  return (
    <div className="relative space-y-5">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="space-y-2">
          <h1 className="heading-2 font-medium text-[#111827]">Campaigns dashboard</h1>
          <p className="heading-5 text-[#70747D]">
            Track your campaign performance and key engagement insights.
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div>
        <CompaignsTable />
      </div>
    </div>
  );
};

export default CampaignManagement;
