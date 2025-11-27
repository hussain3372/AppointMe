// import React from 'react'
import Parent from './Parent'

// Define props interface for Drawer
interface DrawerProps {
  onLaunchCampaign?: () => void;
}

export default function Drawer({ onLaunchCampaign }: DrawerProps) {
  return (
    <>
      <Parent onLaunchCampaign={onLaunchCampaign}/>
    </>
  )
}