"use client";

import React, { useState } from "react";
import Input from "../../ui/Input"; // adjust path based on your project
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import AuthHeader from "../register/AuthHeader";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: ""
    };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you can add your login API call logic
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Auth Header */}
      <AuthHeader
        rightText="Don't have an account? "
        rightLinkText="Signup"
        rightLinkHref="/register"
      />

      <div className="w-full flex flex-col items-center justify-center lg:px-24 md:px-10 px-4">
        <div className="text-center sm:mt-[87px] mt-[50px]">
          <h1 className="heading-1 mb-3 font-medium text-[#111827]">
            Welcome back!
          </h1>
          <p className="text-[#70747D] body-2 sm:mb-[60px] mb-[30px]">
            Sign in to explore your personalized dashboard.
          </p>
        </div>

        <form className="flex flex-col gap-8 w-full">
          {/* Email Field */}
          <div className="flex flex-col">
            <Input
              title="Email"
              name="email"
              type="email"
              placeholder="Enter email"
              className="w-full"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">{errors.email}</span>
            )}
          </div>

          {/* Password + Forgot Password */}
          <div className="flex flex-col w-full">
            <div className="flex flex-col">
              <Input
                title="Password"
                name="password"
                type="password"
                placeholder="Enter password"
                className="w-full"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">{errors.password}</span>
              )}
            </div>
            <div className="flex items-center justify-end mt-3">
              <Link
                href="/forgot-password"
                className="body-5 font-medium text-[#F87B1B] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div className="sm:mt-7 mt-0 sm:mb-[60px] mb-[30px]">
            <PrimaryBtn
              variant="filled"
              label="Login"
              width="100%"
              imageSrc="/images/filled-arrow.svg"
              imagePosition="right"
              onClick={handleLogin}
            />
          </div>
        </form>

        <div className="flex items-center w-full sm:mb-[60px] mb-[30px]">
          <hr className="flex-1 border-[#D7D7D7]" />
          <span className="px-5 font-normal text-[#70747D] body-3">
            Or continue with
          </span>
          <hr className="flex-1 border-[#D7D7D7]" />
        </div>

        {/* Social Login Buttons */}
        <div className="flex justify-center gap-6 mb-5">
          <div className="flex flex-col items-center gap-3">
            <a
              href="#"
              className="p-4 rounded-xl bg-[#F4F4F4] flex items-center justify-center"
            >
              <img
                src="/images/google-auth.svg"
                alt="Google"
                width={24}
                height={24}
              />
            </a>
            <span className="body-3 font-normal text-[#70747D]">Google</span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <a
              href="#"
              className="p-4 rounded-xl bg-[#F4F4F4] flex items-center justify-center"
            >
              <img
                src="/images/outlook-auth.svg"
                alt="Outlook"
                width={24}
                height={24}
              />
            </a>
            <span className="ody-3 font-normal text-[#70747D]">Outlook</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;