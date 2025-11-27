"use client";

import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Views , View  } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";

import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import { AnimatePresence, motion } from "framer-motion";
import MeetingDrawer from "./MeetingDrawer";


export interface Meeting {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: "zoom" | "teams";
  link?: string;
  color?: "orange" | "purple" | "blue" | "green";
}

// Configure date-fns localizer
const locales = {};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MeetingPage: React.FC = () => {
  const [events, setEvents] = useState<Meeting[]>([]);
  const [meetingOpen, setMeetingOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<View>(Views.MONTH);

  const handleOpenMeeting = () => setMeetingOpen((prev) => !prev);

  const eventStyleGetter = (event: Meeting) => ({
    style: {
      backgroundColor: event.color || "gray",
      color: "white",
      borderRadius: "6px",
      padding: "2px 5px",
      border: "none",
    },
  });

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-5">
        <div>
          <h1 className="text-lg sm:text-xl font-medium text-[#111827] font-['Manrope'] leading-7">
            Meeting overview
          </h1>
          <p className="text-sm sm:text-base font-normal text-[#70747d] font-['Manrope'] leading-6">
            Track your scheduled, completed, or canceled meetings.
          </p>
        </div>
        <div>
          <PrimaryBtn
          fontSize="12px"
            label="Book a meeting"
            imageSrc="/images/arrow-right.svg"
            imagePosition="right"
            onClick={handleOpenMeeting}
          />
        </div>
      </div>

      {/* Year Navigation */}
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1)
            )
          }
        >
          Previous Year
        </button>
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1)
            )
          }
        >
          Next Year
        </button>
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => setCurrentView("month")}
        >
          Month View
        </button>
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => setCurrentView("week")}
        >
          Week View
        </button>
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => setCurrentView("day")}
        >
          Day View
        </button>
      </div>

      {/* Calendar */}
      <div
        className="border border-[#11182714] p-3 rounded-xl"
        style={{ height: "600px" }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          view={currentView}
          onView={(view: any) => setCurrentView(view)}
          date={currentDate}
          onNavigate={(date: any) => setCurrentDate(date)}
          step={30}
          timeslots={1}
          style={{ height: "100%" }}
          eventPropGetter={eventStyleGetter}
          min={new Date(currentDate.getFullYear(), 0, 1, 8, 0)}
          max={new Date(currentDate.getFullYear(), 11, 31, 20, 0)}
          onSelectEvent={(event: any) => {
            if (event.link) window.open(event.link, "_blank");
          }}
          toolbar={true}
        />
      </div>

      {/* Meeting Drawer */}
      <AnimatePresence>
        {meetingOpen && (
          <>
            <motion.div
              className="fixed inset-0 min-h-screen bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMeetingOpen(false)}
            />
            <motion.div
              className="bg-white w-[91vw] md:w-[40vw] top-0 overflow-auto hide-scrollbar fixed right-0 h-full z-50 pb-5 rounded-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            >
              <MeetingDrawer
                onClose={handleOpenMeeting}
                onAddMeeting={(meeting: Meeting) =>
                  setEvents((prev) => [...prev, meeting])
                }
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MeetingPage;
