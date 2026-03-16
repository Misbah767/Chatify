"use client";

import AuthCard from "@/Components/ui/AuthCard/AuthCard";
import AuthHeading from "@/Components/ui/AuthHeading/AuthHeading";
import VerifyAccountOtpForm from "@/Components/auth/VerifyAccountOtpForm/VerifyAccountOtpForm";

const VerifyAccountOtpPage = () => {
  return (
    <AuthCard>
      <AuthHeading />
      <VerifyAccountOtpForm />
    </AuthCard>
  );
};

export default VerifyAccountOtpPage;
