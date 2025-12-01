"use client";

import EmailTable from "./EmailTable";

const EmailManagement = () => {
  const stats = [
    {
      id: 1,
      value: "20",
      title: "Total campaigns",
      img: "/images/card1.svg",
    },
    {
      id: 2,
      value: "12",
      title: "Active campaigns",
      img: "/images/card1.svg",
    },
    {
      id: 3,
      value: "4,998",
      title: "Leads reached",
      img: "/images/card3.svg",
    },
    {
      id: 4,
      value: "76%",
      title: "Reply rate",
      img: "/images/card4.svg",
    },
    {
      id: 1,
      value: "60%",
      title: "Conversion rate",
      img: "/images/card4.svg",
    },
  ];

  return (
    <div className="relative space-y-5">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="space-y-2">
          <h1 className="heading-2 font-medium text-[#111827]">Email management</h1>
          <p className="heading-5 text-[#70747D]">
            Keep your users organized and your platform running smoothly.
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div>
        <EmailTable />
      </div>
    </div>
  );
};

export default EmailManagement;
