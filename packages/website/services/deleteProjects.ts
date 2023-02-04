import { APIError, DeleteProjects } from "types/api";
import { StatusCode } from "enums/api";

export default async function deleteProjects(_id: string): Promise<DeleteProjectsReturnValues> {
    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects?_id=${_id}`, {
            method: "DELETE",
        });
        const response: APIError | DeleteProjects = await request.json();
        if (response.status !== StatusCode.OK) {
            return {
                success: false,
                errorMessage: response.msg,
                notFound: response.status === StatusCode.NotFound,
            };
        }

        return { success: true };
    } catch (e) {
        console.error(e);

        return { success: false, errorMessage: "¡Ha ocurrido un error inesperado!" };
    }
}
