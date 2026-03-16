"use client";

import AuthCard from "@/Components/ui/AuthCard/AuthCard";
import AuthHeading from "@/Components/ui/AuthHeading/AuthHeading";
import RegisterForm from "@/Components/auth/RegisterForm/RegisterForm";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  return (
    <AuthCard maxWidth="max-w-xl">
      {" "}
      {/*  Wider card for tablet/desktop */}
      <AuthHeading
        secondaryTitle="Create your account"
        subtitle="Sign up to explore amazing moments shared by your friends."
      />
      <RegisterForm />
      <p className="text-sm text-gray-400 text-center mt-4">
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => router.push("/auth/login")}
        >
          Login
        </span>
      </p>
    </AuthCard>
  );
};

export default RegisterPage;
