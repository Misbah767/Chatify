"use client";

import AuthCard from "@/Components/ui/AuthCard/AuthCard";
import AuthHeading from "@/Components/ui/AuthHeading/AuthHeading";
import ResetPasswordTriggerForm from "@/Components/auth/ResetPasswordTriggerForm/ResetPasswordTriggerForm";
import Toast from "@/Components/ui/Toast/Toast";

const ResetPasswordTriggerPage = () => {
  return (
    <>
      <AuthCard>
        <AuthHeading
          secondaryTitle="Reset your password"
          subtitle="Click the button below to securely reset your password."
        />

        <ResetPasswordTriggerForm />
      </AuthCard>
    </>
  );
};

export default ResetPasswordTriggerPage;
