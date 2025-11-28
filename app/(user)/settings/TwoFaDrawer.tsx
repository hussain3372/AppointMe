"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LightBtn from "@/app/ui/buttons/LightButton";
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import Input from "@/app/ui/Input";
import Link from "next/link";
import ConfirmationModal from "@/app/shared/ConfirmationModal";
import toast from "react-hot-toast";

export default function TwoFaDrawer({ onClose }: { onClose: () => void }) {
  const [stepCount, setStepCount] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-digit OTP
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (timeLeft > 0 && stepCount === 2) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, stepCount]);

  const handleOpenModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handleOpenSuccessModal = () => {
    setOpenSuccessModal((prev) => !prev);
  };

  const handleConfirmation = () => {
    setOpenSuccessModal((prev) => !prev);
    toast.success("Two-factor authentication has been enabled.");
  };

  const handleSendOtp = () => {
    console.log("Sending OTP to:", email);
    setTimeLeft(60); // Reset timer
    setStepCount(2);
  };

  const handleVerifyOtp = () => {
    // Here you would verify the OTP
    console.log("Verifying OTP:", otp);
    // If verification is successful, open confirmation modal
    setOpenModal(true);
  };

  const handleEnable2FA = () => {
    // Final confirmation to enable 2FA
    console.log("Enabling 2FA...");
    handleOpenModal(); // Close confirmation modal
    handleOpenSuccessModal(); // Open success modal
  };

  const handleSuccessConfirm = () => {
    handleOpenSuccessModal(); // Close success modal
    onClose(); // Close drawer
  };

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      // Only allow numbers
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < otp.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    if (timeLeft === 0) {
      // Reset timer and resend OTP logic here
      setTimeLeft(60);
      setOtp(["", "", "", "", "", ""]); // Clear OTP inputs
      inputsRef.current[0]?.focus(); // Focus first input

      // Add your API call to resend OTP here
      console.log("Resending OTP to:", email);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Content Area */}
      <div className="flex-1 p-5 overflow-hidden">
        <div className="space-y-1 pb-8">
          <h4 className="heading-4 font-medium">
            Enable two-factor authentication
          </h4>
          <p className="heading-6 font-regular text-[#70747D] max-w-[540px]">
            Add an extra layer of security to protect your account. Whenever you
            sign in, you'll be asked to enter a verification code sent to your
            email.
          </p>
        </div>
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
              <div className="space-y-4">
                <Input
                  title="Email"
                  placeholder="Enter email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
              className="space-y-10 h-full"
            >
              <div className="flex gap-2 justify-between">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      if (el) {
                        inputsRef.current[index] = el;
                      }
                    }}
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-[76px] h-[64px] text-center placeholder:text-[#A0A3A9] rounded-full focus:outline-none outline-none bg-[#f0f0f0] border-0 focus:ring-2 focus:ring-orange-500 text-lg"
                  />
                ))}
              </div>

              <div className="text-center">
                {timeLeft > 0 ? (
                  <div className="space-y-10">
                    <div className="text-xl font-medium text-gray-700">
                      {Math.floor(timeLeft / 60)}:
                      {(timeLeft % 60).toString().padStart(2, "0")}
                    </div>
                    <button
                      disabled={timeLeft > 0}
                      className="text-orange-500 underline cursor-pointer hover:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                      onClick={handleResendCode}
                    >
                      Resend Code
                    </button>{" "}
                  </div>
                ) : (
                  <span
                    className="text-orange-500 underline cursor-pointer hover:text-orange-600 font-medium"
                    onClick={handleResendCode}
                  >
                    Resend Code
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Buttons Fixed at Bottom */}
      <div className="p-5 bg-white">
        <div className="flex flex-col sm:flex-row gap-3 mt-3 pb-3">
          {stepCount === 1 ? (
            <>
              <LightBtn
                label="Cancel"
                onClick={onClose}
                imageSrc="/images/arrow-left.svg"
                imagePosition="left"
              />
              <PrimaryBtn
                fontSize="12px"
                label="Send OTP"
                onClick={handleSendOtp}
                imageSrc="/images/arrow-right.svg"
                imagePosition="right"
              />
            </>
          ) : (
            <>
              <LightBtn
                label="Back"
                onClick={() => setStepCount(1)}
                imageSrc="/images/arrow-left.svg"
                imagePosition="left"
              />
              <PrimaryBtn
                fontSize="12px"
                label="Verify"
                onClick={handleVerifyOtp}
                imageSrc="/images/arrow-right.svg"
                imagePosition="right"
              />
            </>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {openModal && (
        <ConfirmationModal
          isOpen={openModal}
          onClose={handleOpenModal}
          onConfirm={handleEnable2FA}
          cancelText="Cancel"
          confirmText="Yes, enable 2FA"
          title="Enable Two-Factor Authentication"
          message="Are you sure you want to enable two-factor authentication for your account?"
        />
      )}

      {/* Success Modal */}
      {openSuccessModal && (
        <ConfirmationModal
          isOpen={openSuccessModal}
          onClose={handleSuccessConfirm}
          onConfirm={handleConfirmation}
          cancelText="Close"
          confirmText="OK"
          title="2FA Enabled Successfully"
          message="Two-factor authentication has been successfully enabled for your account. You will now receive verification codes for future sign-ins."
        />
      )}
    </div>
  );
}
