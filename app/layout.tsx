import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Survd - The App for All Services",
  description: "Survd - The app for all services. Book barbers, hairstylists, nail technicians, massage therapists, house cleaning, car wash, laundry, and more. All services available on demand, right at your location.",
  icons: {
    icon: "/images/logos/SurvdFavIcon.png",
  },
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
