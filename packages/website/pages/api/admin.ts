import type { NextApiRequest, NextApiResponse } from "next";

import { APIError, PostAdmin, ExpectedAdminBody } from "types/api";
import { HTTPMethod, StatusCode } from "enums/api";

export default function handler(req: NextApiRequest, res: NextApiResponse<APIError | PostAdmin>) {
    const { username, password } = <ExpectedAdminBody>req.body;
    const method = <HTTPMethod>req.method;

    if (method !== HTTPMethod.POST) {
        return res
            .status(StatusCode.MethodNotAllowed)
            .json({ msg: "¡Método No Permitido!", status: StatusCode.MethodNotAllowed });
    }

    if (
        !username ||
        username !== process.env.ADMIN_USERNAME ||
        !password ||
        password !== process.env.ADMIN_PASSWORD
    ) {
        return res
            .status(StatusCode.Unauthorized)
            .json({ msg: "¡Credenciales inválidas!", status: StatusCode.Unauthorized });
    }

    return res.status(StatusCode.OK).json({ status: StatusCode.OK });
}
