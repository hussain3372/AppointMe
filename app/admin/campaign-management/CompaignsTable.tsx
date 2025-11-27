import { useState } from "react";
import SharedTable, { Column } from "@/app/shared/SharedTable";
import ConfirmationModal from "@/app/shared/ConfirmationModal";
import Image from "next/image";

const CompaignsTable = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedcompaignsToDelete, setSelectedcompaignsToDelete] = useState<
    any[]
  >([]);

  // TABLE COLUMNS — copied from your screenshot
  const columns: Column[] = [
    { key: "campaignTitle", label: "Campaign Title",  type: "link",
      linkUrlKey: "compaignName_link", },
    { key: "createdBy", label: "Created By", type: "text" },
    { key: "leads", label: "Leads", type: "text" },
    { key: "openRate", label: "Open Rate", type: "text" },
    { key: "replyRate", label: "Reply Rate", type: "text" },
    { key: "createdOn", label: "Created On", type: "text" },
    { key: "status", label: "Status", type: "status" },
  ];

  const campaignsData = [
    {
      id: 1,
      campaignTitle: "Product Launch",
      createdBy: "Sarah Khan",
      leads: "870",
      openRate: "80%",
      replyRate: "47%",
      createdOn: "June 12, 2025",
      compaignName_link: "/admin/campaign-management/1",
      status: "Ongoing",
    },
    {
      id: 2,
      campaignTitle: "Product Launch",
      createdBy: "Sarah Khan",
      leads: "870",
      openRate: "80%",
      replyRate: "47%",
      createdOn: "June 12, 2025",
      compaignName_link: "/admin/campaign-management/1",
      status: "Completed",
    },
    {
      id: 3,
      campaignTitle: "Product Launch",
      createdBy: "Sarah Khan",
      leads: "870",
      openRate: "80%",
      replyRate: "47%",
      createdOn: "June 12, 2025",
      compaignName_link: "/admin/campaign-management/1",
      status: "Ongoing",
    },
    {
      id: 4,
      campaignTitle: "Product Launch",
      createdBy: "Sarah Khan",
      leads: "870",
      openRate: "80%",
      replyRate: "47%",
      createdOn: "June 12, 2025",
      compaignName_link: "/admin/campaign-management/1",
      status: "Completed",
    },
    {
      id: 5,
      campaignTitle: "Product Launch",
      createdBy: "Sarah Khan",
      leads: "870",
      openRate: "80%",
      replyRate: "47%",
      createdOn: "June 12, 2025",
      compaignName_link: "/admin/campaign-management/1",
      status: "Ongoing",
    },
    {
      id: 6,
      campaignTitle: "Spring Promo Campaign",
      createdBy: "Ali Raza",
      leads: "530",
      openRate: "74%",
      replyRate: "39%",
      createdOn: "May 28, 2025",
      compaignName_link: "/admin/campaign-management/1",
      status: "Completed",
    },
    {
      id: 7,
      campaignTitle: "Q3 Email Drip",
      createdBy: "Hassan Mir",
      leads: "410",
      openRate: "69%",
      replyRate: "41%",
      createdOn: "May 18, 2025",
      compaignName_link: "/admin/campaign-management/1",
      status: "Ongoing",
    },
    {
      id: 8,
      campaignTitle: "Event Invite Series",
      createdBy: "Sarah Khan",
      leads: "960",
      openRate: "82%",
      replyRate: "52%",
      createdOn: "April 10, 2025",
      compaignName_link: "/admin/campaign-management/1",
      status: "Completed",
    },
    {
      id: 9,
      campaignTitle: "Webinar Funnel",
      createdBy: "Moiz Siddiqui",
      leads: "780",
      openRate: "79%",
      replyRate: "44%",
      createdOn: "April 4, 2025",
      compaignName_link: "/admin/campaign-management/1",
      status: "Scheduled",
    },
    {
      id: 10,
      campaignTitle: "Lead Nurture Routine",
      createdBy: "Faizan Noor",
      leads: "350",
      openRate: "73%",
      replyRate: "36%",
      createdOn: "March 25, 2025",
      compaignName_link: "/admin/campaign-management/1",
      status: "Paused",
    },
    {
      id: 11,
      campaignTitle: "Product Awareness",
      createdBy: "Ayesha Malik",
      leads: "1,120",
      openRate: "85%",
      replyRate: "49%",
      createdOn: "March 1, 2025",
      compaignName_link: "/admin/campaign-management/1",
      status: "Completed",
    },
    {
      id: 12,
      campaignTitle: "Sales Follow-up",
      createdBy: "Sarah Khan",
      leads: "690",
      openRate: "77%",
      replyRate: "45%",
      createdOn: "February 20, 2025",
      compaignName_link: "/admin/campaign-management/1",
      status: "Ongoing",
    },
    {
      id: 13,
      campaignTitle: "Customer Retention",
      createdBy: "Ali Raza",
      leads: "540",
      openRate: "70%",
      replyRate: "34%",
      createdOn: "February 12, 2025",
      compaignName_link: "/admin/campaign-management/1",
      status: "Completed",
    },
    {
      id: 14,
      campaignTitle: "VIP Client Outreach",
      createdBy: "Hassan Mir",
      leads: "320",
      openRate: "88%",
      replyRate: "55%",
      createdOn: "January 29, 2025",
      compaignName_link: "/admin/campaign-management/1",
      status: "Completed",
    },
    {
      id: 15,
      campaignTitle: "New Year Promo",
      createdBy: "Ayesha Malik",
      leads: "1,050",
      openRate: "81%",
      replyRate: "43%",
      createdOn: "January 10, 2025",
      compaignName_link: "/admin/campaign-management/1",
      status: "Completed",
    },
    {
      id: 16,
      campaignTitle: "Beta User Invite",
      createdBy: "Faizan Noor",
      leads: "260",
      openRate: "68%",
      replyRate: "31%",
      createdOn: "December 20, 2024",
      compaignName_link: "/admin/campaign-management/1",
      status: "Draft",
    },
    {
      id: 17,
      campaignTitle: "Holiday Sale Campaign",
      createdBy: "Sarah Khan",
      leads: "890",
      openRate: "83%",
      replyRate: "46%",
      createdOn: "December 10, 2024",
      compaignName_link: "/admin/campaign-management/1",
      status: "Completed",
    },
    {
      id: 18,
      campaignTitle: "Partnership Outreach",
      createdBy: "Ali Raza",
      leads: "430",
      openRate: "72%",
      replyRate: "38%",
      createdOn: "November 25, 2024",
      compaignName_link: "/admin/campaign-management/1",
      status: "Ongoing",
    },
    {
      id: 19,
      campaignTitle: "App Launch Notifications",
      createdBy: "Moiz Siddiqui",
      leads: "1,340",
      openRate: "79%",
      replyRate: "40%",
      createdOn: "November 5, 2024",
      compaignName_link: "/admin/campaign-management/1",
      status: "Completed",
    },
    {
      id: 20,
      campaignTitle: "App Launch Notifications",
      createdBy: "Moiz Siddiqui",
      leads: "1,340",
      openRate: "79%",
      replyRate: "40%",
      createdOn: "November 5, 2024",
      compaignName_link: "/admin/campaign-management/1",
      status: "Completed",
    },
  ];

  const filters = [
    {
      key: "openRate",
      label: "Open Rate",
      options: ["All", "0–20%", "20–40%", "40–60%", "60–80%", "80–100%"],
    },
    {
      key: "replyRate",
      label: "Reply Rate",
      options: ["All", "0–20%", "20–40%", "40–60%", "60–80%", "80–100%"],
    },
    {
      key: "status",
      label: "Status",
      options: ["All", "Completed", "Ongoing", "Scheduled", "Draft", "Paused"],
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

  // Handle delete compaigns - open modal
  const handleDeletecompaigns = (selectedRows: any[]) => {
    setSelectedcompaignsToDelete(selectedRows);
    setIsDeleteModalOpen(true);
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
          title={
            <div className="flex gap-1.5 items-center">
             <p className="heading-4 font-medium text-[#111827]"> Campaigns</p> 
              <span className="text-[#70747D] heading-7 font-medium">1.2k</span>
            </div>
          }
          filters={filters}
          searchable={false}
          filterable={true}
          selectable={true}
          onSelect={handleSelect}
          bottomActions={[
            // {
            //   label: "Add to campaign",
            //   onClick: handleAddToCompaign,
            // },
            {
              label: "Delete campaigns",
              onClick: handleDeletecompaigns,
            },
          ]}
          showSelectionCount={true}
          actionsType="inline"
          actions={(row) => (
            <div className="flex gap-1">
              <button
                className="cursor-pointer bg-white p-2 hover:bg-gray-100 rounded-lg custom-shadow"
                onClick={() => handleDeletecompaigns([row])}
              >
                <Image
                  src="/images/delete.svg"
                  alt="Delete"
                  width={16}
                  height={16}
                />
              </button>
            </div>
          )}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeletecompaigns}
        title={
          selectedcompaignsToDelete.length === 1
            ? "Delete this campaign?"
            : `Delete ${selectedcompaignsToDelete.length} campaigns?`
        }
        message={getDeleteMessage()}
        icon="/images/bin.svg"
        confirmText="Delete campaign"
        cancelText="Go back"
      />
    </>
  );
};

export default CompaignsTable;
