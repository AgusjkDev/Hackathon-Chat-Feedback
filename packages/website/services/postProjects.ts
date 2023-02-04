import { APIError, PostProjects } from "types/api";
import { StatusCode } from "enums/api";

export default async function postProjects(values: {
    [key: string]: string;
}): Promise<PostProjectsReturnValues> {
    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const response: APIError | PostProjects = await request.json();
        if (response.status !== StatusCode.Created) {
            return { success: false, errorMessage: response.msg };
        }

        return { project: response.project, success: true };
    } catch (e) {
        console.error(e);

        return { success: false, errorMessage: "¡Ha ocurrido un error inesperado!" };
    }
}
