import { useState } from "react";
import SharedTable, { Column } from "@/app/shared/SharedTable";
import ConfirmationModal from "@/app/shared/ConfirmationModal";
// import ActionDropdown from "../shared/ActionDropdown";
import Image from "next/image";

const ManagementTable = ({
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
      label: "Lead name",
      type: "link",
      linkUrlKey: "leadName_url",
    },
    { key: "contact", label: "Email", type: "text" },
    { key: "signUp", label: "Signup date", type: "text" },
    { key: "plan", label: "Plan", type: "text" },
    { key: "revenue", label: "Revenue", type: "text" },
    { key: "status", label: "Status", type: "status" },
  ];

  const peopleData = [
    {
      leadName: "Floyd Miles",
      leadName_url: "/admin/user-management/floyd-miles",
      contact: "floyd.miles@gmail.com",
      signUp: "Aug 12, 2025",
      plan : "Pro",
      revenue: "$45",
      company_image: "https://logo.clearbit.com/google.com",
      address: "Silicon Valley, California",
      status: "Active",
    },
    {
      leadName: "Leslie Alexander",
      leadName_url: "/admin/user-management/floyd-miles",

      contact: "leslie.alexander@outlook.com",
      signUp: "Aug 12, 2025",
      plan : "Pro",
      revenue: "$45",
      company_image: "https://logo.clearbit.com/microsoft.com",
      address: "Seattle, Washington",
      status: "Inactive",
    },
    {
      leadName: "Courtney Henry",
      leadName_url: "/admin/user-management/floyd-miles",

      contact: "courtney.henry@yahoo.com",
      signUp: "Aug 12, 2025",
      plan : "Pro",
      revenue: "$45",
      company_image: "https://logo.clearbit.com/meta.com",

      address: "Menlo Park, California",
      status: "Inactive",
    },
    {
      leadName: "Wade Warren",
      leadName_url: "/admin/user-management/floyd-miles",

      contact: "wade.warren@gmail.com",
      signUp: "Aug 12, 2025",
      plan : "Pro",
      revenue: "$45",
      company_image: "https://logo.clearbit.com/figma.com",

      address: "San Francisco, California",
      status: "Active",
    },
    {
      leadName: "Jenny Wilson",

      contact: "jenny.wilson@icloud.com",
      signUp: "Aug 12, 2025",
      plan : "Pro",
      revenue: "$45",
      company_image: "https://logo.clearbit.com/netflix.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "Los Gatos, California",
      status: "Inactive",
    },
    {
      leadName: "Albert Flores",

      contact: "albert.flores@gmail.com",
      signUp: "Aug 12, 2025",
      plan : "Pro",
      revenue: "$45",
      company_image: "https://logo.clearbit.com/amazon.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "Seattle, Washington",
      status: "Active",
    },
    {
      leadName: "Cameron Williamson",

      contact: "cameron.williamson@protonmail.com",
      signUp: "Aug 12, 2025",
     plan : "Pro",
     revenue: "$45",
      company_image: "https://logo.clearbit.com/vercel.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "Lahore, Pakistan",
      status: "Inactive",
    },
    {
      leadName: "Brooklyn Simmons",

      contact: "brooklyn.simmons@gmail.com",
      signUp: "Aug 12, 2025",
      plan : "Pro",
      revenue: "$45",
      company_image: "https://logo.clearbit.com/salesforce.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "New York, USA",
      status: "Inactive",
    },
    {
      leadName: "Theresa Webb",

      contact: "theresa.webb@gmail.com",
      signUp: "Aug 12, 2025",
      plan : "Pro",
      revenue: "$45",
      company_image: "https://logo.clearbit.com/trello.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "Austin, Texas",
      status: "Active",
    },
    {
      leadName: "Esther Howard",

      contact: "esther.howard@live.com",
      signUp: "Aug 12, 2025",
      plan : "Pro",
      revenue: "$45",
      company_image: "https://logo.clearbit.com/spotify.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "Stockholm, Sweden",
      status: "Inactive",
    },
    {
      leadName: "Guy Hawkins",

      contact: "guy.hawkins@gmail.com",
      signUp: "Aug 12, 2025",
      plan : "Pro",
      revenue: "$45",
      company_image: "https://logo.clearbit.com/apple.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "Cupertino, California",
      status: "Active",
    },
    {
      leadName: "Dianne Russell",

      contact: "dianne.russell@gmail.com",
      signUp: "Aug 12, 2025",
      plan : "Pro",
      revenue: "$45",
      company_image: "https://logo.clearbit.com/zoom.us",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "San Jose, California",
      status: "Inactive",
    },
    {
      leadName: "Eleanor Pena",

      contact: "eleanor.pena@outlook.com",
      signUp: "Aug 12, 2025",
      plan : "Pro",
      revenue: "$45",
      company_image: "https://logo.clearbit.com/slack.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "New York, USA",
      status: "Active",
    },
    {
      leadName: "Marvin McKinney",

      contact: "marvin.mckinney@gmail.com",
      signUp: "Aug 12, 2025",
      plan : "Pro",
      revenue: "$45",
      company_image: "https://logo.clearbit.com/atlassian.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "Sydney, Australia",
      status: "Inactive",
    },
    {
      leadName: "Annette Black",

      contact: "annette.black@gmail.com",
      signUp: "Aug 12, 2025",
      plan : "Pro",
      revenue: "$45",
      company_image: "https://logo.clearbit.com/dribbble.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "Toronto, Canada",
      status: "Inactive",
    },
    {
      leadName: "Ralph Edwards",

      contact: "ralph.edwards@gmail.com",
      signUp: "Aug 12, 2025",
      plan : "Pro",
     revenue: "$45",
      company_image: "https://logo.clearbit.com/canva.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "Sydney, Australia",
      status: "Active",
    },
    {
      leadName: "Jacob Jones",

      contact: "jacob.jones@gmail.com",
      signUp: "Aug 12, 2025",
      plan : "Pro",
      revenue: "$45",
      company_image: "https://logo.clearbit.com/dropbox.com",
      leadName_url: "/admin/user-management/floyd-miles",

      address: "San Francisco, California",
      status: "Inactive",
    },
    {
      leadName: "Kathryn Murphy",
      leadName_url: "/admin/user-management/floyd-miles",

      contact: "kathryn.murphy@icloud.com",
      signUp: "Aug 12, 2025",
     plan : "Pro",
      revenue: "$45",
      company_image: "https://logo.clearbit.com/indeed.com",

      address: "Austin, Texas",
      status: "Inactive",
    },
    {
      leadName: "Jerome Bell",
      leadName_url: "/admin/user-management/floyd-miles",

      contact: "jerome.bell@gmail.com",
      signUp: "Aug 12, 2025",
      plan : "Pro",
      revenue: "$45",
      company_image: "https://logo.clearbit.com/github.com",

      address: "San Francisco, California",
      status: "Active",
    },
    {
      leadName: "Devon Lane",

      contact: "devon.lane@gmail.com",
      signUp: "Aug 12, 2025",
      plan : "Pro",
      revenue: "$45",
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
        "Economy",
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
      return "Are you sure you want to delete this user? This action will permanently remove all related data.";
    }
    return `Are you sure you want to delete ${count} users? This action will permanently remove all related data.`;
  };

  return (
    <>
      <div>
        <SharedTable
          columns={columns}
          data={peopleData}
          title={<div className="flex gap-1.5 items-center">
            <h4 className="heading-4 font-medium text-[#111827]">Users</h4>
            <span className="heading-7 font-medium text-[#70747D]">1.2k</span>
            </div>}
          filters={filters}
          searchable={false}
          filterable={true}
          selectable={true}
          onSelect={handleSelect}
          bottomActions={[
           
            {
              label: "Delete Users",
              onClick: handleDeleteManagement,
            },
          ]}
          showSelectionCount={true}
          actionsType="inline"
          actions={(row) => (
            <div className="flex">
              
              <button
                className="cursor-pointer bg-[#FFFFFF] border border-[#F6F6F6] custom-shadow sm:p-2 rounded-lg"
                onClick={() => handleDeleteManagement([row])}
              >
                <Image
                  src="/images/delete.svg"
                  alt="Edit"
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

export default ManagementTable;
