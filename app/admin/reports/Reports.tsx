'use client'
import React from 'react'
import Stats from './Stats'
import HeatMap from './HeatMap'
import RevenueGraph from './RevenueGraph'
import RevenueTable from './RevenueTable'

const Reports = () => {
  return (
    <div className='pb-7'>
      <Stats/>
      <div className="flex flex-col lg:flex-row py-5 gap-3">
      <HeatMap/>
      <RevenueGraph/>
      </div>
      <RevenueTable setIsDrawerOpen={()=>{console.log('Opened')}}/>
    </div>
  )
}

export default Reports