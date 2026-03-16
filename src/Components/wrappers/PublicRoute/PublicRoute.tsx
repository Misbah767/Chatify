"use client";

import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user, accessToken, initializing } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!initializing && user && accessToken) {
      router.push("/chats");
    }
  }, [initializing, user, accessToken, router]);

  if (initializing) return <div>Loading...</div>;
  if (user && accessToken) return <div>Redirecting...</div>;

  return <>{children}</>;
};

export default PublicRoute;
