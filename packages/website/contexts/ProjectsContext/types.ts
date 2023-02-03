export interface ProjectsState {
    projects: Project[];
    isLoading: boolean;
}

export type SetProjects = (projects: Project[]) => void;

export interface ProjectsContext extends ProjectsState {
    setProjects: SetProjects;
}
