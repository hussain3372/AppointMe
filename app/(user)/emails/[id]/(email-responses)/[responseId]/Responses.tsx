"use client";

import { useState } from "react";
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ResponsesTable from "./ResponsesTable";
import LightBtn from "@/app/ui/buttons/LightButton";
import Link from "next/link";
import Drawer from "./drawer/Drawer";

const Responses = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="relative space-y-5">
      <div className="flex gap-2 items-center">
        <Link
          href="/emails"
          className="heading-6 font-regular text-[#70747D] hover:underline"
        >
          EMAILS
        </Link>
        <Image src="/images/gap-img.svg" alt="gap" height={20} width={20} />
        <Link
          href="/emails/news-letter"
          className="heading-6 uppercase font-regular  text-[#70747D] hover:underline"
        >
          {/* <h6 className="heading-6 uppercase font-regular  text-[#70747D]"> */}
            monthly newsletter
          {/* </h6> */}
        </Link>

        <Image src="/images/gap-img.svg" alt="gap" height={20} width={20} />
        <h6 className="heading-6 uppercase font-regular  text-[#70747D]">
          View responses
        </h6>
      </div>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="space-y-2">
          <h4 className="heading-4 font-medium text-[#111827]">
            Lead responses overview
          </h4>
          <p className="heading-5 font-regular text-[#70747D]">
            See how leads responded and plan your next move.
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div>
        <ResponsesTable setIsDrawerOpen={setIsDrawerOpen} />
      </div>

      {/* Overlay + Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 h-[100vh] z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)} // close on overlay click
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 w-[90vw] h-[100vh] overflow-auto hide-scrollbar sm:w-[580px] bg-white z-50 rounded-l-lg p-5"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <Drawer />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Responses;
