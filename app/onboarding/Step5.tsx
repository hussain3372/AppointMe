"use client";

import React from 'react'
import Input from '../ui/Input'
import { motion } from "framer-motion";

export default function Step5() {
  return (
    <div
      
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
    </div>
  )
}
