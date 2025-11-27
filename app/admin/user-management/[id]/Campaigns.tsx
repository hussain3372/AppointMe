import ActionDropdown from "@/app/shared/ActionDropdown";
import Image from "next/image";
import React, { useState } from "react";
import ConfirmationModal from "@/app/shared/ConfirmationModal";
import Link from "next/link";



export default function Campaigns(): React.JSX.Element {
  const stats = [
    {
      id : 1,
      value : "102",
      title : "Total campaigns",
      img : "/images/rocket.svg"
    },
    {
      id : 2,
      value : "60",
      title : "Active campaigns",
      img : "/images/rocket.svg"
    },
    {
      id : 3,
      value : "12k",
      title : "Audience reached",
      img : "/images/users.svg"
    },
    {
      id : 4,
      value : "76%",
      title : "Conversion rate",
      img : "/images/card4.svg"
    },
  ]

  const cards = [
    {
      id :1,
      status : "Completed",
      img : "/images/rocket-blue.svg",
      title : "New leads follow-up",
      disc : "Your follow-up sequence will start tomorrow at 9:00 AM.",
      time : "30 min ago",
      link : "/admin/user-management/floyd-miles/detail"
    },
    {
      id :2,
      status : "Ongoing",
      img : "/images/rocket-purple.svg",
      title : "New leads follow-up",
      disc : "Your follow-up sequence will start tomorrow at 9:00 AM.",
      time : "Yesterday",
            link : "/admin/user-management/floyd-miles/detail"

    },
    {
      id :3,
      status : "Ongoing",
      img : "/images/rocket-green.svg",
      title : "New leads follow-up",
      disc : "Your follow-up sequence will start tomorrow at 9:00 AM.",
      time : "Yesterday",
            link : "/admin/user-management/floyd-miles/detail"

    },
    {
      id :4,
      status : "Scheduled",
      img : "/images/rocket-yellow.svg",
      title : "New leads follow-up",
      disc : "Your follow-up sequence will start tomorrow at 9:00 AM.",
      time : "30 min ago",
            link : "/admin/user-management/floyd-miles/detail"

    },
    {
      id :5,
      status : "Completed",
      img : "/images/rocket-blue.svg",
      title : "New leads follow-up",
      disc : "Your follow-up sequence will start tomorrow at 9:00 AM.",
      time : "30 min ago",
            link : "/admin/user-management/floyd-miles/detail"

    },
    {
      id :6,
      status : "Completed",
     img : "/images/rocket-purple.svg",
      title : "New leads follow-up",
      disc : "Your follow-up sequence will start tomorrow at 9:00 AM.",
      time : "30 min ago",
    },
    {
      id :7,
      status : "Ongoing",
      img : "/images/rocket-green.svg",
      title : "New leads follow-up",
      disc : "Your follow-up sequence will start tomorrow at 9:00 AM.",
      time : "30 min ago",
    },
    {
      id :8,
      status : "Scheduled",
      img : "/images/rocket-yellow.svg",
      title : "New leads follow-up",
      disc : "Your follow-up sequence will start tomorrow at 9:00 AM.",
      time : "30 min ago",
    },
  ]


    return (
    <div className="space-y-5">
     <div className="grid sm:grid-cols-2 gap-3 lg:grid-cols-4">
      {
        stats.map((stat)=>(
          <div key={stat.id} className="bg-[#F4F4F4] rounded-lg p-3 flex items-center gap-3">
            <div className=" flex gap-3 items-center">
              <div className="bg-white p-2 rounded-lg custom-shadow ">
              <Image width={20} height={20} src={stat.img} alt={stat.title} />
              </div>
              <div className="space-y-1">
                <p className="heading-4 font-normal text-[#111827]">{stat.value}</p>
                <p className="heading-7 font-normal text-[#70747D]">{stat.title}</p>
              </div>
            </div>
          </div>
        ))
      }
     </div>
     <div className="grid lg:grid-cols-2 gap-3 bg-[#EEEEEE66] p-3">
      {
        cards.map((card)=>(
          <div key={card.id} className="bg-[#FFFFFF] space-y-5 p-5">
            <div className="flex justify-between items-start">
              <Image src={card.img} alt={card.status} height={40} width={40} />
              <p className={` heading-7  rounded-full font-regular ${card.status === "Completed" ? "text-[#0CD767]" : card.status === "Ongoing"?"text-[#E28413]":card.status === "Scheduled"?"text-[#11224E]":""} py-1 5 px-2 bg-[#F6F6F6]`}>{card.status}</p>
            </div>
            <div className="space-y-1">
              <h5 className="heading-5 font-medium text-[#111827]">{card.title}</h5>
              <p className="heading-7 font-normal text-[#A0A3A9]">{card.disc}</p>
            </div>
            <div className="flex justify-between">
              <Link href={card.link || ""} className="cursor-pointer flex gap-1">
                <p className="heading-7 font-normal text-[#111827]">View details</p>
                <Image alt="detail" src='/images/gap-img.svg' height={14} width={14} />
              </Link>
            <p className="heading-7 font-normal text-[#A0A3A9]">{card.time}</p>
            </div>
          </div>
        ))
      }
     </div>
    </div>
  );
}