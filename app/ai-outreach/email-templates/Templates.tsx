import Image from 'next/image'
import React from 'react'

export default function Templates() {
  const templates = [
    {
      id : 1,
      title : "Monthly newsletter",
      disc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ul",
      img : "/images/again-wellcom.svg"
    },
    {
      id : 2,
      title : "Your journey with us starts here",
      disc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ul",
      img : "/images/wellcome-email.svg"
    },
    {
      id : 3,
      title : "Invoice reminder",
      disc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ul",
      img : "/images/invoice-reminder.svg"
    },
    {
      id : 4,
      title : "Monthly newsletter",
      disc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ul",
      img : "/images/monthly-newsletter.svg"
    },
    {
      id : 5,
      title : "Invoice reminder",
      disc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ul",
      img : "/images/reminder.png"
    },
  ]
  return (
    <div className='bg-[#F6F6F6] h-full rounded-lg p-3'>
      <div className='space-y-3'>
     {
      templates.map((mail)=>(
        <div className='flex items-start gap-3 bg-[#FFFFFF] w-full rounded-md p-3' key={mail.id}>
          <Image src={mail.img} alt={mail.title} height={48} width={48} />
          <div className="space-y-1">
            <h5 className="heading-5 font-medium text-[#111827]">{mail.title}</h5>
            <p className="heading-6 font-regular text-[#70747D] max-w-[468px]">{mail.disc}</p>
          </div>
          </div>
      ))
     }
     </div>
    </div>
  )
}
