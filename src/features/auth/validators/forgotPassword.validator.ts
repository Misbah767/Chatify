export interface ForgotPasswordForm {
  email: string;
}

export interface ForgotPasswordErrors {
  email?: string;
}

export const validateForgotPasswordForm = (
  form: ForgotPasswordForm
): ForgotPasswordErrors => {
  const errors: ForgotPasswordErrors = {};

  if (!form.email.trim()) {
    errors.email = "Email is required!";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Email is invalid!";
  }

  return errors;
};
