"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function Step2() {
  const process = [
    {
      id: 1,
      title: "Crunchbase",
      img: "/images/crunchbase.png",
      disc: "Lorem Ipsum is simply dummy text of the printing.",
    },
    {
      id: 2,
      title: "Apollo",
      img: "/images/apollo.png",
      disc: "Lorem Ipsum is simply dummy text of the printing.",
    },
    {
      id: 3,
      title: "Outreach",
      img: "/images/outreach.png",
      disc: "Lorem Ipsum is simply dummy text of the printing.",
    },
    {
      id: 4,
      title: "LinkedIn sales navigator",
      img: "/images/navigator.png",
      disc: "Lorem Ipsum is simply dummy text of the printing.",
    },
  ];

  return (
    <motion.div
      initial={{ x: "100vw", opacity: 0, scale: 0.98 }} 
      animate={{ x: 0, opacity: 1, scale: 1 }}
      transition={{
        duration: 1.6,
        ease: [0.12, 1, 0.32, 1],
      }}
      className="space-y-10 py-[60px]"
    >
      <div className="space-y-3">
        <h1 className="heading-1 font-medium text-[#111827]">
          Connect your lead sources
        </h1>
        <p className="body-2 font-regular text-[#70747D]">
          Choose where you’ll collect your leads and prospect data from.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {process.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ y: 40, opacity: 0 }}        
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              ease: [0.25, 1, 0.5, 1],
              delay: index * 0.15,                
            }}
            className="bg-[#F2F2F2] rounded-lg space-y-4 p-4"
          >
            <div className="flex justify-between items-center">
              <Image src={item.img} alt={item.title} height={40} width={40} />
              <div className="bg-white rounded-[20px] custom-shadow py-2 px-4">
                <button className="heading-7 font-regular text-[#111827]">
                  Connect
                </button>
              </div>
            </div>

            <div className="space-y-1 text-start">
              <p className="heading-5 font-medium text-[#111827]">{item.title}</p>
              <p className="heading-6 font-regular text-[#70747D] max-w-[282px]">
                {item.disc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
