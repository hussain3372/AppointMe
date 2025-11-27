import Image from "next/image";
import React, { useState } from "react";
import SubscriptionTable from "./SubscriptionTable";

interface insight {
  id: number;
  date: string;
  update: string;
  recipient: string;
  time: string;
  subject: string;
  content: string;
  img?: string;
  title?: string;
  timeValue?: string;
  duration?: string;
  attendees?: string;
}

export default function Subscription(): React.JSX.Element {
  const stats = [
    {
      id : 1,
      value : "Enterprise",
      title : "Current plan",
      img : "/images/plan.svg"
    },
    {
      id : 2,
      value : "Aug 12, 2025",
      title : "Next billing date",
      img : "/images/calender-colored.svg"
    },
    {
      id : 3,
      value : "$457",
      title : "Lifetime revenue",
      img : "/images/wallet2.svg"
    },
    {
      id : 4,
      value : "Active",
      title : "Subscription status",
      img : "/images/clock-colored.svg"
    },
  ]


  const [expandedContent, setExpandedContent] = useState<{ [key: number]: boolean }>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [insightToDelete, setInsightToDelete] = useState<insight | null>(null);

  const toggleReadMore = (id: number): void => {
    setExpandedContent(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Define actions for the dropdown with proper typing
  const getActions = (row: insight): React.ReactNode => (
    <div className="p-2">
      <button 
        type="button"
        className="w-full  cursor-pointer text-left px-2 py-1 text-sm hover:bg-gray-100 rounded transition-colors duration-200"
        onClick={() => console.log('Edit', row.id)}
      >
        Edit
      </button>
      <button 
        type="button"
        className="w-full  cursor-pointer text-left px-2 py-1 text-sm hover:bg-gray-100 rounded transition-colors duration-200"
        onClick={() => {
          setInsightToDelete(row);
          setIsDeleteModalOpen(true);
        }}
      >
        Delete
      </button>
      <button 
        type="button"
        className="w-full  cursor-pointer text-left px-2 py-1 text-sm hover:bg-gray-100 rounded transition-colors duration-200"
        onClick={() => console.log('Share', row.id)}
      >
        Share
      </button>
    </div>
  );

  const handleDeleteConfirm = () => {
    if (insightToDelete) {
      console.log('Delete insight', insightToDelete.id);
      // Add your actual delete logic here
    }
  };

  const insights: insight[] = [
    {
      id: 1,
      date: "Aug 12, 2025",
      update: "Company news update",
      recipient: "James Hall",
      time: "2 days ago",
      img: "/images/ai-insights-logo.svg",
      subject: "Monthly newsletter",
      timeValue: "2:00 am",
      duration: "30 min",
      attendees: "James Hall,",
      title: "Linkedin optimization and connection maintenance",
      content: "Our analysis shows that optimizing your LinkedIn profile can increase connection requests by 45%. Focus on adding relevant skills, updating your headline to reflect current expertise, and regularly engaging with industry content to maintain active connections and visibility in your network.",
    },
    {
      id: 2,
      date: "Aug 12, 2025",
      update: "Lead engagement overview",
      recipient: "James Hall",
      time: "2 days ago",
      img: "/images/ai-insights-logo.svg",
      title: "Linkedin optimization and connection maintenance",
      timeValue: "2:00 am",
      duration: "30 min",
      attendees: "James Hall,",
      subject: "Monthly newsletter",
      content: "Recent data indicates that personalized connection messages have a 68% higher acceptance rate. Consider tailoring your outreach by mentioning shared interests, groups, or recent posts. Regular engagement with your connections' content can also significantly improve relationship building and future collaboration opportunities.",
    },
    {
      id: 3,
      date: "June 20, 2025",
      update: "Growth Indicators",
      recipient: "James Hall",
      time: "June 20, 2025",
      img: "/images/ai-insights-logo.svg",
      title: "Linkedin optimization and connection maintenance",
      timeValue: "2:00 am",
      duration: "30 min",
      attendees: "James Hall,",
      subject: "Project Update",
      content: "Your network has grown by 15% this quarter, with particularly strong engagement in the technology sector. The AI insights reveal that posting industry-specific content twice weekly and participating in relevant group discussions has driven this growth. Continue this strategy while exploring new networking opportunities in emerging tech fields.",
    },
    {
      id: 4,
      date: "June 20, 2025",
      update: "Funding update",
      recipient: "James Hall",
      time: "June 20, 2025",
      img: "/images/ai-insights-logo.svg",
      title: "Linkedin optimization and connection maintenance",
      timeValue: "2:00 am",
      duration: "30 min",
      attendees: "James Hall,",
      subject: "insight Follow-up",
      content: "Based on our latest analysis, your connection acceptance rate has improved by 22% since implementing the new outreach strategy. The data suggests that maintaining regular but not excessive engagement (2-3 interactions per week per connection) yields the best results for long-term professional relationships and opportunity generation.",
    },
  ];

  // Group insights by date with proper typing
  const groupedinsights = insights.reduce((acc, insight) => {
    if (!acc[insight.date]) {
      acc[insight.date] = [];
    }
    acc[insight.date].push(insight);
    return acc;
  }, {} as Record<string, insight[]>);

  const truncateContent = (content: string, maxLength: number = 150): string => {
    if (content.length <= maxLength) return content;
    return `${content.substring(0, maxLength)}...`;
  };

  return (
    <div className="space-y-5 overflow-auto">
       <div className="grid sm:grid-cols-2 gap-3 lg:grid-cols-4">
                  {
                    stats.map((stat)=>(
                      <div key={stat.id} className="bg-[#F4F4F4] rounded-lg p-3 flex items-center gap-3">
                        <div className=" flex gap-3 items-center">
                          <div className="bg-white p-2 rounded-lg custom-shadow ">
                          <Image width={20} height={20} src={stat.img} alt={stat.title} />
                          </div>
                          <div className="space-y-1">
                            <p className="heading-4 font-normal text-[#111827]">{stat.value}</p>
                            <p className="heading-7 font-normal text-[#70747D]">{stat.title}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                 </div>
      
      
      
      {/* Confirmation Modal for Delete */}
      <SubscriptionTable setIsDrawerOpen={()=>{console.log('something')}}/>
    </div>
  );
}