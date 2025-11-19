import React from "react";
import Image from "next/image";

const SecuritySettings: React.FC = () => {
  return (
    <div className="bg-[#F6F6F6] rounded-lg p-3 space-y-4 ">
      <h2 className="text-lg font-medium">Security settings</h2>
      <div className="flex flex-col gap-4">
        <button className="flex items-center justify-between w-full  hover:bg-gray-100 rounded-lg">
          <div className="flex items-center gap-5 w-full"> {/* Added w-full and increased gap */}
            <Image
              src="/images/key-round.png"
              width={24}
              height={24}
              alt="Change password"
            />
            <div className="flex-1 text-left"> {/* Added flex-1 and text-left */}
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
          />
        </button>

        <button className="flex items-center justify-between w-full  hover:bg-gray-100 rounded-lg">
          <div className="flex items-center gap-5 w-full"> {/* Added w-full and increased gap */}
            <Image
              src="/images/shield.png"
              width={24}
              height={24}
              alt="Two factor authentication"
            />
            <div className="flex-1 text-left"> {/* Added flex-1 and text-left */}
              <p className="font-medium text-gray-900 mb-1">
                Two factor authentication
              </p>
                  <p className="text-[#70747D] text-normal body-4 mb-3">
                Add an extra layer of security by verifying your identity during
                login.
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

export default SecuritySettings;