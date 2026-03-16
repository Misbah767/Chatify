// ----------------- Types -----------------
export interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordErrors {
  password?: string;
  confirmPassword?: string;
}

// ----------------- Password Validator -----------------
export const validatePassword = (password: string): string[] => {
  const errors: string[] = [];

  if (!password || typeof password !== "string") {
    errors.push("Password is required");
    return errors;
  }

  if (password.length < 8) errors.push("at least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("one uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("one lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("one number");
  if (!/[@$!%*?&]/.test(password))
    errors.push("one special character (@$!%*?&)");

  return errors;
};

// ----------------- Reset Password Validator -----------------
export const validateResetPasswordForm = (
  form: ResetPasswordForm
): ResetPasswordErrors => {
  const errors: ResetPasswordErrors = {};

  // Validate password
  if (!form.password.trim()) errors.password = "Password is required!";
  else {
    const pwErrors = validatePassword(form.password);
    if (pwErrors.length > 0)
      errors.password = `Password must contain: ${pwErrors.join(", ")}`;
  }

  // Validate confirm password
  if (!form.confirmPassword.trim())
    errors.confirmPassword = "Confirm password is required!";
  else if (form.password !== form.confirmPassword)
    errors.confirmPassword = "Passwords do not match!";

  return errors;
};
