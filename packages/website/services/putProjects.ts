import { APIError, PutProjects } from "interfaces/api";
import { StatusCode } from "enums/api";

export default async function putProjects(project: Project): Promise<PutProjectsReturnValues> {
    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
            method: "PUT",
            body: JSON.stringify(project),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const response: APIError | PutProjects = await request.json();
        if (response.status !== StatusCode.OK) {
            return { success: false, errorMessage: response.msg };
        }

        return { project: response.project, success: true };
    } catch (e) {
        console.error(e);

        return { success: false, errorMessage: "¡Ha ocurrido un error inesperado!" };
    }
}
