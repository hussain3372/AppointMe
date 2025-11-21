import React from 'react'
import Sidebar from './Sidebar'
import Content from './Content'

const AiOutreach = () => {
  return (
    <div className="">
    <div className="flex max-w-[100%] sm:max-h-[86vh] border border-[#E2E3E5] rounded-lg">
      <div className='w-1/4 overflow-auto hide-scrollbar'>
      <Sidebar/>
      </div>
      <div className='bg-[#fef4ed] w-full'>
        <Content/>
      </div>
    </div>
    </div>
  )
}

export default AiOutreach