import { useContext } from "react";
import Link from "next/link";

import Svg from "./Svg";
import Feedback from "./Feedback";
import { ProjectsContext, AdminPanelContext } from "contexts";
import { github, externalLink, update, trash, lock } from "data/svgs";
import Image from "next/image";

function Website({ website }: { website: string }) {
    return (
        <a
            aria-label="Ir al Sitio Web"
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
        >
            <Svg {...externalLink} />
        </a>
    );
}

function Repository({ repository }: { repository: string }) {
    return (
        <a
            aria-label="Ir al Repositorio"
            href={repository}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
        >
            <Svg {...github} />
        </a>
    );
}

export default function Projects() {
    const { projects, isLoading } = useContext(ProjectsContext);
    const { handleUpdate, handleDelete } = useContext(AdminPanelContext);

    // If we are not in the admin panel, handleUpdate and handleDelete will both be undefined.
    const isAdminPanel = Boolean(handleUpdate! && handleDelete);

    return (
        <main className="flex w-full max-w-xl flex-col items-center gap-8 md:max-w-2xl md:gap-10">
            {isLoading ? (
                <Image alt="Cargando..." src="/spinner.svg" width={36} height={36} />
            ) : (
                projects.map((project, index) => {
                    const { _id, name, website, repository, feedback } = project;

                    return (
                        <div
                            key={_id}
                            className="flex w-full flex-col gap-6 rounded-sm border-[1px] border-primary-light p-5 transition-colors duration-300 first:animate-fade-in-down hover:border-secondary-light md:p-7"
                        >
                            <header className="grid w-full grid-cols-[1fr,3fr,1fr] place-items-center gap-x-2">
                                {isAdminPanel ? (
                                    <div className="flex flex-wrap gap-2">
                                        <Website website={website} />

                                        <Repository repository={repository} />
                                    </div>
                                ) : (
                                    <Website website={website} />
                                )}

                                <Link href={website}>
                                    <h2 className="text-center text-xl font-bold text-secondary transition-colors duration-300 hover:text-secondary-dark md:text-2xl">
                                        {name}
                                    </h2>
                                </Link>

                                {isAdminPanel ? (
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            aria-label="Actualizar Proyecto"
                                            className="group"
                                            onClick={() => handleUpdate(project)}
                                        >
                                            <Svg {...update} />
                                        </button>

                                        <button
                                            aria-label="Eliminar Proyecto"
                                            className="group"
                                            onClick={() => handleDelete(project)}
                                        >
                                            <Svg {...trash} />
                                        </button>
                                    </div>
                                ) : (
                                    <Repository repository={repository} />
                                )}
                            </header>

                            <Feedback feedback={feedback} />

                            {index !== 0 && (
                                <footer className="mx-auto">
                                    <span className="flex text-center text-sm font-medium">
                                        El análisis de éste proyecto acabó&nbsp;
                                        <Svg {...lock} small />
                                    </span>
                                </footer>
                            )}
                        </div>
                    );
                })
            )}
        </main>
    );
}
