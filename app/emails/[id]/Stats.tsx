'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import CampaignPerformance from './Graph'
import ConfirmationModal from '@/app/shared/ConfirmationModal'

export default function Stats() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const stats = [
        {
            id : 1,
            value : "1200",
            title : "Open",
            img : "/images/card4.svg"
        },
        {
            id : 2,
            value : "650",
            title : "Replies",
            img : "/images/card4.svg"
        },
        {
            id : 3,
            value : "160",
            title : "Clicks",
            img : "/images/card4.svg"
        },
      
    ]
    const emaildata = [
      {
      id: 1,
      value: "June 12, 2025",
      title: "Sent date",
      img: "/images/calender-colored.svg"
    },
    {
      id: 3,
      value: "2:00 pm",
      title: "Sent time",
      img: "/images/clock-colored.svg"
    },
      {
      id: 2,
      value: "200",
      title: "Total companies",
      img: "/images/buildings.svg"
    },
    {
      id: 4,
      value: "200",
      title: "Total leads",
      img: "/images/leads.svg"
    },
    {
      id: 6,
      value: "Opened",
      title: "Status",
      img: "/images/loader.svg"
    },
    {
      id: 5,
      value: "4",
      title: "Follow-ups",
      img: "/images/follow-ups.svg"
    },
  ]

  const handleDeleteClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleConfirmDelete = () => {
    // Add your delete logic here
    console.log('Campaign deleted')
    setIsModalOpen(false)
    // You can add API call or state update here to actually delete the campaign
  }

  return (
    <div>
      <div className="flex gap-2 items-center">
        <Link className='heading-6 font-regular text-[#70747D] hover:text-blue-500 hover:underline' href='/emails'>EMAILS</Link>
        <Image src='/images/gap-img.svg' alt='campaigns' height={20} width={20}/>
        <p className="heading-6 font-regular text-[#70747D]">MONTHLY NEWSLETTER</p>
      </div>
      <div className="pt-5 flex flex-col sm:flex-row justify-between">
        <div className="space-y-2">
            <h4 className="heading-4 font-medium text-[#111827]">Monthly newsletter</h4>
            <h5 className="heading-5 font-regular text-[#70747D]">Make a great first impression with a warm welcome.</h5>
        </div>
        <div className="flex items-center gap-2 justify-center">
            <div className="bg-white custom-shadow p-2 rounded-lg border border-[#F6F6F6] cursor-pointer">
              <Image src='/images/mail-recycle.svg' alt='mail' height={16} width={16}/>
            </div>
            
            <div 
              className="bg-white custom-shadow p-2 rounded-lg border border-[#F6F6F6] cursor-pointer"
              onClick={handleDeleteClick}
            >
              <Image src='/images/delete.svg' alt='delete' height={16} width={16}/>
            </div>
        </div>
      </div>
      <div className="pt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3 ">
        {
            stats.map((stat)=>(
                <div key={stat.id} className='bg-[#F4F4F4] p-3 rounded-lg'>
                <div className=" flex w-full gap-3 items-center">
                    <div className="bg-white custom-shadow rounded-lg p-2">
                    <Image src={stat.img} alt={stat.title} height={24} width={24}/>
                    </div>
                    <div className="space-y-1">
                        <h4 className="heading-4 font-regular text-[#111827]">{stat.value}</h4>
                        <p className="heading-7 font-regular text-[#70747D]">{stat.title}</p>
                        </div>             
                       </div>
                </div>
            ))
        }
      </div>
      
      <ConfirmationModal 
        onClose={handleCloseModal} 
        title='Do you want to delete this campaign'
        message='This campaign wil be deleted permanently'
        icon='/images/delete.png'
        cancelText='Cancel'
        onConfirm={handleConfirmDelete} 
        isOpen={isModalOpen} 
      />
      
      <div className='flex flex-col lg:flex-row gap-3 w-full pt-5'>
        <CampaignPerformance/>
        <div className="p-3 w-full border border-[#ECEDEE]  bg-white rounded-lg">
          <h1 className="heading-4 font-medium mb-5">Email details</h1>
          
          <div className="grid sm:grid-cols-2 gap-2">
            {emaildata.map((item) => (
              <div key={item.id} className="bg-[#FEF4ED] rounded-lg p-3">
                <div className="flex gap-3 items-center">
                  <div className="bg-white rounded-lg custom-shadow p-3">
                    <img src={item.img} alt={item.title} height={20} width={20} />
                  </div>
                  <div className="space-y-1 w-full">
                    <p className="heading-6 font-medium text-[#111827]">
                      {item.value}
                    </p>
                    <p className="heading-7 font-regular text-[#70747D]">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}