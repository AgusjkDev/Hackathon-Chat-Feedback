import { createContext } from "react";

import type { ProjectsContext as IProjectsContext } from "./types";

const ProjectsContext = createContext<IProjectsContext>({} as IProjectsContext);

export default ProjectsContext;
