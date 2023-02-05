interface AnchorProps {
    href: string;
    children: React.ReactNode;
}

export default function Anchor({ href, children }: AnchorProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary underline transition-colors duration-300 hover:text-secondary-dark"
        >
            {children}
        </a>
    );
}
