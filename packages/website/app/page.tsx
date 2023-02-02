import { Projects } from "components";
import { getProjects } from "services";

export const dynamic = "force-dynamic";

export default async function Index() {
    const projects = await getProjects();

    return (
        <div className="flex flex-col items-center gap-8 py-8">
            <p className="max-w-lg text-center font-medium">
                Analizaremos el comportamiento del chat mientras&nbsp;
                <a
                    href="https://www.twitch.tv/midudev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-light underline transition-colors duration-300 hover:text-secondary"
                >
                    midudev
                </a>
                &nbsp;esté observando los proyectos de la hackathon de&nbsp;
                <a
                    href="https://docs.cohere.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-light underline transition-colors duration-300 hover:text-secondary"
                >
                    co:here
                </a>
                &#46;
            </p>

            <Projects projects={projects} />
        </div>
    );
}
