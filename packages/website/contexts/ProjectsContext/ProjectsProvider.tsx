import { useState, useEffect } from "react";

import ProjectsContext from "./ProjectsContext";
import { getProjects } from "services";
import type { ProjectsState, SetProjects } from "./types";

interface ProjectsProviderProps {
    children: React.ReactNode;
}

export default function ProjectsProvider({ children }: ProjectsProviderProps) {
    const [state, setState] = useState<ProjectsState>({
        projects: [],
        isLoading: true,
    });

    const setProjects: SetProjects = projects => {
        setState(prevState => ({ ...prevState, projects }));
    };

    useEffect(() => {
        const startTime = Date.now();
        const MIN_LOADING_TIME = 750; // ms

        getProjects().then(projects => {
            const consumedTime = Date.now() - startTime;
            const timeout = consumedTime < MIN_LOADING_TIME ? MIN_LOADING_TIME - consumedTime : 0;

            setTimeout(() => setState({ projects, isLoading: false }), timeout);
        });
    }, []);

    return (
        <ProjectsContext.Provider value={{ ...state, setProjects }}>
            {children}
        </ProjectsContext.Provider>
    );
}
