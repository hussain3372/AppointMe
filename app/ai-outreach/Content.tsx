'use client'
import Image from 'next/image'
import React, { useState, useRef, ChangeEvent } from 'react'
import PrimaryBtn from '../ui/buttons/PrimaryBtn'

export default function Content() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isHoveringImage, setIsHoveringImage] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result
        if (typeof result === 'string') {
          setUploadedImage(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = () => {
    setUploadedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className='h-full p-5 '>
      <div className='flex h-1/2 flex-col justify-end items-center'>
       <div className='space-y-7 flex flex-col items-center'>
        <Image src='/images/ai-logo.png' alt='AI' height={56} width={56} />
        <div className="space-y-2">
            <h2 className="heading-2 font-medium text-[#11224E] text-center">Reach leads. Build <span className='text-[#F87B1B]'>connections.</span></h2>
            <p className="heading-5 font-regular text-[#70747D] max-w-[532px] text-center ">Create and send smart, personalized emails to your leads effortlessly to boost engagement and drive higher conversions.</p>
        </div>
       </div>
      </div>
      
      <div className='flex h-1/2 flex-col justify-end items-center'>
       <div className="bg-white rounded-3xl w-full p-4 ">
        <div className="relative">
          <textarea 
            placeholder='"Write a welcome email for new leads...."' 
            rows={4} 
            name="Prompt section" 
            id="Prompt manager" 
            className='w-full body-2 font-regular placeholder:text-[#70747D] outline-none resize-none bg-[#F5F5F5] p-4 rounded-2xl border border-[#00000014]'
            style={{ paddingBottom: uploadedImage ? '72px' : '16px' }}
          />
          {uploadedImage && (
            <div 
              className="absolute bottom-4 left-2 w-16 h-16 rounded-lg overflow-hidden shadow-md cursor-pointer"
              onMouseEnter={() => setIsHoveringImage(true)}
              onMouseLeave={() => setIsHoveringImage(false)}
              onClick={handleRemoveImage}
            >
              <Image
                src={uploadedImage} 
                height={50}
                width={50}
                alt="Uploaded preview" 
                className="w-full h-full object-cover"
              />
              {isHoveringImage && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">×</span>
                </div>
              )}
            </div>
          )}
        </div>
       <div className="flex justify-between">
        <div 
          className="flex gap-2 p-3 cursor-pointer rounded-lg bg-white shadow-lg items-center"
          onClick={handleUploadClick}
        >
            <div className='bg-[#F87B1B] rounded-sm p-1'>
            <Image src='/images/file.svg' alt='upload something' height={16} width={16} />
            </div>
            <p className="heading-5 font-medium text-[#000000CC]">Upload</p>
        </div>
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          onChange={handleFileUpload}
          className="hidden"
        />
        <div className='max-w-[77px]'>
        <PrimaryBtn imageSrc='/images/arrow-right.svg' label='Send' imagePosition='right' />
        </div>
       </div>
       </div>
      </div>
      
    </div>
  )
}