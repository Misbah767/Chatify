"use client";

import AuthCard from "@/Components/ui/AuthCard/AuthCard";
import AuthHeading from "@/Components/ui/AuthHeading/AuthHeading";
import VerifyResetOtpForm from "@/Components/auth/VerifyResetOtpForm/VerifyResetOtpForm";

const VerifyResetOtpPage = () => {
  return (
    <AuthCard>
      <AuthHeading />
      <VerifyResetOtpForm />
    </AuthCard>
  );
};

export default VerifyResetOtpPage;
