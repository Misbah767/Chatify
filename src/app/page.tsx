"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/Components/auth/LoginForm/LoginForm";
import AuthHeading from "@/Components/ui/AuthHeading/AuthHeading";

const LandingPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#141414] text-[#FFFFFF]">
      <div className="flex flex-1 items-center justify-center gap-8 px-4 md:px-12">
        {/* LEFT IMAGE */}
        <div className="hidden md:flex flex-1 max-w-lg items-center justify-center">
          <img
            src="/img/signup.png"
            alt="Chatify"
            className="w-full h-auto object-cover rounded-xl border border-[#262626]"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="flex flex-1 max-w-xs flex-col items-center justify-center space-y-4">
          {/* Desktop AuthHeading */}
          <div className="hidden md:flex flex-col w-full space-y-2">
            <AuthHeading
              title="Chatify"
              subtitle="Stay connected with your friends and family through real-time conversations that feel natural and effortless."
            />
          </div>

          {/* Mobile heading */}
          <h1 className="md:hidden text-center text-3xl font-bold mt-12">
            Share <span className="text-[#703BF7]">every moment</span>{" "}
            effortlessly with Chatify
          </h1>

          {/* Mobile Button */}
          <button
            className="md:hidden bg-[#703BF7] hover:bg-[#8f6aec] text-white px-6 py-3 rounded-full font-semibold mb-4 transition"
            onClick={() => router.push("/chats")}
          >
            Open Chatify
          </button>

          {/* Desktop LoginForm */}
          <div className="hidden md:flex flex-col w-full space-y-4">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
