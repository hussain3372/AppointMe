'use client'
import React, { useState } from 'react'
import PrimaryBtn from '../ui/buttons/PrimaryBtn'
import Image from 'next/image'
import { motion, AnimatePresence , Variants } from 'framer-motion'

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const chats = [
    {
      messages: [
        "Icons names identifications...",
        "Write me job description...",
        "Job search process......",
        "Keyword suggestions for job ...",
        "AI tools used for job...",
        "Icons names identifications...",
        "AI tools used for job...",
        "Job search process......",
        "Icons names identifications...",
        "Job search process......",
        "Icons names identifications...",
        "Job search process......",
        "AI tools used for job...",
        "Icons names identifications..."
      ]
    }
  ]

  const sidebarVariants : Variants  = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  }

  return (
    <>
      {/* Burger Icon for Mobile */}
      <div className='lg:hidden  top-4 left-4 z-50'>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className='p-2 bg-white rounded-md shadow-md border border-[#E2E3E5]'
        >
          <Image 
            src={isSidebarOpen ? '/images/cross-notification.svg' : '/images/menu.svg'} 
            alt="menu" 
            width={20} 
            height={20} 
          />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className='lg:hidden fixed inset-0 bg-black bg-opacity-50 overflow-auto z-40'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Only visible on large screens by default */}
      <div className='hidden lg:block p-3 w-full border-r border-[#E2E3E5] shadow-sm'>
        <PrimaryBtn label='New chat' color='#FFFFFF' imageSrc='/images/arrow-right.svg' imagePosition='right'/>
        <div className='pt-10 flex flex-col gap-1'>
          {
            chats[0].messages.map((item, index) => (
              <div key={index} className='px-3 py-2 rounded-lg hover:bg-[#F4F4F4]'>
                <p className="heading-6 font-regular cursor-pointer text-[#70747D]">{item}</p>
              </div>
            ))
          }
        </div>
        <div className="mt-20 cursor-pointer flex items-center gap-2 bg-[#F4F4F4] border border-[#E2E3E5] rounded-md p-3">
          <Image src='/images/file-text.png' alt='templates' height={20} width={20}/>
          <p className='heading-6 font-regular text-[#414652]'>Email templates</p>
        </div>
      </div>

      {/* Mobile Sidebar - Only visible when burger is clicked */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className='lg:hidden  overflow-y-auto fixed left-0 top-0 h-full overflow-auto w-80 bg-white border-r border-[#E2E3E5] shadow-sm z-50 p-3'
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className='flex justify-end mb-4 lg:hidden'>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className='p-2'
              >
                <Image src='/images/cross-notification.svg' alt="close" width={50} height={50} />
              </button>
            </div>
            
            <PrimaryBtn label='New chat' color='#FFFFFF' imageSrc='/images/arrow-right.svg' imagePosition='right'/>
            <div className='pt-10 flex flex-col gap-1'>
              {
                chats[0].messages.map((item, index) => (
                  <div key={index} className='px-3 py-2 rounded-lg cursor-pointer hover:bg-[#F4F4F4]'>
                    <p className="heading-6 font-regular  text-[#70747D]">{item}</p>
                  </div>
                ))
              }
            </div>
            <div className="mt-20 cursor-pointer flex items-center gap-2 bg-[#F4F4F4] border border-[#E2E3E5] rounded-md p-3">
              <Image src='/images/file-text.png' alt='templates' height={20} width={20}/>
              <p className='heading-6 font-regular text-[#414652]'>Email templates</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}