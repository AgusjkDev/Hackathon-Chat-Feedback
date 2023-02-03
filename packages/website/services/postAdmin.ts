import { APIError, PostAdmin } from "interfaces/api";
import { StatusCode } from "enums/api";

export default async function postAdmin(values: {
    [key: string]: string;
}): Promise<PostAdminReturnValues> {
    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const response: APIError | PostAdmin = await request.json();
        if (response.status !== StatusCode.OK) {
            return { success: false, errorMessage: response.msg };
        }

        return { success: true };
    } catch (e) {
        console.error(e);

        return { success: false, errorMessage: "¡Ha ocurrido un error inesperado!" };
    }
}
