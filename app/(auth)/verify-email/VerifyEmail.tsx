"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { authApi } from "@/app/api/auth";
import Cookies from "js-cookie";
const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      toast.error("Invalid verification link");
      router.push("/login");
      return;
    }

    const verifyUserEmail = async () => {
      try {
        const data = await authApi.verifyEmail({ token });

        if (data?.user) {
          toast.success("Email verified successfully!");
          setLoading(false);
          // Redirect to login page after toast
          Cookies.set("accessToken", data.tokens.accessToken, { expires: 7 });

          setTimeout(() => router.push("/onboarding"), 1500);
        }
      } catch (error: any) {
        console.error("Verification failed:", error);
        toast.error(error?.response?.data?.message || "Verification failed");
      }
    };

    verifyUserEmail();
  }, [token, router]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="text-center space-y-4">
        {loading ? (
          <>
            <h2 className="text-xl font-semibold">Verifying your email...</h2>
            <p className="text-gray-500">Please wait</p>
          </>
        ) : (
          <h2 className="text-xl font-semibold">Email Verified!</h2>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
