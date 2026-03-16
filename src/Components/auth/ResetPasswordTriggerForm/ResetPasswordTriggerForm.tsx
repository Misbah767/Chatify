"use client";

import React from "react";
import Button from "@/Components/ui/Button/Button";
import { useResetPasswordTrigger } from "@/features/auth/hooks/useResetPasswordTrigger";

const ResetPasswordTriggerForm = () => {
  const { handleResetPassword } = useResetPasswordTrigger();

  return (
    <div className="flex flex-col items-center justify-center space-y-4 mt-6">
      <Button
        type="button"
        onClick={handleResetPassword}
        className="w-full max-w-xs"
      >
        Reset Password
      </Button>
    </div>
  );
};

export default ResetPasswordTriggerForm;
