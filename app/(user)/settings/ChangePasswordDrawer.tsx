"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LightBtn from "@/app/ui/buttons/LightButton";
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import Input from "@/app//ui/Input";
import Link from "next/link";
import ConfirmationModal from "@/app/shared/ConfirmationModal";

export default function Drawer({ onClose }: { onClose: () => void }) {
  const [stepCount, setStepCount] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handleNext = () => setStepCount(2);
  const handlePrev = () => setStepCount(1);
  const handleSave = () => {
    // onClose();
    setOpenModal((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Content Area */}
      <div className="flex-1 p-5 overflow-hidden">
        <AnimatePresence mode="wait">
          {stepCount === 1 && (
            <motion.div
              key="step1"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-8 h-full"
            >
              <div className="space-y-1">
                <h4 className="heading-4 font-medium">Change password</h4>
                <p className="heading-6 font-regular text-[#70747D]">
                  Update your account password to keep your profile secure.
                </p>
              </div>

              <div className="space-y-2 flex flex-col items-end">
                <Input
                  title="Current password"
                  placeholder="Enter password"
                  type="password"
                />
                <Link
                  href="/forgot-password"
                  className="heading-7 font-medium text-[#F87B1B] text-end"
                >
                  Forget password
                </Link>
              </div>
            </motion.div>
          )}

          {stepCount === 2 && (
            <motion.div
              key="step2"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-8 h-full"
            >
              <div className="space-y-1">
                <h4 className="heading-4 font-medium">Create new password</h4>
                <p className="heading-6 font-regular text-[#70747D]">
                  Enter your new secure password. Make sure it's strong and
                  unique.
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  title="New password"
                  placeholder="Enter new password"
                  type="password"
                />
                <Input
                  title="Confirm new password"
                  placeholder="Confirm your new password"
                  type="password"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Buttons Fixed at Bottom */}
      <div className="p-5  bg-white">
        <div className="flex flex-col sm:flex-row gap-3 mt-3 pb-3">
          {stepCount === 1 ? (
            <>
              <LightBtn
                label="Go back"
                onClick={onClose}
                imageSrc="/images/arrow-left.svg"
                imagePosition="left"
              />
              <PrimaryBtn
                fontSize="12px"
                label="Next"
                onClick={handleNext}
                imageSrc="/images/arrow-right.svg"
                imagePosition="right"
                // className="flex-1"
              />
            </>
          ) : (
            <>
              <LightBtn
                label="Go back"
                onClick={handlePrev}
                imageSrc="/images/arrow-left.svg"
                // className="flex-1"
              />
              <PrimaryBtn
                fontSize="12px"
                label="Save"
                onClick={handleSave}
                imageSrc="/images/arrow-right.svg"
                imagePosition="right"
                // className="flex-1"
              />
            </>
          )}
        </div>
      </div>
      {openModal && (
        <ConfirmationModal
          isOpen={openModal}
          onClose={handleOpenModal}
          onConfirm={onClose}
          cancelText="Cancel"
          confirmText="OK"
          title="Password changed"
          message="Password changed successfully"
        />
      )}
    </div>
  );
}
