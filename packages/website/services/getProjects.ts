import { StatusCode } from "enums/api";
import type { APIError, GetProjects } from "types/api";

export default async function getProjects(): Promise<Project[]> {
    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`);
        const response: APIError | GetProjects = await request.json();
        if (response.status !== StatusCode.OK) {
            console.error(response.msg);

            return [];
        }

        return response.projects;
    } catch (e) {
        console.error(e);

        return [];
    }
}
