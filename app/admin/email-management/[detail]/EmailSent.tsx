"use client";
import ActionDropdown from "@/app/shared/ActionDropdown";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function EmailSent() {
  const getActions = (row: any): React.ReactNode => (
    <div className="p-2">
      <button
        type="button"
        className="w-full cursor-pointer text-left px-3 py-2 text-sm hover:bg-gray-100 rounded transition-colors duration-200"
        onClick={() => console.log("Send email to", row.name)}
      >
        Send Email
      </button>
      <button
        type="button"
        className="w-full cursor-pointer text-left px-3 py-2 text-sm hover:bg-gray-100 rounded transition-colors duration-200"
        onClick={() => console.log("Schedule meeting with", row.name)}
      >
        Schedule Meeting
      </button>
      <button
        type="button"
        className="w-full cursor-pointer text-left px-3 py-2 text-sm hover:bg-gray-100 rounded transition-colors duration-200"
        onClick={() => console.log("Add note for", row.name)}
      >
        Add Note
      </button>
      <button
        type="button"
        className="w-full cursor-pointer text-left px-3 py-2 text-sm hover:bg-gray-100 rounded transition-colors duration-200 text-red-600"
        onClick={() => console.log("Delete contact", row.name)}
      >
        Delete Contact
      </button>
    </div>
  );

  return (
    <div className="pt-5">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h4 className="heading-4 font-medium text-[#111827]">Emails sent</h4>
        
      </div>
      <div className="pt-5">
        <div className="bg-[#F6F6F6] p-5 border border-[#ECEDEE] rounded-lg">
          <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-between">
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <Image
                src="/images/profile.svg"
                alt="person"
                height={40}
                width={40}
              />
              <div className="space-y-0 5">
                <h6 className=" heading-6 text-center sm:text-start font-medium text-[#111827]">
                  Conrad Fisher
                </h6>
                <p className="space-y-0.5 text-center sm:text-start heading-7 font-regular text-[#70747D] ">
                  <span className="mr-2">To:</span> Floryd, Kim, Lisa, William,
                  John, Akshy, Varun, Steve, Mark, Umer.....
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/calendar.png"
                  alt="time"
                  height={16}
                  width={16}
                />
                <p className="heading-7 font-regular">July 20, 2025</p>
              </div>
              <ActionDropdown row={""} actions={getActions} />
            </div>
          </div>
          <div className="mt-2 space-y-2">
            <div className="flex gap-3 bg-[#FFFFFF] border border-[#E2E3E5] rounded-lg p-3 items-center">
              <h6 className="heading-6 font-regular text-[#70747D] pr-3">
                Subject
              </h6>
              <h6 className="heading-6 font-regular text-[#111827] ">
                Monthly newsletter
              </h6>
            </div>
            <div className="bg-[#FFFFFF] gap-5 border border-[#E2E3E5] rounded-lg px-3 py-5 flex flex-col justify-between text-[#70747D] heading-6 font-regular">
              <p className="text-start"> Hi,</p>
              <p>
                Welcome , where intelligent automation meets effortless
                outreach. With our platform, you can easily import your leads,
                create campaigns using ready-made templates, and let AI craft
                personalized emails that truly connect with your audience. From
                scheduling follow-ups to tracking engagement, everything is
                designed to help you reach your goals faster and more
                efficiently — so you can focus on building meaningful
                relationships, not managing manual tasks.
              </p>
                                         <p className='text-start'>Best</p>
                                         <p className='text-start'>The AppointMe Team</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
