'use client'
import React, { useState, useRef } from "react";
import { Dropdown } from '@/app/shared/Dropdown';
import Image from 'next/image';
import { StatsDropdown } from "@/app/shared/StatsDropdown";
import SubscriptionTable from "./SubscriptionTable";

type TimePeriodKey = keyof typeof mockData;
type StatId = 1 | 2 | 3 | 4;

// Mock data for different time periods
const mockData = {
  "today": {
    1: { value: "12k", title: "Total subscriptions" },
    2: { value: "10k", title: "Active subscriptions" },
    3: { value: "2k", title: "Expired subscriptions" },
    4: { value: "$35.5M", title: "Total revenue" }
  },
  "yesterday": {
    1: { value: "20k", title: "Total subscriptions" },
    2: { value: "15k", title: "Active subscriptions" },
    3: { value: "4k", title: "Expired subscriptions" },
    4: { value: "$40M", title: "Total revenue" }
  },
  "this-week": {
    1: { value: "25k", title: "Total subscriptions" },
    2: { value: "20k", title: "Active subscriptions" },
    3: { value: "6k", title: "Expired subscriptions" },
    4: { value: "$45M", title: "Total revenue" }
  },
  "this-month": {
    1: { value: "30k", title: "Total subscriptions" },
    2: { value: "25k", title: "Active subscriptions" },
    3: { value: "8k", title: "Expired subscriptions" },
    4: { value: "$50M", title: "Total revenue" }
  },
  "this-quarter": {
    1: { value: "40k", title: "Total subscriptions" },
    2: { value: "30k", title: "Active subscriptions" },
    3: { value: "10k", title: "Expired subscriptions" },
    4: { value: "$55M", title: "Total revenue" }
  },
  "this-year": {
    1: { value: "50k", title: "Total subscriptions" },
    2: { value: "40k", title: "Active subscriptions" },
    3: { value: "12k", title: "Expired subscriptions" },
    4: { value: "$6 0M", title: "Total revenue" }
  }
};

export default function Subscription() {
    const [dropdownStates, setDropdownStates] = useState<{ [key: number]: boolean }>({});
    const [selectedValues, setSelectedValues] = useState<{ [key: number]: string }>({});
    const [statsData, setStatsData] = useState<{ [key: number]: { value: string; title: string } }>({});
    const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

    // Common dropdown options for all stats
    const timeOptions = [
        { value: "today", label: "Today" },
        { value: "yesterday", label: "Yesterday" },
        { value: "this-week", label: "This Week" },
        { value: "this-month", label: "This Month" },
        { value: "this-quarter", label: "This Quarter" },
        { value: "this-year", label: "This Year" }
    ];

    const statsConfig = [
        {
            id: 1,
            img: "/images/users.svg",
            dropdownDefault: "today"
        },
        {
            id: 2,
            img: "/images/users.svg",
            dropdownDefault: "today"
        },
        {
            id: 3,
            img: "/images/users.svg",
            dropdownDefault: "this-month"
        },
        {
            id: 4,
            img: "/images/wallet2.svg",
            dropdownDefault: "today"
        },
    ];

    // Initialize selected values and stats data based on config
    React.useEffect(() => {
        const initialValues: { [key: number]: string } = {};
        const initialData: { [key: number]: { value: string; title: string } } = {};

        statsConfig.forEach(stat => {
            initialValues[stat.id] = stat.dropdownDefault;
initialData[stat.id] = mockData[stat.dropdownDefault as TimePeriodKey][stat.id as StatId];
        });

        setSelectedValues(initialValues);
        setStatsData(initialData);
    }, []);

    const handleToggle = (id: number) => {
        setDropdownStates(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleSelect = (id: number, value: string) => {
        setSelectedValues(prev => ({
            ...prev,
            [id]: value
        }));

        // Update the specific stat data based on the selected time period
        setStatsData(prev => ({
            ...prev,
[id]: mockData[value as TimePeriodKey][id as StatId]
        }));

        console.log(`Stat ${id} time period changed to: ${value}`);
    };

    const handleClickOutside = (event: MouseEvent) => {
        Object.entries(dropdownRefs.current).forEach(([id, ref]) => {
            if (ref && !ref.contains(event.target as Node)) {
                setDropdownStates(prev => ({
                    ...prev,
                    [Number(id)]: false
                }));
            }
        });
    };

    // Add click outside listener
    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getSelectedLabel = (id: number) => {
        const selectedValue = selectedValues[id];
        const option = timeOptions.find(opt => opt.value === selectedValue);
        return option ? option.label : "Select time";
    };

    return (
        <div className='space-y-5'>
            
            
            <div className="grid md:grid-cols-4 gap-3 sm:grid-cols-2">
                {statsConfig.map((stat) => (
                    <div key={stat.id} className='bg-[#F4F4F4] rounded-lg space-y-3 p-3'>
                        <div className="flex justify-between items-start">
                            <div className="bg-white custom-shadow rounded-lg p-2">
                                <Image src={stat.img} alt={statsData[stat.id]?.title || "Stat"} height={20} width={20} />
                            </div>
                            <div className="relative">
                                <StatsDropdown
                                    ref={(el: HTMLDivElement | null) => {
                                        dropdownRefs.current[stat.id] = el;
                                    }}
                                    isOpen={dropdownStates[stat.id] || false}
                                    onToggle={() => handleToggle(stat.id)}
                                    options={timeOptions}
                                    selectedValue={selectedValues[stat.id] || stat.dropdownDefault}
                                    onSelect={(value) => handleSelect(stat.id, value)}
                                    placeholder="Select time"
                                    title={getSelectedLabel(stat.id)}
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="heading-4 font-normal text-[#111827]">
                                {statsData[stat.id]?.value || "Loading..."}
                            </p>
                            <p className="heading-7 font-normal text-[#70747D]">
                                {statsData[stat.id]?.title || "Loading..."}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <SubscriptionTable setIsDrawerOpen={()=>{console.log('')}} />
        </div>
    );
}