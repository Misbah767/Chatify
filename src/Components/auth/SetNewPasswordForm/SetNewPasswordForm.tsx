"use client";

import Input from "@/Components/ui/Input/Input";
import Button from "@/Components/ui/Button/Button";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useSetNewPassword } from "@/features/auth/hooks/usesetnewPassword";

const SetNewPasswordForm = () => {
  const {
    form,
    formErrors,
    showPassword,
    showConfirm,
    resetLoading,
    handleChange,
    handleSubmit,
    setShowPassword,
    setShowConfirm,
  } = useSetNewPassword();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
      <Input
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="New Password"
        value={form.password}
        onChange={handleChange}
        leftIcon={FiLock}
        rightIcon={showPassword ? FiEyeOff : FiEye}
        onRightIconClick={() => setShowPassword(!showPassword)}
        error={formErrors.password}
      />

      <Input
        name="confirmPassword"
        type={showConfirm ? "text" : "password"}
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
        leftIcon={FiLock}
        rightIcon={showConfirm ? FiEyeOff : FiEye}
        onRightIconClick={() => setShowConfirm(!showConfirm)}
        error={formErrors.confirmPassword}
      />

      <Button type="submit" isLoading={resetLoading} className="w-full">
        {resetLoading ? "Updating password..." : "Set Password"}
      </Button>
    </form>
  );
};

export default SetNewPasswordForm;
