export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export const validateLoginForm = (form: LoginForm): LoginFormErrors => {
  const errors: LoginFormErrors = {};

  if (!form.email.trim()) errors.email = "Email is required!";
  else if (!/^\S+@\S+\.\S+$/.test(form.email))
    errors.email = "Invalid email address!";

  if (!form.password.trim()) errors.password = "Password is required!";

  return errors;
};
