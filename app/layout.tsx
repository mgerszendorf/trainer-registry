import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import ThemeClient from "@/providers/ThemeClient";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";

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
        <ReactQueryProvider>
          <ThemeClient>
            {children}
          </ThemeClient>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
