import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Survd - Join the Waitlist",
  description: "Join the waitlist for Survd - the future of local service booking. Connect with barbers, hairstylists, nail technicians, and more.",
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
