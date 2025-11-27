import Image from "next/image";
import React, { SetStateAction, useRef, useState } from "react";
import DrawerTable from "./DrawerTable";
import LightBtn from "@/app/ui/buttons/LightButton";
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import toast from "react-hot-toast";

export default function Drawer({onClose}: {onClose: () => void}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
const [imageUrl, setImageUrl] = useState<string | null>(null);
  const handleInput = () => {
    inputRef.current?.click();

   
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  }
};

  const handleSendMail = ()=>{
    onClose();
    toast.success('Email sent successfully to 200 leads.')
  }

  return (
    <div className="p-5 space-y-8">
      <div className="space-y-1">
        <h4 className="heading-4 font-medium text-[#111827]">
          Send email to leads
        </h4>
        <p className="heading-6 font-regular text-[#70747D]">
          Personalize and send emails to your selected leads instantly.
        </p>
      </div>
      <div className="w-full bg-[#ECFDF2] rounded-md shadow-xs flex items-start gap-3 p-3">
        <Image
          src="/images/wellcome-email.svg"
          alt="template"
          height={48}
          width={48}
        />
        <div className="space-y-1">
          <h5 className="heading-5 font-medium text-[#111827]">
            Your journey with us starts here
          </h5>
          <p className="heading-6 font-regular text-[#70747D] w-[456px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ul
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <h5 className="heading-5 font-medium text-[#111827]">
          Select audience 
        </h5>
        <div>
          <DrawerTable setIsDrawerOpen={() => console.log("opened")} />
        </div>
        <input onChange={handleFileChange} ref={inputRef} type="file" className="hidden" />
        <div
          onClick={handleInput}
          className="w-full flex flex-col items-center justify-center border border-dashed border-[#F87B1B] cursor-pointer min-h-[132px] rounded-lg bg-[#FEEFE4]"
        >
          <div className="flex flex-col items-center justify-center gap-3">
            {imageUrl && (
              <Image src={imageUrl} alt='Uploaded image' width={600} height={100} className="h-[132px] object-cover rounded-lg"  />
            )}            
            { 
              !imageUrl && (
            <div className="space-y-1 flex flex-col items-center justify-center">
            <Image
              src="/images/upload-file.png"
              alt="Uplaod CSV"
              height={40}
              width={40}
            />
              <h5 className="heading-5 font-medium text-[#111827] text-center">
                Import CSV
              </h5>
              <p className="heading-7 font-regular text-[#70747D] text-center">
                Upload a CSV file to add leads quickly.
              </p>
            </div>

              )
            }
          </div>
        </div>
        <div className="pt-[92px] pb-5 flex gap-3">
          <LightBtn imageSrc="/images/arrow-left.svg" imagePosition="left" label="Go back"/>
          <PrimaryBtn onClick={handleSendMail} imageSrc="/images/arrow-right.svg" imagePosition="right" label="Send email" fontSize="12px"/>
        </div>
      </div>
    </div>
  );
}
