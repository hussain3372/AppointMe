import Image from 'next/image'
import React from 'react'

export default function EmailSent() {
    const emails = [
        {
            id : 0,
            title : "Wellcome email",
            discription : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ul",
            img : "/images/wellcome-email.svg"
        },
        {
            id : 1,
            title : "Monthly newsletter",
            discription : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ul",
            img : "/images/again-wellcom.svg"
        },
        {
            id : 2,
            title : "Monthly newsletter",
            discription : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ul",
            img : "/images/newsletter.svg"
        },
        {
            id : 0,
            title : "Invoice reminder",
            discription : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ul",
            img : "/images/invoice.svg"
        },
    ]
  return (
    <div className='pt-5'>
      <h4 className="heading-4 font-medium text-[#111827]">Emails sent</h4>
      <div className="mt-5 gap-3 grid sm:grid-cols-2 bg-[#EEEEEE66] rounded-lg p-1 sm:p-3">
        {
            emails.map((item)=>(
                <div key={item.id} className="bg-white rounded-lg custom-shadow flex items-start gap-3 p-1 sm:p-3">
                    <Image src={item.img} alt={item.title} height={48} width={48} />
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <h5 className="heading-5 font-medium text-[#111827]">
                                {item.title}
                            </h5>
                            <p className="heading-6 font-regular text-[#70747D]">{item.discription}</p>
                        </div>
                        <Image src='/images/file-search.svg' alt='Search files' height={24} width={24} />
                    </div>
                </div>
            ))
        }
      </div>
    </div>
  )
}
