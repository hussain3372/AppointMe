"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import React, { useRef } from "react";
import Input from "@/app/ui/Input";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerRef: React.RefObject<HTMLDivElement | null>; // allow null
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, drawerRef }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null); // ✅ declare ref here
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
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            className="fixed top-0 right-0 w-full h-screen space-y-6 sm:w-[580px] bg-white z-50 rounded-l-lg p-5 overflow-auto hide-scrollbar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {/* Header */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="space-y-1 mb-8">
                  <h2 className="heading-4 font-medium text-[#111827]">
                    Help & support
                  </h2>
                  <p className="text-[#70747D] body-4 font-normal">
                    Find answers, report an issue, or contact our support team.
                  </p>
                </div>

                <div className="space-y-4">
                  <Input
                    title="Issue type"
                    placeholder="Choose issue type"
                    className="w-full"
                    // value={username}
                    // onChange={(e) => setUsername(e.target.value)}
                  />
                  <Input
                    title="Subject"
                    placeholder="Enter subject"
                    className="w-full"
                    // value={username}
                    // onChange={(e) => setUsername(e.target.value)}
                  />
                  <Input
                    title="Description"
                    placeholder="Add brief description..."
                    className="w-full"
                    // value={username}
                    // onChange={(e) => setUsername(e.target.value)}
                  />
                  <div className="w-full">
                    <input
                      type="file"
                      accept="image/png, image/jpeg, application/pdf"
                      className="hidden"
                      ref={fileInputRef} // 👈 we'll use this to trigger click
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        console.log("Selected file:", file);
                        // you can also create a preview if needed
                        // const preview = URL.createObjectURL(file);
                      }}
                    />
                    <div
                      className="h-[132px] w-full rounded-[10px] flex flex-col items-center justify-center border border-dashed border-[#F87B1B] bg-[#FEEFE4] px-3 py-5 space-y-3 cursor-pointer"
                      onClick={() => fileInputRef.current?.click()} // 👈 triggers file upload
                    >
                      <Image
                        src="/images/upload.svg"
                        width={40}
                        height={40}
                        alt="upload"
                      />
                      <div className="space-y-1 text-center">
                        <h1 className="font-medium body-3">
                          Attach screenshot(optional)
                        </h1>
                        <p className="text-[#70747D] body-5">
                          Upload file in png, jpeg, and pdf
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
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
                  label="Report issue"
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

export default Drawer;
