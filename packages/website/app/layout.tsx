import Link from "next/link";

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <head />

            <body className="md:scrollbar bg-primary-lightest text-primary md:[overflow-y:overlay]">
                <header className="sticky top-0 w-full bg-white p-5 shadow-md">
                    <Link href="/">
                        <h1 className="text-center text-2xl font-black text-secondary md:text-3xl">
                            Hackathon Chat Feedback
                        </h1>
                    </Link>
                </header>

                <div className="px-4 md:px-0">{children}</div>
            </body>
        </html>
    );
}
