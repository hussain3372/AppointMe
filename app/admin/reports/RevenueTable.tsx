'use client'
import { useState } from "react";
import SharedTable, { Column } from "@/app/shared/SharedTable";
import ConfirmationModal from "@/app/shared/ConfirmationModal";
// import ActionDropdown from "../shared/ActionDropdown";
import Image from "next/image";

const RevenueTable = ({
  setIsDrawerOpen,
}: {
  setIsDrawerOpen: (value: boolean) => void;
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedManagementToDelete, setSelectedManagementToDelete] = useState<any[]>([]);

  // Define columns with explicit Column[] type
  const columns: Column[] = [
    {
      key: "leadName",
      label: "User Name",
      type: "link",
      linkUrlKey: "leadName_url",
    },
    { key: "contact", label: "Email", type: "text" },
    { key: "plan", label: "Plan", type: "text" },
    { key: "billingCycle", label: "Billing Cycle", type: "text" },
    { key: "startDate", label: "Start date", type: "text" },
    { key: "status", label: "Status", type: "status" },
    { key: "mrr", label: "mrr", type: "text" },
    { key: "nextBilling", label: "next billing", type: "text" },
  ];

  const peopleData = [
    {
      leadName: "Floyd Miles",
      leadName_url: "/admin/reports/floyd-miles",
      contact: "floyd.miles@gmail.com",
      startDate: "Aug 12, 2025",
nextBilling: "July 12, 2025",
      plan : "Pro",
billingCycle:"Monthly",
      mrr: "$45",
      company_image: "https://logo.clearbit.com/google.com",
      address: "Silicon Valley, California",
      status: "Active",
    },
    {
      leadName: "Leslie Alexander",
      leadName_url: "/admin/reports/floyd-miles",

      contact: "leslie.alexander@outlook.com",
      startDate: "Aug 12, 2025",
nextBilling: "July 12, 2025",
      plan : "Pro",
billingCycle:"Monthly",
      mrr: "$45",
      company_image: "https://logo.clearbit.com/microsoft.com",
      address: "Seattle, Washington",
      status: "Inactive",
    },
    {
      leadName: "Courtney Henry",
      leadName_url: "/admin/reports/floyd-miles",

      contact: "courtney.henry@yahoo.com",
      startDate: "Aug 12, 2025",
nextBilling: "July 12, 2025",
      plan : "Pro",
billingCycle:"Monthly",
      mrr: "$45",
      company_image: "https://logo.clearbit.com/meta.com",

      address: "Menlo Park, California",
      status: "Inactive",
    },
    {
      leadName: "Wade Warren",
      leadName_url: "/admin/reports/floyd-miles",

      contact: "wade.warren@gmail.com",
      startDate: "Aug 12, 2025",
nextBilling: "July 12, 2025",
      plan : "Pro",
billingCycle:"Monthly",
      mrr: "$45",
      company_image: "https://logo.clearbit.com/figma.com",

      address: "San Francisco, California",
      status: "Active",
    },
  ];

  // Define filters
  const filters = [
     {
      key: "status",
      label: "Status",
      options: [
        "Active",
        "Inactive",
      ],
    },
    {
      key: "plan",
      label: "Plan",
      options: [
        "All",
        "Pro",
        "Economy",
        "Basic",
      ],
    },
    {
      key: "billingCycle",
      label: "Billing Cycle",
      options: [
        "All",
        "Monthly",
        "Yearly",
        
      ],
    },
   
    {
      key: "date",
      label: "Date",
      options: [
        "Aug 12, 2025",
        "Aug 24, 2025",
        "Sept 06, 2025",
        "Sept 18, 2025",
      ],
    },
    {
      key: "nextBilling",
      label: "Next billing",
      options: [
        "All",
        "July 12, 2025",        
        "July 24, 2025",        
        "Aug 06, 2025",        
      ],
    },
   
   
  ];

  // Handle selection
  const handleSelect = (selectedRows: any[]) => {
    console.log("Selected rows:", selectedRows);
  };

  // Handle add to campaign
  const handleAddToCampaign = () => {
    // console.log("Add to campaign:", selectedRows);
    setIsDrawerOpen(true);
  };

  // Handle download CSV
  // const handleDownloadCSV = (selectedRows: any[]) => {
  //   console.log("Download CSV:", selectedRows);
  //   const csv = convertToCSV(selectedRows);
  //   downloadCSV(csv, "people-data.csv");
  // };

  // Handle delete leads - open modal
  const handleDeleteManagement = (selectedRows: any[]) => {
    setSelectedManagementToDelete(selectedRows);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const confirmDeleteManagement = () => {
    console.log("Deleting leads:", selectedManagementToDelete);
    // Your actual delete logic here
    // For example: API call to delete leads
    // deleteManagementAPI(selectedManagementToDelete.map(lead => lead.id));

    // Reset selection
    setSelectedManagementToDelete([]);
  };

  // Helper function to convert data to CSV
  const convertToCSV = (data: any[]) => {
    const headers = columns.map((col) => col.label).join(",");
    const rows = data.map((row) =>
      columns.map((col) => row[col.key]).join(",")
    );
    return [headers, ...rows].join("\n");
  };

  // Helper function to download CSV
  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  

  const getDeleteMessage = () => {
    const count = selectedManagementToDelete.length;
    if (count === 1) {
      return "Are you sure you want to delete this user? This action will permanently remove all related data.";
    }
    return `Are you sure you want to delete ${count} users? This action will permanently remove all related data.`;
  };

  return (
    <>
      <div className="">
        <SharedTable
          columns={columns}
          data={peopleData}
          title="Revenue by plan tier"
          filters={filters}
          searchable={false}
          filterable={true}
          selectable={true}
          hidePagination={true}
          onSelect={handleSelect}
          bottomActions={[
           
            {
              label: "Delete Users",
              onClick: handleDeleteManagement,
            },
          ]}
          showSelectionCount={true}
          actionsType="inline"
         
        />
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteManagement}
        title={
          selectedManagementToDelete.length === 1
            ? "Delete this User?"
            : `Delete ${selectedManagementToDelete.length} Users ?`
        }
        message={getDeleteMessage()}
        icon="/images/bin.svg"
        confirmText="Delete user"
        cancelText="Go back"
      />
    </>
  );
};

export default RevenueTable;
