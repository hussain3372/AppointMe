"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryBtn from "../ui/buttons/PrimaryBtn";

// Import step components
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";

export default function Parent() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const totalSteps = 6;

  const stepComponents = [Step1, Step2, Step3, Step4, Step5, Step6];
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const handleSkip = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const getButtonText = () => {
    if (currentStep === 1) {
      return "Start setup";
    } else if (currentStep === totalSteps) {
      return "Verify & continue";
    } else {
      return "Continue";
    }
  };

  // Get current step component
  const CurrentStepComponent = stepComponents[currentStep - 1];

  return (
    <div className=" p-2 sm:p-10 min-h-screen flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between">
        <button onClick={handleBack} className="flex gap-2 group">
          <Image
            src="/images/arrow-left.svg"
            alt="back"
            height={20}
            width={20}
          />
          <p className="heading-6 font-regular text-[#414652]  group-hover:underline">
            Back
          </p>
        </button>
        <button
          onClick={handleSkip}
          className="heading-6 font-regular text-[#F87B1B] cursor-pointer hover:underline"
        >
          Skip for now
        </button>
      </div>

      {/* Background Gradients */}

      <Image
        src="/images/gradient1.svg"
        alt="gradient1"
        width={102}
        height={78}
        className="hidden sm:block sm:absolute left-3 top-40"
      />
      <Image
        src="/images/gradient2.svg"
        alt="gradient1"
        width={99}
        height={76}
        className="hidden sm:block sm:absolute left-3 bottom-10"
      />
      <Image
        src="/images/gradient3.svg"
        alt="gradient1"
        width={99}
        height={76}
        className="hidden sm:block sm:absolute right-3 top-40"
      />
      <Image
        src="/images/gradient4.svg"
        alt="gradient1"
        width={461}
        height={461}
        className="hidden sm:block sm:absolute right-3 bottom-0"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-10 mx-auto ">
        {/* Render current step component */}
        <Image
          src="/images/mainlogo.svg"
          alt="Main logo"
          height={85}
          width={80}
        />
        <CurrentStepComponent />
      </div>

      {/* Progress Dots and Next Button */}
      <div className="flex flex-col items-center space-y-[122px] justify-between">
        {/* Progress Dots */}

        {/* Next Button */}
        <div className="pb-10 pt-[60px]">
          <PrimaryBtn
            onClick={handleNext}
            label={getButtonText()}
            imageSrc="/images/arrow-right.svg"
            imagePosition="right"
          />
        </div>
        <div className="flex gap-2 justify-center items-center pb-3">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`rounded-full h-2 w-2 ${
                index + 1 === currentStep ? "bg-[#11224E]" : "bg-[#CFD1D4]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
