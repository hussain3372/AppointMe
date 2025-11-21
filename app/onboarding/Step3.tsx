"use client";

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

export default function Step3() {
  const process = [
    {
      id:1,
      title : "Google sheet",
      img:"/images/googlesheet.png",
      disc:"Lorem Ipsum is simply dummy text of the printing."
    },
    {
      id:2,
      title : "HotSpot",
      img:"/images/hotspot.png",
      disc:"Lorem Ipsum is simply dummy text of the printing."
    },
    {
      id:3,
      title : "Salesforce",
      img:"/images/salesforce.png",
      disc:"Lorem Ipsum is simply dummy text of the printing."
    },
  ]

  return (
    <div
      
      className='space-y-10'
    >
      <div className='space-y-3 text-center'>
        <h1 className="heading-1 font-medium text-[#111827]">
          Connect your CRM or data destination
        </h1>
        <p className="body-2 font-regular text-[#70747D]">
          Sync leads and campaign data with your CRM or Sheets.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {process.map((item, index) => (
          <div
            key={item.id}
           
            className='bg-[#F2F2F2] rounded-lg space-y-5 p-4'
          >
            <div className="flex justify-between items-center">
              <Image src={item.img} alt={item.title} height={40} width={40} />

              <div className="bg-white rounded-[20px] custom-shadow py-2.5 px-4">
                <p className="heading-7 font-regular text-[#111827]">Connect</p>
              </div>
            </div>

            <div className="space-y-1 text-start">
              <p className="heading-5 font-medium text-[#111827]">{item.title}</p>
              <p className="heading-6 font-regular text-[#70747D] max-w-[282px]">
                {item.disc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
