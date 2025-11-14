import React from "react";
import AuthLayout from "../components/AuthLayout"; // use your AuthLayout component

interface Props {
  children: React.ReactNode;
}

const AuthPageLayout: React.FC<Props> = ({ children }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default AuthPageLayout;
