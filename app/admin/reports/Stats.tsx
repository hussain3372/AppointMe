'use client'
import React, { useState, useRef } from "react";
import { Dropdown } from '@/app/shared/Dropdown';
import Image from 'next/image';
import { StatsDropdown } from "@/app/shared/StatsDropdown";

type TimePeriodKey = keyof typeof mockData;
type StatId = 1 | 2 | 3 | 4;

// Mock data for different time periods
const mockData = {
  "today": {
    1: { value: "$3.2M", title: "Total revenue" },
    2: { value: "2.1M", title: "Active subscribers" },
    3: { value: "20%", title: "Churn rate" },
    4: { value: "65K", title: "Refunds" }
  },
  "yesterday": {
    1: { value: "$2.8M", title: "Total revenue" },
    2: { value: "2.0M", title: "Active subscribers" },
    3: { value: "18%", title: "Churn rate" },
    4: { value: "58K", title: "Refunds" }
  },
  "this-week": {
    1: { value: "$22.4M", title: "Total revenue" },
    2: { value: "2.3M", title: "Active subscribers" },
    3: { value: "15%", title: "Churn rate" },
    4: { value: "420K", title: "Refunds" }
  },
  "this-month": {
    1: { value: "$96.5M", title: "Total revenue" },
    2: { value: "2.5M", title: "Active subscribers" },
    3: { value: "12%", title: "Churn rate" },
    4: { value: "1.8M", title: "Refunds" }
  },
  "this-quarter": {
    1: { value: "$289.2M", title: "Total revenue" },
    2: { value: "2.8M", title: "Active subscribers" },
    3: { value: "10%", title: "Churn rate" },
    4: { value: "5.2M", title: "Refunds" }
  },
  "this-year": {
    1: { value: "$1.16B", title: "Total revenue" },
    2: { value: "3.2M", title: "Active subscribers" },
    3: { value: "8%", title: "Churn rate" },
    4: { value: "18.5M", title: "Refunds" }
  }
};

export default function Stats() {
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
            img: "/images/wallet2.svg",
            dropdownDefault: "today"
        },
        {
            id: 2,
            img: "/images/users.svg",
            dropdownDefault: "today"
        },
        {
            id: 3,
            img: "/images/graph-down.svg",
            dropdownDefault: "this-month"
        },
        {
            id: 4,
            img: "/images/recycle.svg",
            dropdownDefault: "this-month"
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
            <div className='space-y-2'>
                <h2 className="heading-2 font-medium text-[#111827]">Reports & analytics overview</h2>
                <p className="heading-5 font-normal text-[#70747D]">Access detailed analytics to understand growth, revenue, and user behavior.</p>
            </div>
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
        </div>
    );
}