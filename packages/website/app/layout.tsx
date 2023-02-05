"use client";

import { Header, Footer } from "components";

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <head />

            <body className="flex min-h-screen flex-col bg-primary-lightest text-primary">
                <Header />

                <div className="px-4 md:px-0">{children}</div>

                <Footer />
            </body>
        </html>
    );
}
