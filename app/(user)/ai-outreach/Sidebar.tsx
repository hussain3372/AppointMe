"use client";
import React, { useRef, useState } from "react";
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import Image from "next/image";
// import { motion, AnimatePresence, Variants } from "framer-motion";
import ActionDropdown from "@/app/shared/ActionDropdown";
import ConfirmationModal from "@/app/shared/ConfirmationModal";
import Link from "next/link";

export default function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const OpenModal = () => {
    setIsModalOpen(true);
  };
  const CloseModal = () => {
    setIsModalOpen(false);
  };

  const chats = [
    {
      messages: [
        "Icons names ...",
        "Write description...",
        "Job search......",
        "Keyword suggestions ...",
        "AI tools...",
        "Icons names...",
        "AI tools...",
        "Job search...",
        "Icons name...",
        "Job search ...",
        "Icons names...",
        "Job search...",
        "AI tools...",
        "Icons names ...",
      ],
    },
  ];

  const [editableIndex, setEditableIndex] = useState<number | null>(null);
  const titleRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const handleEdit = (index: number) => {
    setEditableIndex(index);
    // Use setTimeout to ensure the element is rendered and focusable
        const element = titleRefs.current[index];

     if (element) {
      // Move cursor to end
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(element);
      range.collapse(false); // false = to the end
      selection?.removeAllRanges();
      selection?.addRange(range);
    }

    setTimeout(() => {
      titleRefs.current[index]?.focus();
    }, 0);
  };

  const handleBlur = () => {
    setEditableIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setEditableIndex(null);
    }
  };

  const AIActions = (index: number) => (
    <ul className="py-1 text-sm text-gray-700">
      <li>
        <button
          onClick={() => handleEdit(index)}
          className="w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          Rename
        </button>
      </li>

      <li>
        <button
          onClick={OpenModal}
          className="w-full text-left px-4 py-2 hover:bg-gray-100 "
        >
          Delete
        </button>
      </li>
    </ul>
  );

  // const sidebarVariants: Variants = {
  //   open: {
  //     x: 0,
  //     transition: {
  //       type: "spring",
  //       stiffness: 300,
  //       damping: 30,
  //     },
  //   },
  //   closed: {
  //     x: "-100%",
  //     transition: {
  //       type: "spring",
  //       stiffness: 300,
  //       damping: 30,
  //     },
  //   },
  // };

  return (
    <>
      {/* Burger Icon for Mobile */}
     

      {/* Mobile Sidebar Overlay */}
      

      {/* Sidebar - Only visible on large screens by default */}
      <div className="hidden lg:block p-3 w-full min-h-screen  border-r border-[#E2E3E5] ">
        <PrimaryBtn
          fontSize='12px'
          label="New chat"
          color="#FFFFFF"
          imageSrc="/images/arrow-right.svg"
          imagePosition="right"
        />
        <div className="flex flex-col  justify-between mb-16 h-[95vh] pb-3">
          <div className="pt-10  flex flex-col gap-1">
            {chats[0].messages.map((item, index) => (
              <div
                key={index}
                className="px-3 py-2 rounded-lg flex justify-between items-center max-h-[36px] group  hover:bg-[#F4F4F4]"
              >
                <p
                  contentEditable={editableIndex === index}
                  ref={(el) => {
                    titleRefs.current[index] = el;
                  }}
                  onBlur={handleBlur}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="heading-6 font-regular cursor-pointer  text-[#70747D]  outline-none "
                  suppressContentEditableWarning={true}
                >
                  {item}
                </p>
                <div className="hidden group-hover:block">
                  <ActionDropdown row={""} actions={() => AIActions(index)} />
                </div>
              </div>
            ))}
          </div>
        <Link href='/ai-outreach/email-templates' className="mt-20 cursor-pointer flex items-center gap-2 bg-[#F4F4F4] border border-[#E2E3E5] rounded-md p-3">
          <Image
            src="/images/file-text.png"
            alt="templates"
            height={20}
            width={20}
          />
          <p className="heading-6 font-regular text-[#414652]">
            Email templates
          </p>
        </Link>
            </div>
      </div>

      {isModalOpen && (
        <ConfirmationModal
          onConfirm={CloseModal}
          onClose={CloseModal}
          cancelText="Cancel"
          isOpen={isModalOpen} 
          title="Do you want to delete this chat"
          confirmText="Delete"
          icon="/images/delete.png"
        />
      )}

      
    </>
  );
}
