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
    <div className="flex flex-col min-h-screen bg-[#0c1014] text-white">
      <div className="flex flex-1 items-center justify-center gap-8 px-4 md:px-12">
        {/* LEFT IMAGE */}
        <div className="hidden md:flex flex-1 max-w-lg items-center justify-center">
          <img
            src="/img/landing-2x.png"
            alt="Chatify"
            className="w-full h-auto object-cover rounded-lg transition-transform duration-500 ease-out hover:-translate-x-4 hover:-rotate-3"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="flex flex-1 max-w-xs flex-col items-center justify-center space-y-4">
          {/* Desktop AuthHeading */}
          <div className="hidden md:flex flex-col w-full space-y-2">
            <AuthHeading
              title="Chatify"
              subtitle="Connect instantly with friends and family. Share your moments, celebrate memories, and enjoy seamless conversations in one place."
            />
          </div>

          {/* Mobile heading */}
          <h1 className="md:hidden text-center text-4xl font-bold mt-12 font-sacramento">
            Share{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              every moment
            </span>{" "}
            effortlessly with Chatify
          </h1>

          {/* Mobile Button */}
          <button
            className="md:hidden bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold mb-4"
            onClick={() => router.push("/chats")}
          >
            Open Chatify
          </button>

          {/* Desktop LoginForm */}
          <div className="hidden md:flex flex-col w-full space-y-4">
            <LoginForm /> {/* Clean login form for desktop */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
