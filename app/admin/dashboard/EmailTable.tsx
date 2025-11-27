import { useState } from "react";
import SharedTable, { Column } from "@/app/shared/SharedTable";
import ConfirmationModal from "@/app/shared/ConfirmationModal";
import Image from "next/image";

const UserTable = ({
  setIsDrawerOpen,
}: {
  setIsDrawerOpen: (value: boolean) => void;
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmilToDelete, setSelectedEmilToDelete] = useState<any[]>([]);
  const [emailData, setEmailData] = useState([
    {
      id: 1, // Added unique IDs for proper deletion
      user_name: "Sarah Khan",
      email: "sarah@gmail.com",
      signup_date: "Aug 12, 2025",
      plan: "Pro",
      amount: "$45",
     
      date_sent: "June 12, 2025",
      status: "Active",
    },
    {
      id: 2,
      user_name: "Sarah Khan",
      email: "sarah@gmail.com",
      signup_date: "Aug 12, 2025",
      plan: " Pro",
      amount: "$45",
      date_sent: "June 12, 2025",
      status: "Active",
    },
    {
      id: 3,
      user_name: "Sarah Khan",
      email: "sarah@gmail.com",
      signup_date: "Aug 12, 2025",
      plan: "Pro",
      amount: "$45",
     
      date_sent: "June 12, 2025",
      status: "Inactive",
    },
    {
      id: 4,
      user_name: "Sarah Khan",
      email: "sarah@gmail.com",
      signup_date: "Aug 12, 2025",
      plan: "Pro ",
      amount: "$45",
      date_sent: "June 12, 2025",
      status: "Active",
    },
    {
      id: 5,
      user_name: "Sarah Khan",
      email: "sarah@gmail.com",
      signup_date: "Aug 12, 2025",
      plan: "Pro",
      amount: "$45",
     
      date_sent: "June 12, 2025",
      status: "Active",
    },
  ]);

  const [tableKey, setTableKey] = useState(0); // Add this key state

  // Define columns with explicit Column[] type
  const columns: Column[] = [
    {
      key: "user_name",
      label: "User name",
      type: "text",
    },
    { key: "email", label: "Email", type: "text" },
    { key: "signup_date", label: "Signup date", type: "text" },
    { key: "plan", label: "Plan", type: "text" },
    {
      key: "amount",
      label: "Amount",
      type: "text",
    },
    { key: "status", label: "Status", type: "status" },
  ];

  // Define filters
  const filters = [
     {
      key: "plan",
      label: "Plan",
      options: ["Pro", "Pro"],
    },
    {
      key: "status",
      label: "Status",
      options: ["All", "Active", "Inactive"],
    },
   
    {
      key: "Date",
      label: "date ",
      options: ["All", "Aug 12, 2025", "Aug 12, 2025"],
    },
  ];

  // Handle selection
  const handleSelect = (selectedRows: any[]) => {
    console.log("Selected rows:", selectedRows);
  };

  // Handle add to campaign
  const handleAddToCampaign = (selectedRows: any[]) => {
    console.log("Add to campaign:", selectedRows);
    setIsDrawerOpen(true);
  };

  // Handle delete leads - open modal
  const handleDeleteEmail = (selectedRows: any[]) => {
    setSelectedEmilToDelete(selectedRows);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteEmail = () => {
    console.log("Deleting email:", selectedEmilToDelete);

    // ACTUAL DELETE LOGIC - Remove selected rows from state
    if (selectedEmilToDelete.length > 0) {
      // Get IDs of rows to delete
      const idsToDelete = selectedEmilToDelete.map((row) => row.id);

      // Filter out the deleted rows
      const updatedData = emailData.filter(
        (row) => !idsToDelete.includes(row.id)
      );

      // Update state with filtered data
      setEmailData(updatedData);
    }

    // Reset selection and close modal
    setSelectedEmilToDelete([]);
    setIsDeleteModalOpen(false);

    // Force table to re-render and clear selections
    setTableKey((prev) => prev + 1);
  };

  // Helper function to convert data to CSV
  // const convertToCSV = (data: any[]) => {
  //   const headers = columns.map((col) => col.label).join(",");
  //   const rows = data.map((row) =>
  //     columns.map((col) => row[col.key]).join(",")
  //   );
  //   return [headers, ...rows].join("\n");
  // };

  // Helper function to download CSV
  // const downloadCSV = (csv: string, filename: string) => {
  //   const blob = new Blob([csv], { type: "text/csv" });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = filename;
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  // };

  const getDeleteMessage = () => {
    const count = selectedEmilToDelete.length;
    if (count === 1) {
      return "Are you sure you want to delete this signup? This action will permanently remove all related data.";
    }
    return `Are you sure you want to delete ${count} signups? This action will permanently remove all related data.`;
  };

  return (
    <>
      <div>
        <SharedTable
          columns={columns}
          key={tableKey} // Add this key to force re-render
          data={emailData}
          title={<div>Recent signups </div>}
          filters={filters}
          searchable={false}
          filterable={true}
          selectable={true}
          hidePagination={true}
          onSelect={handleSelect}
          bottomActions={[
            // {
            //   label: "Add to campaign",
            //   onClick: handleAddToCampaign,
            // },
            {
              label: "Delete signup",
              onClick: handleDeleteEmail,
            },
          ]}
          showSelectionCount={true}
          actionsType="inline"
          actions={(row) => (
            <div className="flex gap-2">
              <button
                  className="cursor-pointer p-2 bg-[#FFFFFF] custom-shadow rounded-lg"
                onClick={() => handleAddToCampaign([row])}
              >
                <Image
                  src="/images/edit.svg"
                  alt="Edit"
                  width={16}
                  height={16}
                />
              </button>
              <button
                className="cursor-pointer p-2 bg-[#FFFFFF] custom-shadow rounded-lg"
                onClick={() => handleDeleteEmail([row])}
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
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedEmilToDelete([]); // Reset selection on cancel
        }}
        onConfirm={confirmDeleteEmail}
        title={
          selectedEmilToDelete.length === 1
            ? "Delete this signup?"
            : `Delete ${selectedEmilToDelete.length} signup?`
        }
        message={getDeleteMessage()}
        icon="/images/bin.svg"
        confirmText="Delete signup"
        cancelText="Go back"
        type="danger"
      />
    </>
  );
};

export default UserTable;
