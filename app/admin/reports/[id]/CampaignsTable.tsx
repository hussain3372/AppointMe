import { useState } from "react";
import SharedTable, { Column } from "@/app/shared/SharedTable";
import ConfirmationModal from "@/app/shared/ConfirmationModal";
// import ActionDropdown from "../shared/ActionDropdown";

const CampaignsTable = ({
  setIsDrawerOpen,
}: {
  setIsDrawerOpen: (value: boolean) => void;
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedManagementToDelete, setSelectedManagementToDelete] = useState<any[]>([]);

  // Define columns with explicit Column[] type
  const columns: Column[] = [
    {
      key: "campaignName",
      label: "Campaign name",
      type: "text",
      linkUrlKey: "leadName_url",
    },
    { key: "leads", label: "total leads", type: "text" },
    { key: "emails", label: "Emails send", type: "text" },
    { key: "createdDate", label: "Created date", type: "text" },
    { key: "status", label: "Status", type: "status" },
  ];

  const peopleData = [
    {
      campaignName : "Product launch",
      leadName_url: "/admin/user-management/floyd-miles",
      contact: "floyd.miles@gmail.com",
      createdDate : "Aug 12, 2025",
      leads : "870",
      emails:"450",
      company_image: "https://logo.clearbit.com/google.com",
      address: "Silicon Valley, California",
      status: "Active",
    },
    {
      campaignName : "Product launch",
      leadName_url: "/admin/user-management/floyd-miles",

      contact: "leslie.alexander@outlook.com",
      createdDate : "Aug 12, 2025",
      leads : "870",
      emails:"450",
      company_image: "https://logo.clearbit.com/microsoft.com",
      address: "Seattle, Washington",
      status: "Inactive",
    },
    {
     campaignName : "Product launch",
      leadName_url: "/admin/user-management/floyd-miles",

      contact: "courtney.henry@yahoo.com",
      createdDate : "Aug 12, 2025",
      leads : "870",
      emails:"450",
      company_image: "https://logo.clearbit.com/meta.com",

      address: "Menlo Park, California",
      status: "Inactive",
    },
    {
     campaignName : "Product launch",
      leadName_url: "/admin/user-management/floyd-miles",

      contact: "wade.warren@gmail.com",
      createdDate : "Aug 12, 2025",
      leads : "870",
      emails:"450",
      company_image: "https://logo.clearbit.com/figma.com",

      address: "San Francisco, California",
      status: "Active",
    },
    {
     campaignName : "Product launch",

      contact: "jenny.wilson@icloud.com",
      createdDate : "Aug 12, 2025",
      leads : "870",
      emails:"450",
      company_image: "https://logo.clearbit.com/netflix.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "Los Gatos, California",
      status: "Inactive",
    },
    {
      campaignName : "Product launch",

      contact: "albert.flores@gmail.com",
      createdDate : "Aug 12, 2025",
      leads : "870",
      emails:"450",
      company_image: "https://logo.clearbit.com/amazon.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "Seattle, Washington",
      status: "Active",
    },
    {
     campaignName : "Product launch",

      contact: "cameron.williamson@protonmail.com",
      createdDate : "Aug 12, 2025",
     leads : "870",
     emails:"450",
      company_image: "https://logo.clearbit.com/vercel.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "Lahore, Pakistan",
      status: "Inactive",
    },
    {
     campaignName : "Product launch",

      contact: "brooklyn.simmons@gmail.com",
      createdDate : "Aug 12, 2025",
      leads : "870",
      emails:"450",
      company_image: "https://logo.clearbit.com/salesforce.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "New York, USA",
      status: "Inactive",
    },
    {
     campaignName : "Product launch",

      contact: "theresa.webb@gmail.com",
      createdDate : "Aug 12, 2025",
      leads : "870",
      emails:"450",
      company_image: "https://logo.clearbit.com/trello.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "Austin, Texas",
      status: "Active",
    },
    {
     campaignName : "Product launch",

      contact: "esther.howard@live.com",
      createdDate : "Aug 12, 2025",
      leads : "870",
      emails:"450",
      company_image: "https://logo.clearbit.com/spotify.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "Stockholm, Sweden",
      status: "Inactive",
    },
    {
     campaignName : "Product launch",

      contact: "guy.hawkins@gmail.com",
      createdDate : "Aug 12, 2025",
      leads : "870",
      emails:"450",
      company_image: "https://logo.clearbit.com/apple.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "Cupertino, California",
      status: "Active",
    },
    {
      campaignName : "Product launch",

      contact: "dianne.russell@gmail.com",
      createdDate : "Aug 12, 2025",
      leads : "870",
      emails:"450",
      company_image: "https://logo.clearbit.com/zoom.us",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "San Jose, California",
      status: "Inactive",
    },
    {
     campaignName : "Product launch",

      contact: "eleanor.pena@outlook.com",
      createdDate : "Aug 12, 2025",
      leads : "870",
      emails:"450",
      company_image: "https://logo.clearbit.com/slack.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "New York, USA",
      status: "Active",
    },
    {
     campaignName : "Product launch",

      contact: "marvin.mckinney@gmail.com",
      createdDate : "Aug 12, 2025",
      leads : "870",
      emails:"450",
      company_image: "https://logo.clearbit.com/atlassian.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "Sydney, Australia",
      status: "Inactive",
    },
    {
     campaignName : "Product launch",
      contact: "annette.black@gmail.com",
      createdDate : "Aug 12, 2025",
      leads : "870",
      emails:"450",
      company_image: "https://logo.clearbit.com/dribbble.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "Toronto, Canada",
      status: "Inactive",
    },
    {
     campaignName : "Product launch",

      contact: "ralph.edwards@gmail.com",
      createdDate : "Aug 12, 2025",
      leads : "870",
     emails:"450",
      company_image: "https://logo.clearbit.com/canva.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "Sydney, Australia",
      status: "Active",
    },
    {
     campaignName : "Product launch",
      contact: "jacob.jones@gmail.com",
      createdDate : "Aug 12, 2025",
      leads : "870",
      emails:"450",
      company_image: "https://logo.clearbit.com/dropbox.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "San Francisco, California",
      status: "Inactive",
    },
    {
    campaignName : "Product launch",
      leadName_url: "/admin/user-management/floyd-miles",

      contact: "kathryn.murphy@icloud.com",
      createdDate : "Aug 12, 2025",
     leads : "870",
      emails:"450",
      company_image: "https://logo.clearbit.com/indeed.com",

      address: "Austin, Texas",
      status: "Inactive",
    },
    {
     campaignName : "Product launch",
      leadName_url: "/admin/user-management/floyd-miles",

      contact: "jerome.bell@gmail.com",
      createdDate : "Aug 12, 2025",
      leads : "870",
      emails:"450",
      company_image: "https://logo.clearbit.com/github.com",

      address: "San Francisco, California",
      status: "Active",
    },
    {
     campaignName : "Product launch",

      contact: "devon.lane@gmail.com",
      createdDate : "Aug 12, 2025",
      leads : "870",
      emails:"450",
      company_image: "https://logo.clearbit.com/openai.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "San Francisco, California",
      status: "Inactive",
    },
  ];

  // Define filters
  const filters = [
    {
      key: "plan",
      label: "Plan",
      options: [
        "All",
        "Pro",
        "Enterprise",
        "Basic",
      ],
    },
    {
      key: "status",
      label: "Status",
      options: [
        "Active",
        "Inactive",
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
      return "Are you sure you want to delete this Campaign? This action will permanently remove all related data.";
    }
    return `Are you sure you want to delete ${count} Campaigns? This action will permanently remove all related data.`;
  };

  return (
    <>
      <div>
        <SharedTable
          columns={columns}
          data={peopleData}
          title="Campaigns overview"
          filters={filters}
          searchable={false}
          filterable={true}
          selectable={true}
          onSelect={handleSelect}
          bottomActions={[
           
            {
              label: "Delete Campaigns",
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
            ? "Delete this Campaign?"
            : `Delete ${selectedManagementToDelete.length} Campaigns ?`
        }
        message={getDeleteMessage()}
        icon="/images/bin.svg"
        confirmText="Delete campaign"
        cancelText="Go back"
      />
    </>
  );
};

export default CampaignsTable;
