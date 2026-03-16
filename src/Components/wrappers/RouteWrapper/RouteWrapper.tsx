"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import PublicRoute from "../PublicRoute/PublicRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const publicPaths = [
  "/",
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password-trigger",
  "/auth/set-new-password",
  "/auth/verify-account-otp",
  "/auth/verify-reset-password-otp",
];

const RouteWrapperClient = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isPublic = publicPaths.includes(pathname);

  console.log(
    "[RouteWrapper] Pathname:",
    pathname,
    isPublic ? "PUBLIC" : "PRIVATE"
  );

  return isPublic ? (
    <PublicRoute>{children}</PublicRoute>
  ) : (
    <PrivateRoute>{children}</PrivateRoute>
  );
};

export default RouteWrapperClient;
