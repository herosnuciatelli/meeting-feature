import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ptBR } from "@clerk/localizations";
import { Toaster } from "@/components/ui/sonner";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css"

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
  title: "Cronus",
  description: "A meeting app created by Heros Nuciatelli",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
      appearance={{
        baseTheme: dark,
        layout: {
          logoImageUrl: '/logo.svg'
        },
        variables: {
          colorText: "#fff",
          colorPrimary: "#1b60da",
          colorBackground: "#09090b",
          colorInputBackground: "#18181b",
          colorInputText: "#fff",
          colorTextOnPrimaryBackground: "#fff"
        }
      }}
      localization={ptBR}
    >
      <html lang="pt-br">
          <body
            className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
          >
            {children}
            <Toaster />
          </body>  
      </html>
    </ClerkProvider>
  );
}
