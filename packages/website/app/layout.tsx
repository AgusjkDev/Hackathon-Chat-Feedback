import Link from "next/link";

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <head />

            <body className="flex min-h-screen flex-col bg-primary-lightest text-primary">
                <header className="sticky top-0 z-[1] w-full bg-white p-5 shadow-md">
                    <Link href="/">
                        <h1 className="text-center text-2xl font-black text-secondary md:text-3xl">
                            Hackathon Chat Feedback
                        </h1>
                    </Link>
                </header>

                <div className="px-4 md:px-0">{children}</div>

                <footer className="mt-auto flex border-t-[1px] border-primary-lighter p-5">
                    <span className="mx-auto text-center text-sm font-medium">
                        Hecho con 💖 por&nbsp;
                        <a
                            href="https://github.com/agusjkdev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline transition-colors duration-300 hover:text-secondary"
                        >
                            Agustín Arnoldi
                        </a>
                    </span>
                </footer>
            </body>
        </html>
    );
}
