"use client";

import React, { useState } from "react";
import Input from "../../ui/Input"; // adjust path
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import AuthHeader from "../register/AuthHeader";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { authApi } from "@/app/api/auth";
import toast from "react-hot-toast";
import Link from "next/link";

const Login: React.FC = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false); // Loading state

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (loading) return; // Optional: disable typing while loading

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "" };

    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.values(newErrors).every((x) => x === "");
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (loading) return;

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await authApi.Login({
        email: formData.email,
        password: formData.password,
      });

      const data = response.data;
      console.log("login data", data);

      if (data?.error) {
        toast.error(data.error.message || "Login failed");
        setLoading(false);
        return;
      }

      if (data?.user) {
        Cookies.set("accessToken", data.tokens.accessToken, { expires: 7 });

        router.push("/dashboard");
      }
    } catch (error: any) {
      console.log("catch error", error);
      toast.error(error?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
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

          {/* Forgot password */}
          <div className="flex justify-end mt-3">
            <Link
              href="/forgot-password"
              className="body-5 font-medium text-[#F87B1B] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <div className="sm:mt-7 mt-0 sm:mb-[60px] mb-[30px]">
            <PrimaryBtn
              variant="filled"
              label={loading ? "Logging in..." : "Login"}
              width="100%"
              fontSize="16px"
              imageSrc={loading ? "" : "/images/filled-arrow.svg"}
              imagePosition="right"
              onClick={handleLogin}
              disabled={loading}
            />
          </div>
        </form>

        {/* Social login */}
        <div className="flex items-center w-full sm:mb-[60px] mb-[30px]">
          <hr className="flex-1 border-[#D7D7D7]" />
          <span className="px-5 font-normal text-[#70747D] body-3">
            Or continue with
          </span>
          <hr className="flex-1 border-[#D7D7D7]" />
        </div>

        <div className="flex justify-center gap-6 mb-5">
          <div className="flex flex-col items-center gap-3">
            <button className="p-4 rounded-xl bg-[#F4F4F4] cursor-pointer">
              <img
                src="/images/google-auth.svg"
                alt="Google"
                width={24}
                height={24}
              />
            </button>
            <span className="body-3 font-normal text-[#70747D]">Google</span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <button className="p-4 rounded-xl bg-[#F4F4F4] cursor-pointer">
              <img
                src="/images/outlook-auth.svg"
                alt="Outlook"
                width={24}
                height={24}
              />
            </button>
            <span className="body-3 font-normal text-[#70747D]">Outlook</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
