import React from 'react'
import Stats from './Stats'
import EmailSent from './EmailSent'

export default function page() {
  return (
    <div className='pb-10'>
      <Stats/>
      <EmailSent/>
    </div>
  )
}
