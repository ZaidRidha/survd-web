import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Survd - The App for All Services",
  description: "Survd - The app for all services. Book barbers, hairstylists, nail technicians, massage therapists, house cleaning, car wash, laundry, and more. All services available on demand, right at your location.",
  icons: {
    icon: "/images/logos/SurvdFavIcon.png",
    shortcut: "/images/logos/SurvdFavIcon.png",
    apple: "/images/logos/SurvdFavIcon.png",
  },
  openGraph: {
    title: "Survd - The App for All Services",
    description: "Survd - The app for all services. Book barbers, hairstylists, nail technicians, massage therapists, house cleaning, car wash, laundry, and more. All services available on demand, right at your location.",
    url: "https://survd.co.uk",
    siteName: "Survd",
    images: [
      {
        url: "/images/logos/survd-logo.png",
        width: 1200,
        height: 630,
        alt: "Survd Logo",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Survd - The App for All Services",
    description: "Survd - The app for all services. Book barbers, hairstylists, nail technicians, massage therapists, house cleaning, car wash, laundry, and more. All services available on demand, right at your location.",
    images: ["/images/logos/survd-logo.png"],
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
