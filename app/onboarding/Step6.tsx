"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Step6() {
  const [isAllowed, setIsAllowed] = useState(false);

  const process = [
    { id: 1, title: "Access to CRM or Sheets", img: "/images/database.svg" },
    { id: 2, title: "Access to email sending", img: "/images/mail-plus.svg" },
    {
      id: 3,
      title: "Access to AI generation",
      img: "/images/email-generation.svg",
    },
    { id: 4, title: "Data source access", img: "/images/connect.svg" },
  ];

  return (
    <div
    
      className="space-y-10"
    >
      <div className="space-y-3">
        <h1 className="heading-1 font-medium text-[#111827]">
          Authorize & verify account
        </h1>
        <p className="body-2 font-regular text-[#70747D]">
          Your integrations are ready. You can now start creating campaigns.
        </p>
      </div>

      {/* Process Cards */}
      <div className="grid sm:grid-cols-2 gap-5">
        {process.map((item, index) => (
          <div
            key={item.id}
           
            className="bg-[#F2F2F2] rounded-lg flex gap-3 items-center p-2"
          >
            <div className="bg-white custom-shadow p-2 rounded-lg">
              <Image src={item.img} alt={item.title} height={20} width={20} />
            </div>
            <p className="heading-5 font-regular text-[#111827]">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      <div
        
        className="flex  gap-3 items-center justify-center"
      >
        <div
          className="relative w-[18px] h-[18px] cursor-pointer"
          onClick={() => setIsAllowed(!isAllowed)}
        >
          <div
            className={`w-full h-full rounded border-2 transition-all ${
              isAllowed
                ? "bg-orange-500 border-orange-500"
                : "bg-white border-gray-300"
            }`}
          >
            {isAllowed && (
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

        <p className="text-[#70747D] font-normal body-2">
          I allow{" "}
          <span className="font-normal body-2 text-[#11224E]">AppointMe</span>{" "}
          to access these services securely.
        </p>
      </div>
    </div>
  );
}
