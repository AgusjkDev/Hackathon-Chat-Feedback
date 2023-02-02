import { StatusCode } from "enums/api";

export interface APIError {
    msg: string;
    status: StatusCode;
}

interface GetProjects {
    projects: Project[];
    status: StatusCode.OK;
}

interface PostProjects {
    project: Project;
    status: StatusCode.Created;
}

interface PutProjects {
    project: Project;
    status: StatusCode.OK;
}

interface DeleteProjects {
    status: StatusCode.OK;
}

interface ExpectedProjectsBody extends Project {}
