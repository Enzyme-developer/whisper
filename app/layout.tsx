import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import QueryWrapper from "./helpers/QueryWrapper";

const montserrat = Montserrat({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Whisper",
  description: "Connect, Vote, and Express Anonymously",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <QueryWrapper>
          <body className={montserrat.className}>{children}</body>
        </QueryWrapper>
      </ClerkProvider>
    </html>
  );
}
