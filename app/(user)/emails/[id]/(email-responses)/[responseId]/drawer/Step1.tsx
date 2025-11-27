import ActionDropdown from '@/app/shared/ActionDropdown';
import Image from 'next/image'
import React from 'react'

export default function Step1() {
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
    <div className='space-y-8'>
      <div className="space-y-1">
        <h2 className="heading-4 font-medium text-[#111827] ">Email thread with Floyd Miles</h2>
        <p className="heading-6 font-regular text-[#70747D]">View and manage all email exchanges with this lead in one place.</p>
      </div>
        <div className="p-3 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-center items-center sm:justify-between bg-[#FEF4ED] rounded-lg">
        <div className="flex gap-2 items-center">
            <Image src='/images/profile-icon.png'alt='profile' height={44} width={44} />
            <div className="space-y-0 5">
        <p className="heading-6 font-medium text-[#111827]">Floyd Miles</p>
        <p className="heading-7 font-regular text-[#70747D]">miles@gmail.com</p>
        </div>
        </div>
        <div className="flex gap-1 items-center">
            <div className="h-[6px] w-[6px] bg-[#3DDF85] rounded-full"></div>
            <p className="heading-7 font-regular text-[#70747D]">Last activity:</p>
            <p className="heading-7 font-regular text-[#111827]">Aug 12, 2025</p>
        </div>
      </div>
      <div style={{height:'500px'}} className="flex flex-col  overflow-auto hide-scrollbar p-5 gap-10 bg-[#F6F6F6] border border-[#ECEDEE] rounded-lg">
            <div className="bg-[#F6F6F6] rounded-lg">
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
                  James Hall
                </h6>
                <p className="space-y-0.5 text-center sm:text-start heading-7 font-regular text-[#70747D] ">
                  <span className="mr-2">To:</span>Floyd Miles
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
            
            <div className="bg-[#FFFFFF] shadow-xl gap-5 border border-[#E2E3E5] rounded-lg px-3 py-5 flex flex-col justify-between text-[#70747D] heading-6 font-regular">

              <p className="Monthly newsletter text-[#111827]"> Monthly newsletter</p>
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
        <div className=" border-t pt-8 border-[#D7D7D7]">
        <div className="bg-[#F6F6F6]  rounded-lg">
          <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-between">
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <Image
                src="/images/profile-icon.png"
                alt="person"
                height={40}
                width={40}
              />
              <div className="space-y-0 5">
                <h6 className=" heading-6 text-center sm:text-start font-medium text-[#111827]">
                  James Hall
                </h6>
                <p className="space-y-0.5 text-center sm:text-start heading-7 font-regular text-[#70747D] ">
                  <span className="mr-2">To:</span>Floyd Miles
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
              <div className='relative'>
              <ActionDropdown row={""} actions={getActions} />
              </div>
            </div>
          </div>
          <div className="mt-2 space-y-2">
            
            <div className="bg-[#FFFFFF] shadow-xl gap-5 border border-[#E2E3E5] rounded-lg px-3 py-5 flex flex-col justify-between text-[#70747D] heading-6 font-regular">

              <p className="Monthly newsletter text-[#111827]"> Monthly newsletter</p>
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
    </div>
  )
}
