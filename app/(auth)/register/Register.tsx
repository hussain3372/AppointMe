"use client";

import React, { useState } from "react";
import Input from "../../ui/Input";
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import AuthHeader from "./AuthHeader";
import { useRouter } from "next/navigation";
import { authApi } from "@/app/api/auth";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const Register: React.FC = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false); // <-- NEW LOADING STATE

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    company: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    company: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (loading) return; // Disable typing when loading (optional)

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      company: "",
    };

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);

    return Object.values(newErrors).every((x) => x === "");
  };

  const handleCreateAccount = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (loading) return;
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await authApi.register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
      });

      const data = response.data;
      console.log("data", data);

      // ✅ Check if backend returned an error object
      if (data?.error) {
        toast.error(data.error.message || "Registration failed");
        setLoading(false);
        return;
      }

      if (data?.user) {
        toast.success("Account created successfully!");

        // ✅ Save token in cookies (7 days expiry)
        Cookies.set("accessToken", data.tokens.accessToken, {
          expires: 7,
        });

        // redirect if needed
        // router.push("/onboarding");
      }
    } catch (error: any) {
      console.log("error", error);
      toast.error(error.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full">
      <AuthHeader
        rightText="Have an account?"
        rightLinkText="Login"
        rightLinkHref="/login"
      />

      <div className="w-full flex flex-col items-center justify-center lg:px-24 md:px-10 px-4">
        <div className="text-center sm:mt-[87px] mt-[9px]">
          <h1 className="heading-1 mb-3 font-medium text-[#111827]">
            Create your account
          </h1>
          <p className="text-[#70747D] body-2 sm:mb-[60px] mb-[30px]">
            Join us today and unlock your personalized experience.
          </p>
        </div>

        <form className="flex flex-col sm:gap-8 gap-4 w-full">
          {/* First Name */}
          <div>
            <Input
              title="First Name"
              name="firstName"
              type="text"
              placeholder="Enter first name"
              className="w-full"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={loading}
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm mt-1">
                {errors.firstName}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div>
            <Input
              title="Last Name"
              name="lastName"
              type="text"
              placeholder="Enter last name"
              className="w-full"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={loading}
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm mt-1">
                {errors.lastName}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <Input
              title="Email"
              name="email"
              type="email"
              placeholder="Enter email"
              className="w-full"
              value={formData.email}
              onChange={handleInputChange}
              disabled={loading}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div>
            <Input
              title="Password"
              name="password"
              type="password"
              placeholder="Enter password"
              className="w-full"
              value={formData.password}
              onChange={handleInputChange}
              disabled={loading}
            />
            {errors.password && (
              <span className="text-red-500 text-sm mt-1">
                {errors.password}
              </span>
            )}
          </div>

          {/* Company */}
          <div>
            <Input
              title="Company"
              name="company"
              type="text"
              placeholder="Enter company"
              className="w-full"
              value={formData.company}
              onChange={handleInputChange}
              disabled={loading}
            />
            {errors.company && (
              <span className="text-red-500 text-sm mt-1">
                {errors.company}
              </span>
            )}
          </div>

          <div className="sm:mt-7 mt-0 sm:mb-[60px] mb-5">
            <PrimaryBtn
              variant="filled"
              label={loading ? "Creating..." : "Create account"} // <-- SHOW LOADING
              width="100%"
              fontSize="16px"
              imageSrc={loading ? "" : "/images/filled-arrow.svg"}
              imagePosition="right"
              onClick={handleCreateAccount}
              disabled={loading} // <-- DISABLE BUTTON
            />
          </div>
        </form>

        {/* Disable Google and Outlook buttons */}
        <div className="flex items-center w-full sm:mb-[60px] mb-5">
          <hr className="flex-1 border-[#D7D7D7]" />
          <span className="px-5 font-normal text-[#70747D] body-3">
            Or continue with
          </span>
          <hr className="flex-1 border-[#D7D7D7]" />
        </div>

        <div
          className={`flex justify-center sm:gap-6 gap-3 mb-5 ${
            loading ? "opacity-50" : "opacity-100"
          }`}
        >
          <div className="flex flex-col items-center sm:gap-3 gap-1">
            <button
              className="sm:p-4 p-2 rounded-xl bg-[#F4F4F4] cursor-pointer"
              disabled={loading}
            >
              <img
                src="/images/google-auth.svg"
                alt="Google"
                width={24}
                height={24}
              />
            </button>
            <span className="body-3 text-[#70747D]">Google</span>
          </div>

          <div className="flex flex-col items-center sm:gap-3 gap-1">
            <button
              className="sm:p-4 p-2 rounded-xl bg-[#F4F4F4] cursor-pointer"
              disabled={loading}
            >
              <img
                src="/images/outlook-auth.svg"
                alt="Outlook"
                width={24}
                height={24}
              />
            </button>
            <span className="body-3 text-[#70747D]">Outlook</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
