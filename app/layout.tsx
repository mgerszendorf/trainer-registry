import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ibmVga = localFont({
  src: "./fonts/Web437_IBM_VGA_9x16.woff",
  variable: "--font-ibm-vga",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Trainer Registry",
  description: "Recruitment task for Just Join IT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ibmVga.variable} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
