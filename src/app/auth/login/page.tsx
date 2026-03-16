"use client";

import AuthCard from "@/Components/ui/AuthCard/AuthCard";
import AuthHeading from "@/Components/ui/AuthHeading/AuthHeading";
import LoginForm from "@/Components/auth/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <AuthCard>
      <AuthHeading
        secondaryTitle="Login to your account"
        subtitle="Log in to see photos and videos from your friends."
      />
      <LoginForm />
    </AuthCard>
  );
};

export default LoginPage;
