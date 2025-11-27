import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import "./ui/typography.css";
import { Toaster } from "react-hot-toast";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AppointMe - Schedule Your Appointments Effortlessly",
  description:
    "AppointMe is your go-to solution for seamless appointment scheduling. Manage bookings, send reminders, and streamline your calendar with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased overflow-x-hidden`}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#fff",
              color: "black",
            },
            success: {
              duration: 3000,
              // theme: {
              //   primary: 'green',
              //   secondary: 'black',
              // },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
