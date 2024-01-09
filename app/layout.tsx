import type { Metadata } from "next"

import "./globals.css"

import { GeistSans } from "geist/font/sans"

import { AuthProvider } from "@/lib/auth/auth-provider"
import { ThemeProvider } from "@/lib/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Container } from "@/components/layout/container"
import Navbar from "@/components/layout/navbar"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <AuthProvider>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <Container>{children}</Container>
            <Toaster position="top-center" />
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  )
}