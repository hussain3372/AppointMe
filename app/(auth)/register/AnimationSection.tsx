"use client";
import React from "react";
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import Image from "next/image";

export default function AnimationSection() {
  return (
    <div className="relative w-full h-full min-h-screen bg-[#11224E] overflow-hidden">
      {/* 🔹 Top Left Video - Fixed to corner */}
      <div className="absolute -top-8 left-0 w-[418px] h-[340px] z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          <source src="/images/Login-gif.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 🔹 Bottom Right Video - Fixed to corner */}
      <div className="absolute -bottom-9 -right-2 w-[418px] h-[320px] z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80 rotate-180"
        >
          <source src="/images/Login-gif.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 🔹 Centered Content - Perfectly centered in the viewport */}
      <div className="relative z-20 w-full h-full min-h-screen flex items-center justify-center px-8">
        <div className="w-full flex flex-col items-center mt-[259px] mb-[244px]">
          {/* Content Card */}
          <div className="relative bg-[rgba(255,255,255,0.12)] shadow-[0_4px_40px_0_rgba(248,123,27,0.20)] rounded-lg p-5 h-[272px] w-full max-w-[449px] flex flex-col justify-between backdrop-blur-sm">
            <h2 className="text-white text-2xl font-medium w-full max-w-[300px]">
              Generate AI-powered emails instantly
            </h2>

            <p className="text-[#FFFFFFCC] text-sm font-normal mt-3 w-full max-w-[283px]">
              Create personalized, well-crafted emails in seconds no writing
              experience needed.
            </p>

            <div className="flex items-center justify-between mt-auto">
              <div className="z-10">
                <PrimaryBtn
                fontSize="12px"
                  variant="filled"
                  label="Generate Email"
                  width="fit-content"
                  imageSrc="/images/filled-arrow.svg"
                  imagePosition="right"
                />
              </div>

              <div className="w-[220px]"></div>
            </div>

            <Image
              src="/images/auth-image.png"
              alt="Email generation illustration"
              width={230}
              height={270}
              className="object-contain absolute bottom-0 right-0 -mb-16 -mr-4 w-[230px] h-[300px] z-10"
            />
          </div>

          {/* Bottom Text */}
          <div className="text-center w-full mt-10 relative z-10">
            <h3 className="text-[32px] leading-9 font-light text-white mb-2">
              Grow leads faster and smarter
            </h3>
            <p className="text-[32px] leading-9 font-light text-white">
              with intelligent{" "}
              <span className="text-[#F99549]">automation</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
