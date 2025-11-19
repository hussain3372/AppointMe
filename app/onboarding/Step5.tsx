"use client";

import React from 'react'
import Input from '../ui/Input'
import { motion } from "framer-motion";

export default function Step5() {
  return (
    <motion.div
      initial={{ x: "100vw", opacity: 0, scale: 0.98 }}   
      animate={{ x: 0, opacity: 1, scale: 1 }}             
      transition={{
        duration: 1.6,                                     
        ease: [0.12, 1, 0.32, 1]                            
      }}
      className='space-y-10'
    >
      <div className="space-y-3">
        <h1 className="heading-1 font-medium text-[#111827]">
          Connect GPT API key
        </h1>
        <p className="body-2 font-regular text-[#70747D]">
          Use AI to personalize and generate outreach emails.
        </p>
      </div>

      <Input 
        title='OpenAI API key' 
        placeholder='Enter API key' 
        className='w-full' 
      />
    </motion.div>
  )
}
