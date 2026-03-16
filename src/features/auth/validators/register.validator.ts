export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  name?: string; // optional string per field
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const validateRegisterForm = (form: RegisterForm): FormErrors => {
  const errors: FormErrors = {};

  if (!form.name.trim()) errors.name = "Name is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!emailRegex.test(form.email)) errors.email = "Invalid email address";

  if (!form.password.trim()) errors.password = "Password is required";
  else {
    const pwErrors: string[] = [];
    if (form.password.length < 8) pwErrors.push("at least 8 characters");
    if (!/[A-Z]/.test(form.password)) pwErrors.push("one uppercase letter");
    if (!/[a-z]/.test(form.password)) pwErrors.push("one lowercase letter");
    if (!/[0-9]/.test(form.password)) pwErrors.push("one number");
    if (!/[@$!%*?&]/.test(form.password))
      pwErrors.push("one special character (@$!%*?&)");
    if (pwErrors.length)
      errors.password = `Password must contain: ${pwErrors.join(", ")}`;
  }

  if (!form.confirmPassword.trim())
    errors.confirmPassword = "Confirm Password is required";
  else if (form.password !== form.confirmPassword)
    errors.confirmPassword = "Passwords do not match";

  return errors;
};
