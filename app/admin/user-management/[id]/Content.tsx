'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Emails from './Emails';
import Campaigns from './Campaigns';
import AIInsights from './Subscription';
import PrimaryBtn from '@/app/ui/buttons/PrimaryBtn';

export default function Content(): React.ReactElement {
  const [selectedTab, setSelectedTab] = useState(0);

 

  const tabs = [
    {
      id: 2,
      title: 'Campaigns',
      img: '/images/rocket1.png',
      content: <Campaigns />,
    },
    {
      id: 1,
      title: 'Emails',
      img: '/images/mail.svg',
      content: <Emails />,
    },
    {
      id: 3,
      title: 'Subscription',
      img: '/images/wallet-black.svg',
      content: <AIInsights />,
    },
  ];

  

  const getButtonText = () => {
    switch(selectedTab) {
      case 0:
              console.log('Sending email action triggered');

        return 'Send email';
        
      case 1:
              console.log('Sending email action triggered');

        return 'Schedule meeting';
      case 2:
        console.log('Sending email action triggered');
        return 'Ask AI';

      default:
        return 'Send email';
    }
  };

  return (
    <div className="pt-5 sm:px-5 overflow-auto hide-scrollbar">
      <div className="flex flex-col sm:flex-row items-start max-w-full sm:max-w-none overflow-x-auto justify-between gap-4">
        <div className="bg-[#F2F2F2] w-[350px]   max-w-[450px] inline-flex gap-1 p-1 rounded-lg flex-1 relative">
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
          className="bg-white rounded-lg pt-5 "
        >
          {tabs[selectedTab].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}