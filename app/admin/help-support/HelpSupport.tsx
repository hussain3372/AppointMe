'use client'
import React from 'react'
import TicketStats from './TicketStats'
import TicketsTable from './TicketsTable'

const Reports = () => {
  return (
    <div className='pb-7'>
      <TicketStats/>
      <div className="flex flex-col lg:flex-row py-5 gap-3">
      </div>
      <TicketsTable setIsDrawerOpen={()=>{console.log('Opened')}}/>
    </div>
  )
}

export default Reports