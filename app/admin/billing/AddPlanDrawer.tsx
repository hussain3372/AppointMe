import LightBtn from '@/app/ui/buttons/LightButton'
import PrimaryBtn from '@/app/ui/buttons/PrimaryBtn'
import Checkbox from '@/app/ui/Checkbox'
import Input from '@/app/ui/Input'
import React, { useState } from 'react'

interface AddPlanDrawerProps {
  onClose: () => void;
  onAddPlan: (planData: {
    name: string;
    description: string;
    price: string;
    emailLimit: string;
    leadsCapacity: string;
    campaignLimit: string;
    selectedPlatforms: string[];
  }) => void;
}

interface FormErrors {
  name?: string;
  description?: string;
  price?: string;
  emailLimit?: string;
  leadsCapacity?: string;
  campaignLimit?: string;
  platforms?: string;
}

export default function AddPlanDrawer({ onClose, onAddPlan }: AddPlanDrawerProps) {
  const platforms = ["Appolo", "Crunchbase", "Outreach", "LinkedIn sales navigator"];
  
  const [planName, setPlanName] = useState("");
  const [planDescription, setPlanDescription] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [emailLimit, setEmailLimit] = useState("");
  const [leadsCapacity, setLeadsCapacity] = useState("");
  const [campaignLimit, setCampaignLimit] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!planName.trim()) {
      newErrors.name = "Plan name is required";
    }

    if (!planDescription.trim()) {
      newErrors.description = "Plan description is required";
    }

    if (!planPrice.trim()) {
      newErrors.price = "Plan price is required";
    } else if (!/^\$?[0-9]+(\.[0-9]{2})?$/.test(planPrice) && !/^[0-9]+(\.[0-9]{2})?$/.test(planPrice)) {
      newErrors.price = "Please enter a valid price (e.g., 10 or $10.00)";
    }

    if (!emailLimit.trim()) {
      newErrors.emailLimit = "Email sending limit is required";
    }

    if (!leadsCapacity.trim()) {
      newErrors.leadsCapacity = "Leads capacity is required";
    }

    if (!campaignLimit.trim()) {
      newErrors.campaignLimit = "Campaign limit is required";
    }

    if (selectedPlatforms.length === 0) {
      newErrors.platforms = "Please select at least one platform";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev => {
      const updatedPlatforms = prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform];
      
      if (updatedPlatforms.length > 0 && errors.platforms) {
        setErrors(prev => ({ ...prev, platforms: undefined }));
      }
      
      return updatedPlatforms;
    });
  };

  const handleFieldChange = (field: keyof FormErrors, value: string) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    switch (field) {
      case 'name':
        setPlanName(value);
        break;
      case 'description':
        setPlanDescription(value);
        break;
      case 'price':
        setPlanPrice(value);
        break;
      case 'emailLimit':
        setEmailLimit(value);
        break;
      case 'leadsCapacity':
        setLeadsCapacity(value);
        break;
      case 'campaignLimit':
        setCampaignLimit(value);
        break;
    }
  };

  const handleAddPlan = () => {
    if (!validateForm()) {
      return;
    }

    onAddPlan({
      name: planName,
      description: planDescription,
      price: planPrice.startsWith('$') ? planPrice : `$${planPrice}`,
      emailLimit,
      leadsCapacity,
      campaignLimit,
      selectedPlatforms,
    });
  };

  return (
    <div className='flex p-5 flex-col h-full justify-between'>
      <div className='space-y-8'>
        <div className="space-y-1">
          <h4 className="heading-4 font-medium text-[#111827]">Add new plan</h4>
          <p className="heading-6 font-normal text-[#70747D]">Define pricing, limits, and features for this subscription plan.</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Input 
              title='Plan name' 
              placeholder='Enter name' 
              className='placeholder:text-[#414652]'
              value={planName}
              onChange={(e) => handleFieldChange('name', e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm font-normal">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input 
              title='Plan Description' 
              placeholder='Enter Description' 
              className='placeholder:text-[#414652]'
              value={planDescription}
              onChange={(e) => handleFieldChange('description', e.target.value)}
            />
            {errors.description && (
              <p className="text-red-500 text-sm font-normal">{errors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input 
              title='Plan Price' 
              placeholder='Enter Price' 
              className='placeholder:text-[#414652]'
              value={planPrice}
              onChange={(e) => handleFieldChange('price', e.target.value)}
            />
            {errors.price && (
              <p className="text-red-500 text-sm font-normal">{errors.price}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <h5 className="heading-5 font-medium text-[#111827]">Usage limits</h5>
          <div className='space-y-4'>
            <div className="space-y-2">
              <Input 
                title='Email sending limit' 
                placeholder='Enter limit' 
                className='placeholder:text-[#414652]'
                value={emailLimit}
                onChange={(e) => handleFieldChange('emailLimit', e.target.value)}
              />
              {errors.emailLimit && (
                <p className="text-red-500 text-sm font-normal">{errors.emailLimit}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input 
                title='Leads capacity' 
                placeholder='Enter Capacity' 
                className='placeholder:text-[#414652]'
                value={leadsCapacity}
                onChange={(e) => handleFieldChange('leadsCapacity', e.target.value)}
              />
              {errors.leadsCapacity && (
                <p className="text-red-500 text-sm font-normal">{errors.leadsCapacity}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input 
                title='Campaign limit' 
                placeholder='Enter limit' 
                className='placeholder:text-[#414652]'
                value={campaignLimit}
                onChange={(e) => handleFieldChange('campaignLimit', e.target.value)}
              />
              {errors.campaignLimit && (
                <p className="text-red-500 text-sm font-normal">{errors.campaignLimit}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h5 className="heading-5 font-medium text-[#111827]">Platform integration</h5>
            {errors.platforms && (
              <p className="text-red-500 text-sm font-normal">{errors.platforms}</p>
            )}
          </div>
          <div className='grid grid-cols-2 gap-4'>
            {platforms.map((platform) => (
              <div key={platform} className='bg-[#F6F6F6] rounded-lg flex justify-between p-3'>
                <p className="heading-6 font-normal text-[#414652]">{platform}</p>
                <Checkbox 
                  checked={selectedPlatforms.includes(platform)}
                  onChecked={() => handlePlatformToggle(platform)}
                />
              </div>
            ))}
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
          label='Add plan' 
          onClick={handleAddPlan}
        />
      </div>
    </div>
  );
}