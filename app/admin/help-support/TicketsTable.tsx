import { useState } from "react";
import SharedTable, { Column } from "@/app/shared/SharedTable";
import ConfirmationModal from "@/app/shared/ConfirmationModal";
// import ActionDropdown from "../shared/ActionDropdown";
import TicketDrawer from "./TicketDrawer";
import Image from "next/image";

const TicketsTable = ({
  setIsDrawerOpen,
}: {
  setIsDrawerOpen: (value: boolean) => void;
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedManagementToDelete, setSelectedManagementToDelete] = useState<
    any[]
  >([]);
type TicketRow = {
  ticket_id: string;
  user_name: string;
  issue_type: string;
  subject: string;
  created: string;
  last_updated: string;
  status: string;
};
const [selectedTicket, setSelectedTicket] = useState<TicketRow | null>(null);

  // Define columns with explicit Column[] type
  const columns: Column[] = [
    {
      key: "ticket_id",
      label: "Ticket id",
      type: "text",
      // linkUrlKey: "ticket_id",
    },
    { key: "user_name", label: "User name", type: "text" },
    { key: "issue_type", label: "Issue type", type: "text" },
    { key: "subject", label: "Subject", type: "text" },
    { key: "created", label: "Created", type: "text" },
    { key: "last_updated", label: "Last updated", type: "text" },
    { key: "status", label: "Status", type: "status" },
  ];

  const peopleData = [
    {
      ticket_id: "#3456",

      user_name: "Sarah Kim",
      issue_type: "Aug 12, 2025",
      subject: "Unable to access...",
      created: "Nov 22, 2025",
      last_updated: "Nov 22, 2025",
      status: "Resolved",
    },
    {
      ticket_id: "#3456",

      user_name: "Sarah Kim",
      issue_type: "Aug 12, 2025",
      subject: "Unable to access...",
      created: "Nov 22, 2025",
      last_updated: "Nov 22, 2025",
      status: "Pending",
    },
    {
      ticket_id: "#3456",

      user_name: "Sarah Kim",
      issue_type: "Aug 12, 2025",
      subject: "Unable to access...",
      created: "Nov 22, 2025",

      last_updated: "Nov 22, 2025",
      status: "Pending",
    },
    {
      ticket_id: "#3456",

      user_name: "Sarah Kim",
      issue_type: "Aug 12, 2025",
      subject: "Unable to access...",
      created: "Nov 22, 2025",

      last_updated: "Nov 22, 2025",
      status: "Open",
    },
    {
      ticket_id: "#3456",

      user_name: "Sarah Kim",
      issue_type: "Aug 12, 2025",
      subject: "Unable to access...",
      created: "Nov 22, 2025",

      last_updated: "Nov 22, 2025",
      status: "Pending",
    },
    {
      ticket_id: "#3456",

      user_name: "Sarah Kim",
      issue_type: "Aug 12, 2025",
      subject: "Unable to access...",
      created: "Nov 22, 2025",

      last_updated: "Nov 22, 2025",
      status: "Resolved",
    },
    {
      ticket_id: "#3456",

      user_name: "Sarah Kim",
      issue_type: "Aug 12, 2025",
      subject: "Unable to access...",
      created: "Nov 22, 2025",

      last_updated: "Nov 22, 2025",
      status: "Pending",
    },
    {
      ticket_id: "#3456",

      user_name: "Sarah Kim",
      issue_type: "Aug 12, 2025",
      subject: "Unable to access...",
      created: "Nov 22, 2025",

      last_updated: "Nov 22, 2025",
      status: "Pending",
    },
    {
      ticket_id: "#3456",

      user_name: "Sarah Kim",
      issue_type: "Aug 12, 2025",
      subject: "Unable to access...",
      created: "Nov 22, 2025",

      last_updated: "Nov 22, 2025",
      status: "Open",
    },
    {
      ticket_id: "#3456",

      user_name: "Sarah Kim",
      issue_type: "Aug 12, 2025",
      subject: "Unable to access...",
      created: "Nov 22, 2025",

      last_updated: "Nov 22, 2025",
      status: "Pending",
    },
    {
      ticket_id: "#3456",

      user_name: "Sarah Kim",
      issue_type: "Aug 12, 2025",
      subject: "Unable to access...",
      created: "Nov 22, 2025",

      last_updated: "Nov 22, 2025",
      status: "Resolved",
    },
    {
      ticket_id: "#3456",

      user_name: "Sarah Kim",
      issue_type: "Aug 12, 2025",
      subject: "Unable to access...",
      created: "Nov 22, 2025",

      last_updated: "Nov 22, 2025",
      status: "In progress",
    },
    {
      ticket_id: "#3456",

      user_name: "Sarah Kim",
      issue_type: "Aug 12, 2025",
      subject: "Unable to access...",
      created: "Nov 22, 2025",

      last_updated: "Nov 22, 2025",
      status: "Resolved",
    },
    {
      ticket_id: "#3456",

      user_name: "Sarah Kim",
      issue_type: "Aug 12, 2025",
      subject: "Unable to access...",
      created: "Nov 22, 2025",

      last_updated: "Nov 22, 2025",
      status: "In progress",
    },
    {
      ticket_id: "#3456",

      user_name: "Sarah Kim",
      issue_type: "Aug 12, 2025",
      subject: "Unable to access...",
      created: "Nov 22, 2025",

      last_updated: "Nov 22, 2025",
      status: "Pending",
    },
    {
      ticket_id: "#3456",

      user_name: "Sarah Kim",
      issue_type: "Aug 12, 2025",
      subject: "Unable to access...",
      created: "Nov 22, 2025",

      last_updated: "Nov 22, 2025",
      status: "Resolved",
    },
    {
      ticket_id: "#3456",

      user_name: "Sarah Kim",
      issue_type: "Aug 12, 2025",
      subject: "Unable to access...",
      created: "Nov 22, 2025",

      last_updated: "Nov 22, 2025",
      status: "Pending",
    },
    {
      ticket_id: "#3456",

      user_name: "Sarah Kim",
      issue_type: "Aug 12, 2025",
      subject: "Unable to access...",
      created: "Nov 22, 2025",

      last_updated: "Nov 22, 2025",
      status: "Pending",
    },
    {
      ticket_id: "#3456",

      user_name: "Sarah Kim",
      issue_type: "Aug 12, 2025",
      subject: "Unable to access...",
      created: "Nov 22, 2025",

      last_updated: "Nov 22, 2025",
      status: "Resolved",
    },
    {
      ticket_id: "#3456",

      user_name: "Sarah Kim",
      issue_type: "Aug 12, 2025",
      subject: "Unable to access...",
      created: "Nov 22, 2025",
      last_updated: "Nov 22, 2025",
      status: "Pending",
    },
  ];

  // Define filters
  const filters = [
    {
      key: "subject",
      label: "subject",
      options: ["All", "Unable to access...", "Economy", "Basic"],
    },
    {
      key: "billing-cycle",
      label: "Billing cycle",
      options: ["All", "Unable to access...", "Economy", "Basic"],
    },
    {
      key: "status",
      label: "Status",
      options: ["Pending", "Resolved", ""],
    },
    {
      key: "date",
      label: "Date",
      options: ["Aug 12, 2025", "Aug 24, 2025"],
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
  const [isDrawerOpen, setDrawerOpen] = useState(false);

const handleViewTicket = (row: Record<string, unknown>) => {
  setSelectedTicket(row as TicketRow);
  setDrawerOpen(true);
};


  return (
    <>
      <div>
        <SharedTable
          columns={columns}
          data={peopleData}
          title={
            <div className="flex gap-1.5 items-center">
              <h4 className="heading-4 font-medium text-[#111827]">
                All tickets
              </h4>
            </div>
          }
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
                className="cursor-pointer bg-white  custom-shadow sm:p-2 rounded-lg"
                onClick={() => handleViewTicket(row)} // ← CHANGE THIS
              >
                <Image
                  src="/images/view.svg"
                  width={16}
                  height={16}
                  alt="view"
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

      <TicketDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        ticket={selectedTicket}
      />
    </>
  );
};

export default TicketsTable;
