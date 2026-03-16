"use client";

import React from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//  Show success toast
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: "bottom-left", // <<--- bottom-left
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    transition: Slide,
  });
};

//  Show error toast
export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "bottom-left", // <<--- bottom-left
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    transition: Slide,
  });
};

// Mounted globally
const Toast: React.FC = () => <ToastContainer />;

export default Toast;
