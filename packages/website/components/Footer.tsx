export default function Footer() {
    return (
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
    );
}
