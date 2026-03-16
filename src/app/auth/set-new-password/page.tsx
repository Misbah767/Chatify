"use client";

import AuthCard from "@/Components/ui/AuthCard/AuthCard";
import AuthHeading from "@/Components/ui/AuthHeading/AuthHeading";
import SetNewPasswordForm from "@/Components/auth/SetNewPasswordForm/SetNewPasswordForm";

const SetNewPasswordPage = () => {
  return (
    <AuthCard>
      <AuthHeading
        secondaryTitle=" Set New Password"
        subtitle="Choose a strong password to secure your account."
      />
      <SetNewPasswordForm />
    </AuthCard>
  );
};

export default SetNewPasswordPage;
