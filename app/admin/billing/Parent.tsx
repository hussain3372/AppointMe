'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Subscriptions from './Subscriptions';
import Pricing from './Pricing';

export default function Parent(): React.ReactElement {
  const [selectedTab, setSelectedTab] = useState(0);

 

  const tabs = [
    {
      id: 1,
      title: 'Subscriptions',
      img: '/images/users-black.svg',
      content: <Subscriptions />,
    },
    {
      id: 2,
      title: 'Plans & pricing',
      img: '/images/boxes.svg',
      content: <Pricing />,
    },
  ];
  return (
    <div className="space-y-5 overflow-auto hide-scrollbar">
      <div className="space-y-2">
                <h2 className="heading-2 font-medium text-[#111827]">Billing & plans overview</h2>
                <p className="heading-5 font-normal text-[#70747D]">View and manage users’ subscription plans and billing details.</p>
            </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="bg-[#F2F2F2] max-w-[300px] inline-flex gap-1 p-1 rounded-lg flex-1 relative">
          {/* Animated Slider Background */}
          <motion.div
            className="absolute bg-white border border-[#E2E3E5] shadow-sm rounded-lg h-[calc(100%-8px)] top-1"
            animate={{
              left: `calc(${(100 / tabs.length) * selectedTab}% + 2px)`,
              width: `calc(${100 / tabs.length}% - 4px)`,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
          
          <div className="relative flex gap-1 flex-1">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                className={`sm:gap-2 p-3 cursor-pointer flex items-center justify-center rounded-lg transition-colors duration-200 outline-none focus:outline-none focus:ring-0 focus:shadow-none border border-transparent relative z-10 flex-1 
                 text-[#111827]
                `}
                onClick={() => setSelectedTab(index)}
              >
                <Image 
                  src={tab.img} 
                  alt={tab.title} 
                  height={20} 
                  width={20} 
                  className="transition-colors duration-200"
                />
                <h5 className="heading-6 font-regular whitespace-nowrap">
                  {tab.title}
                </h5>
              </button>
            ))}
          </div>
        </div>
        
       
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-lg"
        >
          {tabs[selectedTab].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}