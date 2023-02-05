export default function LandingText() {
    return process.env.NEXT_PUBLIC_HACKATHON_ENDED !== "true" ? (
        <p className="max-w-lg text-center font-medium">
            Analizaremos el comportamiento del chat mientras&nbsp;
            <a
                href="https://www.twitch.tv/midudev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary underline transition-colors duration-300 hover:text-secondary-dark"
            >
                midudev
            </a>
            &nbsp;esté en directo observando los proyectos de la hackathon de&nbsp;
            <a
                href="https://docs.cohere.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary underline transition-colors duration-300 hover:text-secondary-dark"
            >
                co:here
            </a>
            &#46;
        </p>
    ) : (
        <p className="max-w-lg text-center font-medium">
            La hackathon acabó, y el proyecto también. Gracias a&nbsp;
            <a
                href="https://www.twitch.tv/midudev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary underline transition-colors duration-300 hover:text-secondary-dark"
            >
                midudev
            </a>
            &nbsp;por la organización y por su servicio a la comunidad de programación💯
        </p>
    );
}
