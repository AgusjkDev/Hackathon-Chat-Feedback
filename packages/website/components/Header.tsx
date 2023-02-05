import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-[1] w-full bg-white p-5 shadow-md">
            <Link href="/">
                <h1 className="text-center text-2xl font-black text-secondary md:text-3xl">
                    Hackathon Chat Feedback
                </h1>
            </Link>
        </header>
    );
}
