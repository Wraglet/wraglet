import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from '@/app/providers';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <html suppressHydrationWarning lang="en" className="scroll-smooth">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
   </Providers>
  );
};

export default Layout;
