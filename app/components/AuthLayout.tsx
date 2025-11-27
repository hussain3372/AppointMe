
import React from "react";
import AnimationSection from "../(auth)/register/AnimationSection";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Left Side Animation */}
      <div className="hidden md:flex w-1/2 bg-[#11224E]  overflow-hidden">
      
        <AnimationSection />
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-1  w-full ">
        <div className="w-full ">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
