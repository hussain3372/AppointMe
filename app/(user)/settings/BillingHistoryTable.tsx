import { useState } from "react";
import SharedTable, { Column } from "@/app/shared/SharedTable";
import ConfirmationModal from "@/app/shared/ConfirmationModal";

const BillingHistoryTable = () => { // Remove the prop requirement
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmilToDelete, setSelectedEmilToDelete] = useState<any[]>([]);
  const [emailData, setEmailData] = useState([
    {
      id: 1, // Added unique IDs for proper deletion
      plan_name: "Pro",
      leadName_url: "/leads/floyd-miles",
      amount: "$25",
      purchase_date: "Aug 12, 2025",
      end_date: "Sep 12, 2025",
      status: "Active",
    },
    {
      id: 2,
      plan_name: "Pro",
      leadName_url: "/leads/floyd-miles",
      amount: "$25",
      purchase_date: "Aug 12, 2025",
      company: " Apple",
      end_date: "Sep 12, 2025",
      status: "Inactive",
    },
    {
      id: 3,
      plan_name: "Pro",
      leadName_url: "/leads/floyd-miles",
      amount: "$25",
      purchase_date: "Aug 12, 2025",
      end_date: "Sep 12, 2025",
      status: "Expired",
    },
    {
      id: 4,
      plan_name: "Pro",
      leadName_url: "/leads/floyd-miles",
      amount: "$25",
      purchase_date: "Aug 12, 2025",
      end_date: "Sep 12, 2025",
      status: "Active",
    },
    {
      id: 5,
      plan_name: "Pro",
      leadName_url: "/leads/floyd-miles",
      amount: "$25",
      purchase_date: "Aug 12, 2025",
      end_date: "Sep 12, 2025",
      status: "Inactive",
    },
  ]);

  const [tableKey, setTableKey] = useState(0); // Add this key state

  // Define columns with explicit Column[] type
  const columns: Column[] = [
    {
      key: "plan_name",
      label: "Plan name",
      type: "text",
      linkUrlKey: "leadName_url",
    },
    { key: "amount", label: "Amount", type: "text" },
    { key: "purchase_date", label: "Purchase date", type: "text" },

    { key: "end_date", label: "End date", type: "text" },
    { key: "status", label: "Status", type: "status" },
  ];

  // Define filters
  const filters = [
     {
      key: "plan_name",
      label: "Plan Name",
      options: ["Pro", "Basic", "Enterprise"],
    },
    {
      key: "status",
      label: "Status",
      options: ["All", "Active", "Inactive" , "Expired"],
    },
    {
      key: "end_date",
      label: "End date",
      options: ["Sep 12, 2025", "Sep 12, 2025"],
    },
    {
      key: "purchase_date",
      label: "Purchase date",
      options: ["All", "Aug 12, 2025, Aug 12, 2025 "],
    },
  ];

  // Handle selection
  const handleSelect = (selectedRows: any[]) => {
    console.log("Selected rows:", selectedRows);
  };

  // Handle delete leads - open modal
  const handleDeleteEmail = (selectedRows: any[]) => {
    setSelectedEmilToDelete(selectedRows);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteEmail = () => {
    console.log("Deleting email:", selectedEmilToDelete);

    if (selectedEmilToDelete.length > 0) {
      const idsToDelete = selectedEmilToDelete.map((row) => row.id);

      const updatedData = emailData.filter(
        (row) => !idsToDelete.includes(row.id)
      );

      setEmailData(updatedData);
    }

    setSelectedEmilToDelete([]);
    setIsDeleteModalOpen(false);

    setTableKey((prev) => prev + 1);
  };

  const getDeleteMessage = () => {
    const count = selectedEmilToDelete.length;
    if (count === 1) {
      return "Are you sure you want to delete this email? This action will permanently remove all related data.";
    }
    return `Are you sure you want to delete ${count} emails? This action will permanently remove all related data.`;
  };

  return (
    <>
      <div>
        <SharedTable
          columns={columns}
          key={tableKey}
          data={emailData}
          title={<div>Billing history</div>}
          filters={filters}
          searchable={false}
          filterable={true}
          selectable={true}
          hidePagination={true}
          onSelect={handleSelect}
          bottomActions={[
            {
              label: "Delete history",
              onClick: handleDeleteEmail,
            },
          ]}
          showSelectionCount={true}
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
            ? "Delete this history?"
            : `Delete ${selectedEmilToDelete.length} history?`
        }
        message={getDeleteMessage()}
        icon="/images/bin.svg"
        confirmText="Delete history"
        cancelText="Go back"
        type="danger"
      />
    </>
  );
};

export default BillingHistoryTable;