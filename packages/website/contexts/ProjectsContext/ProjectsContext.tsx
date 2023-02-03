import { createContext } from "react";

import { ProjectsContext as IProjectsContext } from "./types";

const ProjectsContext = createContext<IProjectsContext>({} as IProjectsContext);

export default ProjectsContext;
