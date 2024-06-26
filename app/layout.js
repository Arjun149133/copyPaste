import { Inter } from "next/font/google";
import "./globals.css";
import Dashboard from "@/components/Dashboard";
import Provider from "@components/Provider";
import { Suspense } from "react";
import Loading from "./loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Copy Paste",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Suspense>
            <div className=" flex my-2 mx-2">
              <Dashboard />
            </div>
            {children}
            <ToastContainer />
          </Suspense>
        </Provider>
      </body>
    </html>
  );
}
