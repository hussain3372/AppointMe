import { useState } from "react";
import SharedTable, { Column } from "../shared/SharedTable";
import ConfirmationModal from "../shared/ConfirmationModal";
// import ActionDropdown from "../shared/ActionDropdown";
import Image from "next/image";

const EmailTable = ({
  setIsDrawerOpen,
}: {
  setIsDrawerOpen: (value: boolean) => void;
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmailToDelete, setSelectedEmailToDelete] = useState<any[]>([]);

  // Define columns with explicit Column[] type
  const columns: Column[] = [
    {
      key: "subject",
      label: "Email subject",
      type: "link",
      linkUrlKey: "subject_url",
    },
    { key: "leads", label: "Leads", type: "text" },
    { key: "campaign", label: "Campaign", type: "text" },
    { key: "company", label: "Company", type: "text" },
    // { key: "company", label: "Company", type: "text" },
    { key: "openrate", label: "Open Rate", type: "image", imagePosition: "right", },
        { key: "dateSent", label: "Date sent", type: "text" },

    { key: "status", label: "Status", type: "status" },
  ];

  const peopleData = [
    {
      subject: "Monthly newsletter",
      subject_url: "/emails/news-letter",
      leads : "200",
      campaign : "Product launch",
      company: "Google",
      openrate: "56%",
dateSent:"June 12, 2025",

      openrate_image : "/images/graph-red.png",
      status: "Opened",
    },
    {
      subject: "Monthly newsletter",
      subject_url: "/emails/news-letter",

      leads : "200",
      campaign : "Product launch",
      role: "Marketing Manager",
      company: "Microsoft",
      openrate: "56%",
dateSent:"June 12, 2025",
      openrate_image : "/images/graph-green.png",
      status: "Failed",
    },
    {
      subject: "Monthly newsletter",
      subject_url: "/emails/news-letter",

      leads : "200",
      campaign : "Product launch",
      role: "Product Manager",
      company: "Meta",

      openrate: "56%",
dateSent:"June 12, 2025",
      openrate_image : "/images/graph-red.png",
      status: "Sent",
    },
    {
      subject: "Monthly newsletter",
      subject_url: "/emails/news-letter",

      leads : "200",
      campaign : "-",
      role: "UI/UX Designer",
      company: "Figma",

     openrate: "100%",
dateSent:"June 15, 2025",
      openrate_image : "/images/graph-red.png",
      status: "Sent",
    },
    {
      subject: "Monthly newsletter",

      leads : "200",
      campaign : "Product launch",
      role: "HR Manager",
      company: "Netflix",
      subject_url: "/emails/news-letter",

      openrate: "56%",
dateSent:"June 12, 2025",
      openrate_image : "/images/graph-green.png",
      status: "Opened",
    },
    {
      subject: "Monthly newsletter",

      leads : "200",
      campaign : "Product launch",
      role: "Software Engineer",
      company: "Amazon",
      company_image: "https://logo.clearbit.com/amazon.com",
      subject_url: "/emails/news-letter",

      openrate: "56%",
dateSent:"June 12, 2025",
      openrate_image : "/images/graph-red.png",
      status: "Failed",
    },
    {
      subject: "Monthly newsletter",

      leads : "200",
      campaign : "Product launch",
      role: "Frontend Developer",
      company: "Vordx Technologies",
      company_image: "https://logo.clearbit.com/vercel.com",
      subject_url: "/emails/news-letter",

      openrate: "56%",
dateSent:"June 12, 2025",
      openrate_image : "/images/graph-green.png",
      status: "Sent",
    },
    {
      subject: "Monthly newsletter",

      campaign : "Product launch",
      role: "Sales Executive",
      company: "Salesforce",
      subject_url: "/emails/news-letter",

      openrate: "60%",
dateSent:"June 25, 2025",
      openrate_image : "/images/graph-red.png",
      status: "Sent",
    },
    {
      subject: "Monthly newsletter",

      leads : "200",
      campaign : "Product launch",
      role: "Project Manager",
      company: "Trello",
      subject_url: "/emails/news-letter",

     openrate: "56%",
dateSent:"June 12, 2025",
      openrate_image : "/images/graph-green.png",
      status: "Failed",
    },
    {
      subject: "Monthly newsletter",

      leads : "200",
      campaign : "Product launch",
      role: "Data Analyst",
      company: "Spotify",
      subject_url: "/emails/news-letter",

      openrate: "56%",
dateSent:"June 12, 2025",
      openrate_image : "/images/graph-red.png",
      status: "Sent",
    },
    {
      subject: "Monthly newsletter",

      leads : "200",
      campaign : "Product launch",
      role: "CTO",
      company: "Apple",
      subject_url: "/emails/news-letter",

      openrate: "56%",
dateSent:"June 12, 2025",
      openrate_image : "/images/graph-green.png",
      status: "Opened",
    },
    {
      subject: "Monthly newsletter",

      leads : "200",
      campaign : "Product launch",
      role: "HR Lead",
      company: "Zoom",
      company_image: "https://logo.clearbit.com/zoom.us",
      subject_url: "/emails/news-letter",

      openrate: "56%",
dateSent:"June 12, 2025",
      openrate_image : "/images/graph-red.png",
      status: "Failed",
    },
    {
      subject: "Monthly newsletter",

      leads : "200",
      campaign : "Product launch",
      role: "Account Executive",
      company: "Slack",
      company_image: "https://logo.clearbit.com/slack.com",
      subject_url: "/emails/news-letter",

      openrate: "56%",
dateSent:"June 12, 2025",
      openrate_image : "/images/graph-green.png",
      status: "Failed",
    },
    {
      subject: "Monthly newsletter",

      leads : "200",
      campaign : "Product launch",
      role: "Software Engineer",
      company: "Atlassian",
      company_image: "https://logo.clearbit.com/atlassian.com",
      subject_url: "/emails/news-letter",

      openrate: "56%",
dateSent:"June 12, 2025",
      openrate_image : "/images/graph-red.png",
      status: "Sent",
    },
    {
      subject: "Monthly newsletter",

      leads : "200",
      campaign : "Product launch",
      role: "Product Designer",
      company: "Dribbble",
      company_image: "https://logo.clearbit.com/dribbble.com",
      subject_url: "/emails/news-letter",

      openrate: "56%",
dateSent:"June 12, 2025",
      openrate_image : "/images/graph-green.png",
      status: "Failed",
    },
    {
      subject: "Monthly newsletter",

      leads : "200",
      campaign : "Product launch",
      role: "Marketing Head",
      company: "Canva",
      company_image: "https://logo.clearbit.com/canva.com",
      subject_url: "/emails/news-letter",

      openrate: "56%",
dateSent:"June 12, 2025",
      openrate_image : "/images/graph-green.png",
      status: "Failed",
    },
    {
      subject: "Monthly newsletter",

      leads : "200",
      campaign : "Product launch",
      role: "Backend Engineer",
      company: "Dropbox",
      company_image: "https://logo.clearbit.com/dropbox.com",
      subject_url: "/emails/news-letter",

      openrate: "56%",
dateSent:"June 12, 2025",
      openrate_image : "/images/graph-red.png",
      status: "Sent",
    },
    {
      subject: "Monthly newsletter",
      subject_url: "/emails/news-letter",

      leads : "200",
      campaign : "Product launch",
      role: "Talent Acquisition Lead",
      company: "Indeed",
      company_image: "https://logo.clearbit.com/indeed.com",

      openrate: "56%",
dateSent:"June 12, 2025",
      openrate_image : "/images/graph-green.png",
      status: "Failed",
    },
    {
      subject: "Monthly newsletter",
      subject_url: "/emails/news-letter",

      leads : "200",
      campaign : "Product launch",
      role: "DevOps Engineer",
      company: "GitHub",
      company_image: "https://logo.clearbit.com/github.com",

      openrate: "56%",
dateSent:"June 12, 2025",
      openrate_image : "/images/graph-green.png",
      status: "Opened",
    },
    {
      subject: "Monthly newsletter",

      leads : "200",
      campaign : "Product launch",
      role: "Data Scientist",
      company: "OpenAI",
      company_image: "https://logo.clearbit.com/openai.com",
      subject_url: "/emails/news-letter",

      openrate: "56%",
dateSent:"June 12, 2025",
      openrate_image : "/images/graph-red.png",
      status: "Failed",
    },
  ];

  // Define filters with proper structure
  const filters = [
  {
    key: "status",
    label: "Status",
    options: [
      "Sent",
      "Opened", 
      "Failed",
    ],
  },
  {
    key: "company", 
    label: "Company Name",
    options: [
      "Google",
      "Microsoft",
      "Amazon", 
      "Meta",
      "Netflix",
      "Apple",
      "Spotify",
    ],
  },
  {
    key: "dateRange",
    label: "Date Range", 
    options: [
      "June 12, 2025 - June 18, 2025",
      "June 19, 2025 - June 25, 2025", 
      "June 26, 2025 - July 01, 2025",
      "June 02, 2025 - June 10, 2025"
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

  // Handle delete Email - open modal
  const handleDeleteEmail = (selectedRows: any[]) => {
    setSelectedEmailToDelete(selectedRows);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const confirmDeleteEmail = () => {
    console.log("Deleting Email:", selectedEmailToDelete);
    // Your actual delete logic here
    // For example: API call to delete Email
    // deleteEmailAPI(selectedEmailToDelete.map(lead => lead.id));

    // Reset selection
    setSelectedEmailToDelete([]);
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
    const count = selectedEmailToDelete.length;
    if (count === 1) {
      return "Are you sure you want to delete this lead? This action will permanently remove all related data.";
    }
    return `Are you sure you want to delete ${count} Email? This action will permanently remove all related data.`;
  };

  return (
    <>
      <div>
        <SharedTable
          columns={columns}
          data={peopleData}
          title={<div>Emails sent</div>}
          filters={filters}
          searchable={false}
          filterable={true}
          selectable={true}
          onSelect={handleSelect}
          bottomActions={[
            {
              label: "Add to campaign",
              onClick: handleAddToCampaign,
            },
            {
              label: "Delete Email",
              onClick: handleDeleteEmail,
            },
          ]}
          showSelectionCount={true}
          actionsType="inline"
          actions={(row) => (
            <div className="flex">
              <button
                className="cursor-pointer bg-[#FFFFFF] border border-[#F6F6F6] custom-shadow p-2 rounded-lg"
                onClick={() => handleAddToCampaign()}
              >
                <Image
                  src="/images/mail-recycle.svg"
                  alt="Edit"
                  width={16}
                  height={16}
                />
              </button>
              
              <button
                className="cursor-pointer bg-[#FFFFFF] border border-[#F6F6F6] custom-shadow p-2 rounded-lg"
                onClick={() => handleDeleteEmail([row])}
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
        onConfirm={confirmDeleteEmail}
        title={
          selectedEmailToDelete.length === 1
            ? "Delete this lead?"
            : `Delete ${selectedEmailToDelete.length} Email?`
        }
        message={getDeleteMessage()}
        icon="/images/bin.svg"
        confirmText="Delete lead"
        cancelText="Go back"
      />
    </>
  );
};

export default EmailTable;