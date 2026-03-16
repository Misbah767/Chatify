export interface FormErrors {
  name?: string;
  userName?: string;
  email?: string;
  password?: string;
}

export interface RegisterForm {
  name: string;
  userName: string;
  email: string;
  password: string;
}

export const validateRegisterForm = (form: RegisterForm): FormErrors => {
  const errors: FormErrors = {};

  if (!form.name.trim()) errors.name = "Full Name is required!";
  if (!form.userName.trim()) errors.userName = "Username is required!";
  if (!form.email.trim()) {
    errors.email = "Email is required!";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Email is invalid!";
  }
  if (!form.password.trim()) errors.password = "Password is required!";
  else if (form.password.length < 6)
    errors.password = "Password must be at least 6 characters!";

  return errors;
};
export interface LoginForm {
  email: string;
  password: string;
}

export const validateLoginForm = (form: LoginForm): FormErrors => {
  const errors: FormErrors = {};

  if (!form.email.trim()) {
    errors.email = "Email is required!";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Email is invalid!";
  }

  if (!form.password.trim()) {
    errors.password = "Password is required!";
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters!";
  }

  return errors;
};
