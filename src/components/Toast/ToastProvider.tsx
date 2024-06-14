'use client';

import { ToastContainer } from "react-toastify";
import { ReactNode } from "react";

interface ToastProviderProps {
  children: ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
}
