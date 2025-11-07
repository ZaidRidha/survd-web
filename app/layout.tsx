import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Survd - Book Local Services",
  description: "Find and book local barbers, hairstylists, nail technicians, and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
