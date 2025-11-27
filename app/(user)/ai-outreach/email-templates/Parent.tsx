import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Templates from './Templates'
import Editor from './Editor'

export default function Parent() {
  return (
    <div className=''>
     <div className="flex gap-2">
        <Link href='/ai-outreach' className='heading-6 font-regular uppercase text-[#70747D] hover:underline hover:text-blue-500'>AI outreach</Link>
        <Image src='/images/gap-img.svg' alt='Gap' height={20} width={20} />
        <p className='heading-6 font-regular uppercase text-[#70747D]'>email templates</p>
     </div>
     <div className="py-5">
        <h4 className="heading-4 font-medium text-[#111827]">Email templates</h4>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 w-full">
       <div className='w-full'> <Templates/> </div>
       <div className='w-full'> <Editor/> </div>
        </div>
    </div>
  )
}
