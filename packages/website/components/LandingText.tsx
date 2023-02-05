import Anchor from "./Anchor";

export default function LandingText() {
    return process.env.NEXT_PUBLIC_HACKATHON_ENDED !== "true" ? (
        <p className="max-w-lg text-center font-medium">
            Analizaremos el comportamiento del chat mientras&nbsp;
            <Anchor href="https://www.twitch.tv/midudev">midudev</Anchor>
            &nbsp;esté en directo observando los proyectos de la hackathon de&nbsp;
            <Anchor href="https://docs.cohere.ai">co:here</Anchor>
            &#46;
        </p>
    ) : (
        <p className="max-w-lg text-center font-medium">
            La hackathon acabó, y el proyecto también. Gracias a&nbsp;
            <Anchor href="https://www.twitch.tv/midudev">midudev</Anchor>
            &nbsp;por la organización y por su servicio a la comunidad de programación💯
        </p>
    );
}
