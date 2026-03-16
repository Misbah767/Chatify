"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";

import AuthInitializer from "../AuthInitializer/AuthInitializer";
import RouteWrapperClient from "@/Components/wrappers/RouteWrapper/RouteWrapper";
import SocketProvider from "../SocketProvider/SocketProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {/* Restore user from localStorage */}
      <AuthInitializer />

      {/* Socket connection after auth */}
      <SocketProvider>
        {/* Public / Private route protection */}
        <RouteWrapperClient>{children}</RouteWrapperClient>
      </SocketProvider>
    </Provider>
  );
}
