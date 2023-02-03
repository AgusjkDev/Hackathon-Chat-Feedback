interface ButtonProps {
    className?: string;
    children?: React.ReactNode;
    [key: string]: any;
}

export default function Button(props: ButtonProps) {
    const { className, children } = props;
    const buttonProps = { ...props, className: undefined, children: undefined };

    return (
        <button
            {...buttonProps}
            className={`rounded-sm bg-secondary p-3 text-center text-sm font-bold uppercase text-white transition-colors duration-300 hover:bg-secondary-dark${
                className ? ` ${className}` : ""
            }`}
        >
            {children}
        </button>
    );
}
