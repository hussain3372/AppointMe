import { useState } from "react";
import SharedTable, { Column } from "./SharedTableException";
import ConfirmationModal from "@/app/shared/ConfirmationModal";
// import ActionDropdown from "../shared/ActionDropdown";
import Image from "next/image";

const ResponsesTable = ({
  setIsDrawerOpen,
}: {
  setIsDrawerOpen: (value: boolean) => void;
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedResponsesToDelete, setSelectedResponsesToDelete] = useState<any[]>([]);

  // Define columns with explicit Column[] type
  const columns: Column[] = [
    {
      key: "leadName",
      label: "Lead name",
      type: "image",
      linkUrlKey: "leadName_url",
    },
    { key: "contact", label: "Contact", type: "text" },
    { key: "role", label: "Role", type: "text" },
    { key: "lastResponse", label: "Last response", type: "text" },
    { key: "lastActivity", label: "Last activity", type: "text" },
    { key: "company", label: "Company", type: "image" },
    { key: "status", label: "Status", type: "status" },
  ];

  const peopleData = [
    {
      leadName: "Floyd Miles",
      leadName_image: "https://i.pravatar.cc/150?img=1",
      leadName_url: "/leads/floyd-miles",
      contact: "floyd.miles@gmail.com",
      lastResponse : "Sounds good, let's....",
      role: "CEO",
      company: "Google",
      company_image: "https://logo.clearbit.com/google.com",
      lastActivity: "Aug 20, 2025",
      status: "Opened",
    },
    {
      leadName: "Leslie Alexander",
      leadName_image: "https://i.pravatar.cc/150?img=2",
      leadName_url: "/leads/floyd-miles",

      contact: "leslie.alexander@outlook.com",
      lastResponse : "Sounds good, let's....",
      role: "Marketing Manager",
      company: "Microsoft",
      company_image: "https://logo.clearbit.com/microsoft.com",
       lastActivity: "Aug 20, 2025",
      status: "Engaging",
    },
    {
      leadName: "Courtney Henry",
      leadName_image: "https://i.pravatar.cc/150?img=3",
      leadName_url: "/leads/floyd-miles",

      contact: "courtney.henry@yahoo.com",
      lastResponse : "Sounds good, let's....",
      role: "Product Manager",
      company: "Meta",
      company_image: "https://logo.clearbit.com/meta.com",

       lastActivity: "Aug 20, 2025",
      status: "Engaging",
    },
    {
      leadName: "Wade Warren",
      leadName_image: "https://i.pravatar.cc/150?img=4",
      leadName_url: "/leads/floyd-miles",

      contact: "wade.warren@gmail.com",
      lastResponse : "Sounds good, let's....",
      role: "UI/UX Designer",
      company: "Figma",
      company_image: "https://logo.clearbit.com/figma.com",

       lastActivity: "Aug 20, 2025",
      status: "Opened",
    },
    {
      leadName: "Jenny Wilson",
      leadName_image: "https://i.pravatar.cc/150?img=5",

      contact: "jenny.wilson@icloud.com",
      lastResponse : "Sounds good, let's....",
      role: "HR Manager",
      company: "Netflix",
      company_image: "https://logo.clearbit.com/netflix.com",
      leadName_url: "/leads/floyd-miles",

       lastActivity: "Aug 20, 2025",
      status: "Awaiting",
    },
    {
      leadName: "Albert Flores",
      leadName_image: "https://i.pravatar.cc/150?img=6",

      contact: "albert.flores@gmail.com",
      lastResponse : "Sounds good, let's....",
      role: "Software Engineer",
      company: "Amazon",
      company_image: "https://logo.clearbit.com/amazon.com",
      leadName_url: "/leads/floyd-miles",

       lastActivity: "Aug 20, 2025",
      status: "Opened",
    },
    // {
    //   leadName: "Cameron Williamson",
    //   leadName_image: "https://i.pravatar.cc/150?img=7",

    //   contact: "cameron.williamson@protonmail.com",
    //   lastResponse : "Sounds good, let's....",
    //   role: "Frontend Developer",
    //   company: "Vordx Technologies",
    //   company_image: "https://logo.clearbit.com/vercel.com",
    //   leadName_url: "/leads/floyd-miles",

    //    lastActivity: "Aug 20, 2025",
    //   status: "Engaging",
    // },
    {
      leadName: "Brooklyn Simmons",
      leadName_image: "https://i.pravatar.cc/150?img=8",

      contact: "brooklyn.simmons@gmail.com",
      lastResponse : "Sounds good, let's....",
      role: "Sales Executive",
      company: "Salesforce",
      company_image: "https://logo.clearbit.com/salesforce.com",
      leadName_url: "/leads/floyd-miles",

     lastActivity: "Aug 20, 2025",
      status: "Engaging",
    },
    {
      leadName: "Theresa Webb",
      leadName_image: "https://i.pravatar.cc/150?img=9",

      contact: "theresa.webb@gmail.com",
      lastResponse : "Sounds good, let's....",
      role: "Project Manager",
      company: "Trello",
      company_image: "https://logo.clearbit.com/trello.com",
      leadName_url: "/leads/floyd-miles",

     lastActivity: "Aug 20, 2025",
      status: "Opened",
    },
    {
      leadName: "Esther Howard",
      leadName_image: "https://i.pravatar.cc/150?img=10",

      contact: "esther.howard@live.com",
      lastResponse : "Sounds good, let's....",
      role: "Data Analyst",
      company: "Spotify",
      company_image: "https://logo.clearbit.com/spotify.com",
      leadName_url: "/leads/floyd-miles",

      lastActivity: "Aug 20, 2025",
      status: "Engaging",
    },
    {
      leadName: "Guy Hawkins",
      leadName_image: "https://i.pravatar.cc/150?img=11",

      contact: "guy.hawkins@gmail.com",
      lastResponse : "Sounds good, let's....",
      role: "CTO",
      company: "Apple",
      company_image: "https://logo.clearbit.com/apple.com",
      leadName_url: "/leads/floyd-miles",

      lastActivity: "Aug 20, 2025",
      status: "Opened",
    },
    {
      leadName: "Dianne Russell",
      leadName_image: "https://i.pravatar.cc/150?img=12",

      contact: "dianne.russell@gmail.com",
      lastResponse : "Sounds good, let's....",
      role: "HR Lead",
      company: "Zoom",
      company_image: "https://logo.clearbit.com/zoom.us",
      leadName_url: "/leads/floyd-miles",

       lastActivity: "Aug 20, 2025",
      status: "Awaiting",
    },
    {
      leadName: "Eleanor Pena",
      leadName_image: "https://i.pravatar.cc/150?img=13",

      contact: "eleanor.pena@outlook.com",
      lastResponse : "Sounds good, let's....",
      role: "Account Executive",
      company: "Slack",
      company_image: "https://logo.clearbit.com/slack.com",
      leadName_url: "/leads/floyd-miles",

      lastActivity: "Aug 20, 2025",
      status: "Opened",
    },
    {
      leadName: "Marvin McKinney",
      leadName_image: "https://i.pravatar.cc/150?img=14",

      contact: "marvin.mckinney@gmail.com",
      lastResponse : "Sounds good, let's....",
      role: "Software Engineer",
      company: "Atlassian",
      company_image: "https://logo.clearbit.com/atlassian.com",
      leadName_url: "/leads/floyd-miles",

      lastActivity: "Aug 20, 2025",
      status: "Engaging",
    },
    {
      leadName: "Annette Black",
      leadName_image: "https://i.pravatar.cc/150?img=15",

      contact: "annette.black@gmail.com",
      lastResponse : "Sounds good, let's....",
      role: "Product Designer",
      company: "Dribbble",
      company_image: "https://logo.clearbit.com/dribbble.com",
      leadName_url: "/leads/floyd-miles",

      lastActivity: "Aug 20, 2025",
      status: "Engaging",
    },
    {
      leadName: "Ralph Edwards",
      leadName_image: "https://i.pravatar.cc/150?img=16",

      contact: "ralph.edwards@gmail.com",
      lastResponse : "Sounds good, let's....",
      role: "Marketing Head",
      company: "Canva",
      company_image: "https://logo.clearbit.com/canva.com",
      leadName_url: "/leads/floyd-miles",

       lastActivity: "Aug 20, 2025",
      status: "Opened",
    },
    {
      leadName: "Jacob Jones",
      leadName_image: "https://i.pravatar.cc/150?img=17",

      contact: "jacob.jones@gmail.com",
      lastResponse : "Sounds good, let's....",
      role: "Backend Engineer",
      company: "Dropbox",
      company_image: "https://logo.clearbit.com/dropbox.com",
      leadName_url: "/leads/floyd-miles",

      lastActivity: "Aug 20, 2025",
      status: "Engaging",
    },
    {
      leadName: "Kathryn Murphy",
      leadName_image: "https://i.pravatar.cc/150?img=18",
      leadName_url: "/leads/floyd-miles",

      contact: "kathryn.murphy@icloud.com",
      lastResponse : "Sounds good, let's....",
      role: "Talent Acquisition Lead",
      company: "Indeed",
      company_image: "https://logo.clearbit.com/indeed.com",

      lastActivity: "Aug 20, 2025",
      status: "Engaging",
    },
    {
      leadName: "Jerome Bell",
      leadName_image: "https://i.pravatar.cc/150?img=19",
      leadName_url: "/leads/floyd-miles",

      contact: "jerome.bell@gmail.com",
      lastResponse : "Sounds good, let's....",
      role: "DevOps Engineer",
      company: "GitHub",
      company_image: "https://logo.clearbit.com/github.com",

      lastActivity: "Aug 20, 2025",
      status: "Opened",
    },
    {
      leadName: "Devon Lane",
      leadName_image: "https://i.pravatar.cc/150?img=20",

      contact: "devon.lane@gmail.com",
      lastResponse : "Sounds good, let's....",
      role: "Data Scientist",
      company: "OpenAI",
      company_image: "https://logo.clearbit.com/openai.com",
      leadName_url: "/leads/floyd-miles",

      lastActivity: "Aug 20, 2025",
      status: "Engaging",
    },
  ];

  // Define filters - improved to match actual data
  const filters = [
    {
      key: "company",
      label: "Company Name",
      options: [
        "Google",
        "Microsoft",
        "Meta",
        "Figma",
        "Netflix",
        "Amazon",
        "Vordx Technologies",
        "Salesforce",
        "Trello",
        "Spotify",
        "Apple",
        "Zoom",
        "Slack",
        "Atlassian",
        "Dribbble",
        "Canva",
        "Dropbox",
        "Indeed",
        "GitHub",
        "OpenAI"
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
    {
      key: "role",
      label: "Role",
      options: [
        "CEO",
        "Marketing Manager",
        "Product Manager",
        "UI/UX Designer",
        "HR Manager",
        "Software Engineer",
        "Frontend Developer",
        "Sales Executive",
        "Project Manager",
        "Data Analyst",
        "CTO",
        "HR Lead",
        "Account Executive",
        "Product Designer",
        "Marketing Head",
        "Backend Engineer",
        "Talent Acquisition Lead",
        "DevOps Engineer",
        "Data Scientist"
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
  const handleDeleteResponses = (selectedRows: any[]) => {
    setSelectedResponsesToDelete(selectedRows);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const confirmDeleteResponses = () => {
    console.log("Deleting leads:", selectedResponsesToDelete);
    // Your actual delete logic here
    // For example: API call to delete leads
    // deleteResponsesAPI(selectedResponsesToDelete.map(lead => lead.id));

    // Reset selection
    setSelectedResponsesToDelete([]);
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
    const count = selectedResponsesToDelete.length;
    if (count === 1) {
      return "Are you sure you want to delete this lead? This action will permanently remove all related data.";
    }
    return `Are you sure you want to delete ${count} leads? This action will permanently remove all related data.`;
  };

  return (
    <>
      <div>
        <SharedTable
          columns={columns}
          data={peopleData}
          title={<div>Leads</div>}
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
              label: "Delete leads",
              onClick: handleDeleteResponses,
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
                  src="/images/view.svg"
                  alt="Edit"
                  width={20}
                  height={20}
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
        onConfirm={confirmDeleteResponses}
        title={
          selectedResponsesToDelete.length === 1
            ? "Delete this lead?"
            : `Delete ${selectedResponsesToDelete.length} leads?`
        }
        message={getDeleteMessage()}
        icon="/images/bin.svg"
        confirmText="Delete lead"
        cancelText="Go back"
      />
    </>
  );
};

export default ResponsesTable;