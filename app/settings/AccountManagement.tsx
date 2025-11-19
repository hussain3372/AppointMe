import React from "react";
import Image from "next/image";

const AccountManagement: React.FC = () => {
  return (
    <div className="bg-[#F6F6F6] rounded-lg p-6 space-y-4 mb-5">
      <h2 className="heading-4  font-medium mb-5 text-[#333]">
        Account management
      </h2>
      <div className="flex flex-col gap-4">
        <button className="flex items-center justify-between w-full  hover:bg-gray-100 rounded-lg">
          <div className="flex gap-5 items-center">
            {" "}
          
            <Image
              src="/images/lock.png"
              width={24}
              height={24}
              alt="Deactivate account"
            />
            <div className="text-left">
              {" "}
              <p className="font-medium text-gray-900 mb-1">
                Deactivate account
              </p>
                  <p className="text-[#70747D] text-normal body-4 mb-3">
                You can reactivate anytime by logging back in.
              </p>
            </div>
          </div>
          <Image
            src="/images/arrow-right.png"
            width={24}
            height={24}
            alt="Arrow"
          />
        </button>

        <button className="flex items-center justify-between w-full  hover:bg-gray-100 rounded-lg">
          <div className="flex gap-5 items-center">
            {" "}
            <Image
              src="/images/deleted.png"
              width={24}
              height={24}
              alt="Delete account"
            />
            <div className="text-left">
              {" "}
              <p className="font-medium text-gray-900 mb-1">Delete account</p>
                  <p className="text-[#70747D] text-normal body-4 mb-3">
                Permanently remove your account and all related data.
              </p>
            </div>
          </div>
          <Image
            src="/images/arrow-right.png"
            width={24}
            height={24}
            alt="Arrow"
          />
        </button>
      </div>
    </div>
  );
};

export default AccountManagement;
