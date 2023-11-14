import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthContext from './context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wraglet',
  description:
    "Wraglet combines the brevity of Twitter, the engagement of Reddit, and the social connections of Facebook. With a focus on concise posts (up to 800 characters) and a robust upvoting system, we're redefining the way we share content online. Additionally, our innovative Blog section allows for long-form expression, fostering deeper discussions within our community."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
