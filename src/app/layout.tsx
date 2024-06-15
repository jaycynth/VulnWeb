import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import ToastProvider from "../components/Toast/ToastProvider";
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OM Sec",
  description: "This is an app for testing security",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <ToastProvider>
          <NextTopLoader
            color="#2E2442"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2E2442,0 0 5px #2E2442"
          />
          <body className={inter.className}>{children}</body>
        </ToastProvider>
      </UserProvider>
    </html>
  );
}
