"use client";

import Image from 'next/image'
import React from 'react'
import Input from '../ui/Input'
import { motion } from "framer-motion";

export default function Step4() {

  const process = [
    {
      id:1,
      title : "Gmail",
      img:"/images/gmail.png",
      disc:"Lorem Ipsum is simply dummy text of the printing."
    },
    {
      id:2,
      title : "Outlook",
      img:"/images/outlook.png",
      disc:"Lorem Ipsum is simply dummy text of the printing."
    },
  ]

  return (
    <motion.div
      initial={{ x: "100vw", opacity: 0, scale: 0.98 }}   // start fully right
      animate={{ x: 0, opacity: 1, scale: 1 }}             // smooth arrival
      transition={{
        duration: 2.6,                                     
        ease: [0.12, 1, 0.32, 1],                          
      }}
      className='space-y-10 pb-[60px]'
    >
      <div className='space-y-3 text-center'>
        <h1 className="heading-1 font-medium text-[#111827]">
          Connect your email system
        </h1>
        <p className="body-2 font-regular text-[#70747D]">
          Send outreach emails directly from your preferred account.
        </p>
      </div>

      {/* 👉 Cards with staggered animation */}
      <div className="grid sm:grid-cols-2 gap-3">
        {process.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              ease: [0.25, 1, 0.5, 1],
              delay: index * 0.2, 
            }}
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
              <p className="heading-6 font-regular text-[#70747D] max-w-[282px]">{item.disc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* SMTP Inputs remain static */}
      <div className="pt-7 space-y-6">
        <h5 className="heading-5 font-medium text-[#111827] text-start">
          Use custom SMTP
        </h5>

        <div className="grid sm:grid-cols-2 gap-3 w-full">
          <Input title='Host' placeholder='Enter host' className='w-full' />
          <Input title='Port' placeholder='Enter port' className='w-full' />
          <Input title='Username' placeholder='Enter username' className='w-full' />
          <Input title='Password' placeholder='Enter password' type='password' className='w-full' />
        </div>
      </div>
    </motion.div>
  )
}
