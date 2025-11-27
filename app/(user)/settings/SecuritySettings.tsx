'use client'
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Drawer from "../ai-outreach/email-templates/Drawer";
import ChangePasswordDrawer from "./ChangePasswordDrawer";
import TwoFaDrawer from "./TwoFaDrawer";
import ToggleButton from "@/app/shared/ToggleButton";
import ConfirmationModal from "@/app/shared/ConfirmationModal";
import toast from "react-hot-toast";

const SecuritySettings: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTwoFaOpen, setIsTwoFaOpen] = useState(false);
  const [isTwoFaEnabled, setIsTwoFaEnabled] = useState(false); // Separate state for toggle
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    isEnabling: true
  });

  const handleOpenSuccessModal = (isEnabling: boolean) => {
    setModalConfig({
      title: isEnabling ? "Want to enable 2fa" : "Want to disable 2fa",
      message: isEnabling 
        ? "Are you sure to enable 2fa?"
        : "Are you sure to disable 2fa?",
      isEnabling
    });
    setOpenSuccessModal(true);
  };

  const handleSuccessConfirm = () => {
    setOpenSuccessModal(false);
    // Update the toggle state based on the action
    if (modalConfig.isEnabling) {
      setIsTwoFaEnabled(true);
      toast.success("Two-factor authentication has been enabled.");
    } else {
      setIsTwoFaEnabled(false);
      toast.success("Two-factor authentication has been disabled.");
    }
  };

  const handleToggle = () => {
    if (!isTwoFaEnabled) {
      // Opening modal when enabling 2FA
      handleOpenSuccessModal(true);
    } else {
      // Opening modal when disabling 2FA
      handleOpenSuccessModal(false);
    }
  };

  const openDrawer = () => {
    setIsDrawerOpen(prev => !prev);
  };

  const openTwoFa = () => {
    setIsTwoFaOpen(prev => !prev);
  };

  return (
    <div className="bg-[#F6F6F6] rounded-lg p-3 space-y-4 ">
      <h2 className="text-lg font-medium">Security settings</h2>
      <div className="flex flex-col gap-4">
        <button className="flex items-center justify-between w-full  hover:bg-gray-100 rounded-lg">
          <div className="flex items-center gap-5 w-full">
            <Image
              src="/images/key-round.png"
              width={24}
              height={24}
              alt="Change password"
            />
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900 mb-1">Change password</p>
              <p className="text-[#70747D] text-normal body-4 mb-3">
                Update your account password to keep your data safe and secure.
              </p>
            </div>
          </div>
          <Image
            src="/images/arrow-right.png"
            width={24}
            height={24}
            alt="Arrow"
            className="cursor-pointer"
            onClick={openDrawer}
          />
        </button>

        <button className="flex items-center justify-between w-full  hover:bg-gray-100 rounded-lg">
          <div className="flex items-center gap-5 w-full">
            <Image
              src="/images/shield.png"
              width={24}
              height={24}
              alt="Two factor authentication"
            />
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900 mb-1">
                Two factor authentication
              </p>
              <p className="text-[#70747D] text-normal body-4 mb-3">
                Add an extra layer of security by verifying your identity during
                login.
              </p>
            </div>
          </div>

          <ToggleButton onToggle={handleToggle} initial={isTwoFaEnabled} />

          {openSuccessModal && (
            <ConfirmationModal
              isOpen={openSuccessModal}
                onClose={() => setOpenSuccessModal(false)}  // JUST closes the modal
              onConfirm={handleSuccessConfirm}
              cancelText="Close"
              confirmText="Confirm"
              title={modalConfig.title}
              message={modalConfig.message}
            />
          )}
        </button>
      </div>
      
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 min-h-screen bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
            />
    
            {/* Drawer */}
            <motion.div
              className="bg-white w-[91vw] md:w-[40vw] top-0 overflow-auto hide-scrollbar fixed right-0 h-full z-50 pb-5 rounded-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            >
              <ChangePasswordDrawer onClose={openDrawer} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isTwoFaOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 min-h-screen bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTwoFaOpen(false)}
            />
    
            {/* Drawer */}
            <motion.div
              className="bg-white w-[91vw] md:w-[40vw] top-0 overflow-auto hide-scrollbar fixed right-0 h-full z-50 pb-5 rounded-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            >
              <TwoFaDrawer onClose={openTwoFa} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecuritySettings;