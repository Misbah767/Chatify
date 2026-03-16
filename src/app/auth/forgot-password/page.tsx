"use client";

import AuthCard from "@/Components/ui/AuthCard/AuthCard";
import AuthHeading from "@/Components/ui/AuthHeading/AuthHeading";
import ForgotPasswordForm from "@/Components/auth/ForgotPasswordForm/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <AuthCard>
      <AuthHeading
        secondaryTitle="Forgot  password?"
        subtitle="Enter your email address and we’ll send you a reset OTP."
      />

      <ForgotPasswordForm />
    </AuthCard>
  );
};

export default ForgotPasswordPage;
