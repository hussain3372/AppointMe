"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import React from "react";
import Input from "@/app/ui/Input";
import Checkbox from "@/app/ui/Checkbox";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: any | null;
}

const TicketDrawer: React.FC<DrawerProps> = ({ isOpen, onClose, ticket }) => {
  const [selectedStatus, setSelectedStatus] = React.useState<string[]>([]);

  if (!ticket) return null;

  const toggleStatus = (status: string) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 w-full sm:w-[560px] h-full bg-white z-50 rounded-l-[20px] flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            {/* Main content area that will scroll */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Header */}
              <h2 className="heading-4 font-semibold mb-1">
                Ticket #{ticket.id} – {ticket.category}
              </h2>
              <p className="text-[#70747D] mb-6">
                View full ticket details, respond to the user, update status, and
                manage all actions from here.
              </p>

              <div className="pt-5">
                <div className="bg-[#F6F6F6] p-2 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    {/* Left Section */}
                    <div className="flex gap-3 pb-3 sm:pb-0 w-full">
                      <Image
                        src="/images/profile.svg"
                        alt="person"
                        height={40}
                        width={40}
                      />

                      <div className="flex flex-col w-full">
                        {/* NAME + DATE align left & far right */}
                        <div className="flex justify-between items-center w-full">
                          <h6 className="heading-6 font-medium text-[#111827]">
                            Willem
                          </h6>

                          <p className="body-5 font-regular text-[#A0A3A9]">
                            Created: Aug 12, 2025
                          </p>
                        </div>

                        {/* email below */}
                        <p className="heading-7 font-regular text-[#70747D] mt-1">
                          willem@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 space-y-2">
                    <div className="bg-[#FFFFFF] gap-5 border border-[#E2E3E5] rounded-lg p-3 flex flex-col justify-between">
                      <div>
                        <span className="text-[#111827] font-medium heading-5 mb-1">
                          Unable to launch my campaign
                        </span>
                        <p className="text-[#A0A3A9] body-5 font-normal">
                          Hi, I'm trying to launch my campaign but it keeps
                          showing a delivery error. I already verified my domain
                          but it still doesn't send. Please help.
                        </p>
                      </div>
                      <div className="rounded-lg bg-[#FEEFE4] p-3 flex gap-3">
                        <div className="">
                          <Image
                            src="/images/static.svg"
                            alt="person"
                            height={48}
                            width={48}
                          />
                        </div>
                        <div>
                          <span className="font-medium text-[#111827] heading-5 mb-1">
                            Screenshot- 89764
                          </span>
                          <p className="font-normal text-[#70747D] body-5">
                            127kb
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Note */}
              <div className="my-6">
                <label className="font-medium mb-1 block pb-6">Add note</label>
                <Input
                  placeholder="Add short description"
                  className="w-full border rounded-xl p-3 text-sm"
                  title="Note"
                />
              </div>

              {/* Ticket Status */}
              <div className="mb-6">
                <p className="font-medium mb-3">Ticket status</p>
                <div className="grid grid-cols-2 gap-3">
                  {["Open", "In progress", "Resolved", "Pending"].map(
                    (status) => (
                      <div
                        key={status}
                        className="flex items-center justify-between p-3 rounded-xl cursor-pointer bg-[#F6F6F6]"
                      >
                        <p
                          className="heading-6 text-[#414652]"
                          onClick={() => toggleStatus(status)}
                        >
                          {status}
                        </p>

                        <Checkbox
                          checked={selectedStatus.includes(status)}
                          onChecked={() => toggleStatus(status)}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Footer Buttons - Fixed at bottom */}
            <div className="p-6 ">
              <div className="flex flex-col sm:flex-row gap-3">
                <PrimaryBtn
                  fontSize="12px"
                  label="Go back"
                  imageSrc="/images/arrow-left.svg"
                  imagePosition="left"
                  onClick={onClose}
                  variant="soft"
                />
                <PrimaryBtn
                  fontSize="12px"
                  label="Save"
                  imageSrc="/images/arrow-right.svg"
                  imagePosition="right"
                  variant="filled"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TicketDrawer;