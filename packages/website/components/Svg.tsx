interface SvgProps extends SVG {
    small?: boolean;
}

export default function Svg({ viewBox, path, small }: SvgProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox}
            className={`aspect-square ${small ? "w-4" : "w-6"}`}
        >
            <path d={path} />
        </svg>
    );
}
