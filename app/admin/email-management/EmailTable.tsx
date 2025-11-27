import { useState } from "react";
import SharedTable, { Column } from "@/app/shared/SharedTable";
const EmailTable = () => {
  const [selectedcompaignsToDelete, setSelectedcompaignsToDelete] = useState<
    any[]
  >([]);

  // TABLE COLUMNS — copied from your screenshot
  const columns: Column[] = [
    {
      key: "campaignTitle",
      label: "Email subject",
      type: "link",
      linkUrlKey: "compaignName_link",
    },
    { key: "leads", label: "Leads", type: "text" },
    { key: "campaign", label: "Campaign", type: "text" },
    { key: "company", label: "Company", type: "text" },
    { key: "openRate", label: "Open Rate", type: "image" , imagePosition:"right"},
    { key: "dateSent", label: "Date sent", type: "text" },
    { key: "status", label: "Status", type: "status" },
  ];

  const campaignsData = [
    {
      id: 1,
      campaignTitle: "Product Launch",
      campaign : "Product Launch",
      leads: "870",
      openRate: "80%",
      company : "Google",
      replyRate: "47%",
      dateSent: "June 12, 2025",
      compaignName_link: "/admin/email-management/1",
      openRate_image : "/images/graph-red.png",
      
      status: "Failed",
    },
    {
      id: 2,
      campaignTitle: "Product Launch",
      campaign : "Product Launch",
      leads: "870",
      openRate: "80%",
      company:"Microsoft",
      replyRate: "47%",
      dateSent: "June 12, 2025",
      compaignName_link: "/admin/email-management/1",
      openRate_image : "/images/graph-red.png",
      status: "Opened",
    },
    {
      id: 3,
      campaignTitle: "Product Launch",
      campaign : "Product Launch",
      leads: "870",
      openRate: "80%",
      replyRate: "47%",
      company:"Vordx",
      dateSent: "June 12, 2025",
      compaignName_link: "/admin/email-management/1",
      openRate_image : "/images/graph-green.png",
      status: "Failed",
    },
    {
      id: 4,
      campaignTitle: "Product Launch",
      campaign : "Product Launch",
      leads: "870",
      openRate: "80%",
      company:"Microsoft",
      replyRate: "47%",
      dateSent: "June 12, 2025",
      compaignName_link: "/admin/email-management/1",
      openRate_image : "/images/graph-green.png",
      status: "Opened",
    },
    {
      id: 5,
      campaignTitle: "Product Launch",
      campaign : "Product Launch",
      leads: "870",
      openRate: "80%",
      replyRate: "47%",
      company : "Google",
      dateSent: "June 12, 2025",
      compaignName_link: "/admin/email-management/1",
      openRate_image : "/images/graph-red.png",
      status: "Failed",
    },
    {
      id: 6,
      campaignTitle: "Spring Promo Campaign",
      campaign : "Product launch",
      leads: "530",
      openRate: "74%",
      replyRate: "39%",
      company:"Vordx",
      dateSent: "May 28, 2025",
      compaignName_link: "/admin/email-management/1",
      openRate_image : "/images/graph-red.png",
      status: "Opened",
    },
    {
      id: 7,
      campaignTitle: "Q3 Email Drip",
      campaign : "-",
      leads: "410",
      openRate: "69%",
      company:"Microsoft",
      replyRate: "41%",
      dateSent: "May 18, 2025",
      compaignName_link: "/admin/email-management/1",
      openRate_image : "/images/graph-green.png",
      status: "Failed",
    },
    {
      id: 8,
      campaignTitle: "Event Invite Series",
      campaign : "Product Launch",
      leads: "960",
      openRate: "82%",
      replyRate: "52%",
      company : "Google",
      dateSent: "April 10, 2025",
      compaignName_link: "/admin/email-management/1",
      openRate_image : "/images/graph-green.png",
      status: "Opened",
    },
    {
      id: 9,
      campaignTitle: "Webinar Funnel",
      campaign : "Product launch",
      leads: "780",
      openRate: "79%",
      replyRate: "44%",
      company : "Google",
      dateSent: "April 4, 2025",
      compaignName_link: "/admin/email-management/1",
      openRate_image : "/images/graph-green.png",
      status: "Sent",
    },
    {
      id: 10,
      campaignTitle: "Lead Nurture Routine",
      campaign : "Product launch",
      leads: "350",
      openRate: "73%",
      company:"Microsoft",
      replyRate: "36%",
      dateSent: "March 25, 2025",
      compaignName_link: "/admin/email-management/1",
      openRate_image : "/images/graph-red.png",
      status: "Sent",
    },
    {
      id: 11,
      campaignTitle: "Product Awareness",
      campaign : "-",
      leads: "1,120",
      openRate: "85%",
      replyRate: "49%",
      company : "Google",
      dateSent: "March 1, 2025",
      compaignName_link: "/admin/email-management/1",
      openRate_image : "/images/graph-green.png",
      status: "Opened",
    },
    {
      id: 12,
      campaignTitle: "Sales Follow-up",
      campaign : "Product Launch",
      leads: "690",
      openRate: "77%",
      replyRate: "45%",
      company:"Microsoft",
      dateSent: "February 20, 2025",
      compaignName_link: "/admin/email-management/1",
      openRate_image : "/images/graph-green.png",
      status: "Failed",
    },
    {
      id: 13,
      campaignTitle: "Customer Retention",
      campaign : "Product launch",
      leads: "540",
      openRate: "70%",
      replyRate: "34%",
      company : "Google",
      dateSent: "February 12, 2025",
      compaignName_link: "/admin/email-management/1",
      openRate_image : "/images/graph-red.png",
      status: "Opened",
    },
    {
      id: 14,
      campaignTitle: "VIP Client Outreach",
      campaign : "-",
      leads: "320",
      openRate: "88%",
      replyRate: "55%",
      company:"Microsoft",
      dateSent: "January 29, 2025",
      compaignName_link: "/admin/email-management/1",
      openRate_image : "/images/graph-red.png",
      status: "Opened",
    },
    {
      id: 15,
      campaignTitle: "New Year Promo",
      campaign : "-",
      leads: "1,050",
      openRate: "81%",
      replyRate: "43%",
      company : "Google",
      dateSent: "January 10, 2025",
      compaignName_link: "/admin/email-management/1",
      openRate_image : "/images/graph-green.png",
      status: "Opened",
    },
    {
      id: 16,
      campaignTitle: "Beta User Invite",
      campaign : "Product launch",
      leads: "260",
      openRate: "68%",
      replyRate: "31%",
      company:"Microsoft",
      dateSent: "December 20, 2024",
      compaignName_link: "/admin/email-management/1",
      openRate_image : "/images/graph-red.png",
      status: "Sent",
    },
    {
      id: 17,
      campaignTitle: "Holiday Sale Campaign",
      campaign : "Product Launch",
      leads: "890",
      openRate: "83%",
      replyRate: "46%",
      dateSent: "December 10, 2024",
      company:"Vordx",
      compaignName_link: "/admin/email-management/1",
      openRate_image : "/images/graph-red.png",
      status: "Opened",
    },
    {
      id: 18,
      campaignTitle: "Partnership Outreach",
      campaign : "Product launch",
      leads: "430",
      openRate: "72%",
      replyRate: "38%",
      dateSent: "November 25, 2024",
      company:"Vordx",
      compaignName_link: "/admin/email-management/1",
      openRate_image : "/images/graph-green.png",
      status: "Failed",
    },
    {
      id: 19,
      campaignTitle: "App Launch Notifications",
      campaign : "Product launch",
      leads: "1,340",
      openRate: "79%",
      replyRate: "40%",
      company : "Google",
      dateSent: "November 5, 2024",
      compaignName_link: "/admin/email-management/1",
      openRate_image : "/images/graph-red.png",
      status: "Opened",
    },
    {
      id: 20,
      campaignTitle: "App Launch Notifications",
      campaign : "Product launch",
      leads: "1,340",
      openRate: "79%",
      replyRate: "40%",
      company : "Google",
      dateSent: "November 5, 2024",
      compaignName_link: "/admin/email-management/1",
      openRate_image : "/images/graph-green.png",
      status: "Opened",
    },
  ];

  const filters = [
    {
      key: "status",
      label: "Status",
      options: ["All", "Opened", "Failed", "Sent", "Sent", "Sent"],
    },
    {
      key: "openRate",
      label: "Company name",
      options: ["All", "Google", "Apple", "Microsoft", "Vordx",],
    },
   
    {
      key: "dateRange",
      label: "Date",
      options: [
        "All Time",
        "Last 7 days",
        "Last 30 days",
        "Last 90 days",
        "Custom Range",
      ],
    },
  ];

  // Handle selection
  const handleSelect = (selectedRows: any[]) => {
    console.log("Selected rows:", selectedRows);
  };

  // Confirm delete
  const confirmDeletecompaigns = () => {
    console.log("Deleting compaigns:", selectedcompaignsToDelete);
    // Your actual delete logic here
    setSelectedcompaignsToDelete([]);
  };

  const getDeleteMessage = () => {
    const count = selectedcompaignsToDelete.length;
    if (count === 1) {
      return "Are you sure you want to delete the campaign Product Launch? This action cannot be undone. All associated emails, stats, and settings will be permanently removed.";
    }
    return `Are you sure you want to delete the campaign Product Launch? This action cannot be undone. All associated emails, stats, and settings will be permanently removed.`;
  };

  return (
    <>
      <div>
        <SharedTable
          columns={columns}
          data={campaignsData}
          title="Emails sent"
          filters={filters}
          searchable={false}
          filterable={true}
          selectable={true}
          onSelect={handleSelect}
          showSelectionCount={true}
        />
      </div>
    </>
  );
};

export default EmailTable;
