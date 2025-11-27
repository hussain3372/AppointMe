import React from "react";
import AuthLayout from "../components/AuthLayout"; // use your AuthLayout component
import { Manrope } from "next/font/google";

interface Props {
  children: React.ReactNode;
}
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

const AuthPageLayout: React.FC<Props> = ({ children }) => {
  return (
    <AuthLayout>
      <div className={`${manrope.className} antialiased overflow-x-hidden`}>
        {children}
      </div>
    </AuthLayout>
  );
};

export default AuthPageLayout;
