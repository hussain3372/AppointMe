import LightBtn from '@/app/ui/buttons/LightButton'
import PrimaryBtn from '@/app/ui/buttons/PrimaryBtn'
import Checkbox from '@/app/ui/Checkbox'
import Input from '@/app/ui/Input'
import React, { useState, useEffect } from 'react'

interface EditPlanDrawerProps {
  onClose: () => void;
  onUpdatePlan: (planData: {
    name: string;
    description: string;
    price: string;
    emailLimit: string;
    leadsCapacity: string;
    campaignLimit: string;
    selectedPlatforms: string[];
  }) => void;
  initialData?: {
    name: string;
    description: string;
    price: string;
    emailLimit: string;
    leadsCapacity: string;
    campaignLimit: string;
    selectedPlatforms: string[];
  };
}

export default function EditPlanDrawer({ onClose, onUpdatePlan, initialData }: EditPlanDrawerProps) {
  const platforms = ["Apollo", "Crunchbase", "Outreach", "LinkedIn Sales Navigator"];
  
  const [planName, setPlanName] = useState("");
  const [planDescription, setPlanDescription] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [emailLimit, setEmailLimit] = useState("");
  const [leadsCapacity, setLeadsCapacity] = useState("");
  const [campaignLimit, setCampaignLimit] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  // Initialize form with initial data when component mounts or initialData changes
  useEffect(() => {
    console.log('EditPlanDrawer - Initial Data:', initialData);
    
    if (initialData) {
      setPlanName(initialData.name || "");
      setPlanDescription(initialData.description || "");
      setPlanPrice(initialData.price || "");
      setEmailLimit(initialData.emailLimit || "");
      setLeadsCapacity(initialData.leadsCapacity || "");
      setCampaignLimit(initialData.campaignLimit || "");
      setSelectedPlatforms(initialData.selectedPlatforms || []);
      
      console.log('EditPlanDrawer - Set State:', {
        name: initialData.name,
        selectedPlatforms: initialData.selectedPlatforms
      });
    }
  }, [initialData]);

  const handlePlatformToggle = (platform: string) => {
    console.log('Toggle platform:', platform);
    console.log('Current selected:', selectedPlatforms);
    
    setSelectedPlatforms(prev => {
      const isSelected = prev.includes(platform);
      const updatedPlatforms = isSelected 
        ? prev.filter(p => p !== platform)
        : [...prev, platform];
      
      console.log('Updated platforms:', updatedPlatforms);
      return updatedPlatforms;
    });
  };

  const handleUpdatePlan = () => {
    const planData = {
      name: planName,
      description: planDescription,
      price: planPrice.startsWith('$') ? planPrice : `$${planPrice}`,
      emailLimit,
      leadsCapacity,
      campaignLimit,
      selectedPlatforms,
    };
    
    console.log('Updating plan with data:', planData);
    onUpdatePlan(planData);
  };

  console.log('EditPlanDrawer - Render State:', {
    planName,
    selectedPlatforms,
    platformsFromProps: initialData?.selectedPlatforms
  });

  return (
    <div className='flex p-5 flex-col h-full justify-between'>
      <div className='space-y-8'>
        <div className="space-y-1">
          <h4 className="heading-4 font-medium text-[#111827]">Edit plan</h4>
          <p className="heading-6 font-normal text-[#70747D]">Update pricing, limits, and features for this subscription plan.</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Input 
              title='Plan name' 
              placeholder='Enter name' 
              className='placeholder:text-[#414652]'
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Input 
              title='Plan Description' 
              placeholder='Enter Description' 
              className='placeholder:text-[#414652]'
              value={planDescription}
              onChange={(e) => setPlanDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Input 
              title='Plan Price' 
              placeholder='Enter Price (e.g., $10 or 10)' 
              className='placeholder:text-[#414652]'
              value={planPrice}
              onChange={(e) => setPlanPrice(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <h5 className="heading-5 font-medium text-[#111827]">Usage limits</h5>
          <div className='space-y-4'>
            <div className="space-y-2">
              <Input 
                title='Email sending limit' 
                placeholder='Enter limit (e.g., 500, unlimited, 2,000)' 
                className='placeholder:text-[#414652]'
                value={emailLimit}
                onChange={(e) => setEmailLimit(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Input 
                title='Leads capacity' 
                placeholder='Enter Capacity (e.g., 200, unlimited, 1,000)' 
                className='placeholder:text-[#414652]'
                value={leadsCapacity}
                onChange={(e) => setLeadsCapacity(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Input 
                title='Campaign limit' 
                placeholder='Enter limit (e.g., 5, unlimited, 10)' 
                className='placeholder:text-[#414652]'
                value={campaignLimit}
                onChange={(e) => setCampaignLimit(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h5 className="heading-5 font-medium text-[#111827]">Platform integration</h5>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            {platforms.map((platform) => {
              const isChecked = selectedPlatforms.includes(platform);
              console.log(`Platform: ${platform}, Checked: ${isChecked}`);
              
              return (
                <div key={platform} className='bg-[#F6F6F6] rounded-lg flex justify-between p-3'>
                  <p className="heading-6 font-normal text-[#414652]">{platform}</p>
                  <Checkbox 
                    // checked={isChecked}
                    onChecked={() => handlePlatformToggle(platform)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="flex gap-3 w-full pt-5 pb-5">
        <LightBtn 
          imageSrc='/images/arrow-left.svg' 
          imagePosition='left' 
          label='Go back' 
          onClick={onClose}
        />
        <PrimaryBtn 
          imageSrc='/images/arrow-right.svg' 
          imagePosition='right' 
          label='Save Changes' 
          onClick={handleUpdatePlan}
        />
      </div>
    </div>
  );
}