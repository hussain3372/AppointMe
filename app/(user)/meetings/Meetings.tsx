"use client";
import { useState } from "react";
import Overview from "./Calendar";
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import { AnimatePresence, motion } from "framer-motion";
// import TwoFaDrawer from '../settings/TwoFaDrawer';
import MeetingDrawer from "./MeetingDrawer";

interface Meeting {
  id: string;
  title: string;
  time: string;
  duration: string;
  type: "zoom" | "teams";
  color: "orange" | "purple" | "blue" | "green";
}

export default function DashboardPage() {
  const [meetingOpen, setMeetingOpen] = useState(false);

  const handleOpenMeeting = () => {
    setMeetingOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#ffffff]">
      <div className="flex-1 flex flex-col">
        <main className="flex-1  space-y-4 sm:space-y-5">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="">
              <h1 className="text-lg sm:text-xl font-medium text-[#111827] font-['Manrope'] leading-7 ">
                Meeting overview
              </h1>
              <p className="text-sm sm:text-base font-normal text-[#70747d] font-['Manrope'] leading-6">
                Track your scheduled, completed, or canceled meetings.
              </p>
            </div>
            <div>
              <PrimaryBtn
                label="Book a meeting"
                imageSrc="/images/arrow-right.svg"
                imagePosition="right"
                onClick={handleOpenMeeting}
              />
            </div>
          </div>

          {/* Calendar Section */}
          <div className="bg-white border border-[#11182714] rounded-lg sm:p-4">
            {/* Calendar Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-5">
              <h2 className="text-lg sm:text-xl font-medium text-[#222222] font-['Manrope'] leading-7">
                November 2025
              </h2>

              <div className="flex flex-wrap items-center gap-2"></div>
            </div>

            {/* Calendar Layout */}
            <div className="flex flex-col lg:flex-row">
              {/* Mini Calendar & Upcoming Meetings */}
              <div className=" space-y-6"></div>

              {/* Main Calendar View */}
              <div className="flex-1">
                <Overview />
              </div>
            </div>
          </div>
        </main>
      </div>
      <AnimatePresence>
        {meetingOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 min-h-screen bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMeetingOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="bg-white w-[91vw] md:w-[40vw] top-0 overflow-auto hide-scrollbar fixed right-0 h-full z-50 pb-5 rounded-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            >
              <MeetingDrawer onClose={handleOpenMeeting} onAddMeeting={()=>{}}/>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
