import LightBtn from '@/app/ui/buttons/LightButton'
import PrimaryBtn from '@/app/ui/buttons/PrimaryBtn'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Step1 from './Step1'
import Step2 from './Step2'

export default function Drawer() {
  const [currentStep, setCurrentStep] = useState(1)

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(2)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(1)
    }
  }

  return (
    <motion.div 
      className='h-[100vh] flex flex-col justify-between'
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {currentStep === 1 ? <Step1 /> : <Step2 />}
        </motion.div>
      </AnimatePresence>
      
      <div className="flex gap-3 py-5">
        <LightBtn 
          label='Go back' 
          color='#11224E' 
          imageSrc='/images/arrow-left.svg' 
          imagePosition='left'
          onClick={handleBack}
        />
        <PrimaryBtn 
          label={currentStep === 1 ? "Reply" : "Send"}
          color='#FFFFFF' 
          imageSrc='/images/arrow-right.svg' 
          imagePosition='right'
          onClick={handleNext}
        />
      </div>
    </motion.div>
  )
}
