import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/component/footer";
import { Nav } from "@/component/nav";
import { Provider } from "./provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shyampur Bazar Online",
    template: "%s | Shyampur Bazar",
  },
  description:
    "Shop groceries, vegetables, daily essentials and local products online from Shyampur Bazar, Bihar 841438.",
  keywords: [
    "Shyampur Bazar",
    "Online Grocery Bihar",
    "Local Market Bihar",
    "Shyampur Online Shopping",
  ],
  openGraph: {
    title: "Shyampur Bazar Online",
    description:
      "Fresh groceries and local products delivered in Shyampur, Bihar.",
    url: "https://shyampurbazar.vercel.app",
    siteName: "Shyampur Bazar",
    type: "website",
  },
  verification: {
    google: "qj3MB0JokgeDaOQ0NKzzzEJiEZDMIyiaZBK4RPz3guQ"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Nav />
          {children}
          <Footer />
        </Provider>

      </body>
    </html>
  );
}
