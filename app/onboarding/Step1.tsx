"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function Step1() {
  const process = [
    { id: 1, title: "Connect lead sources", img: "/images/connect.svg" },
    { id: 2, title: "Add CRM integration", img: "/images/integration.svg" },
    { id: 3, title: "Set up email system", img: "/images/mail-plus.svg" },
    { id: 4, title: "Enable AI email generation", img: "/images/email-generation.svg" },
  ];

  return (

    <div
      
      className="space-y-10"
    >
      <div className="space-y-3">
        <h1 className="heading-1 font-medium text-[#111827]">
          Welcome to AppointMe!
        </h1>
        <p className="body-2 font-regular text-[#70747D]">
          Let’s get your account ready in a few easy steps.
        </p>
      </div>

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
    </div>
  );
}
