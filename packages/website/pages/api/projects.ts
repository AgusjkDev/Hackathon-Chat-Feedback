import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "utils";
import { ProjectModel } from "models";
import { HTTPMethod, StatusCode } from "enums/api";
import type {
    APIError,
    GetProjects,
    PostProjects,
    PutProjects,
    DeleteProjects,
    PatchProjects,
    ExpectedProjectsBody,
} from "types/api";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<
        APIError | GetProjects | PostProjects | PutProjects | DeleteProjects | PatchProjects
    >
) {
    const { _id, name, website, repository, feedback, newFeedback } = <ExpectedProjectsBody>(
        req.body
    );
    const method = <HTTPMethod>req.method;

    switch (method) {
        case HTTPMethod.GET:
            try {
                await db.connect();

                const projects: Project[] = await ProjectModel.find({});

                return res
                    .status(StatusCode.OK)
                    .json({ projects: projects.reverse(), status: StatusCode.OK });
            } catch (e) {
                console.error(e);

                return res.status(StatusCode.InternalServerError).json({
                    msg: "¡Ha ocurrido un error interno en el servidor!",
                    status: StatusCode.InternalServerError,
                });
            }

        case HTTPMethod.POST:
            if (![name, website, repository].every(value => value != null)) {
                return res
                    .status(StatusCode.BadRequest)
                    .json({ msg: "¡Petición Inválida!", status: StatusCode.BadRequest });
            }

            try {
                await db.connect();

                // Set the current active project as no longer active
                await ProjectModel.updateOne({ isActive: true }, { $set: { isActive: false } });

                const project = await ProjectModel.create({ name, website, repository });

                return res.status(StatusCode.Created).json({ project, status: StatusCode.Created });
            } catch (e) {
                console.error(e);

                return res.status(StatusCode.InternalServerError).json({
                    msg: "¡Ha ocurrido un error interno en el servidor!",
                    status: StatusCode.InternalServerError,
                });
            }

        case HTTPMethod.PUT:
            if (![_id, name, website, repository, feedback].every(value => value)) {
                return res
                    .status(StatusCode.BadRequest)
                    .json({ msg: "¡Petición Inválida!", status: StatusCode.BadRequest });
            }

            try {
                await db.connect();

                const project = await ProjectModel.findOneAndUpdate(
                    { _id },
                    { name, website, repository },
                    { new: true }
                );

                return res.status(StatusCode.OK).json({ project, status: StatusCode.OK });
            } catch (e) {
                console.error(e);

                return res.status(StatusCode.InternalServerError).json({
                    msg: "¡Ha ocurrido un error interno en el servidor!",
                    status: StatusCode.InternalServerError,
                });
            }

        case HTTPMethod.DELETE:
            const deleteId = req.query._id;
            if (Array.isArray(deleteId) || !deleteId) {
                return res
                    .status(StatusCode.BadRequest)
                    .json({ msg: "¡Petición Inválida!", status: StatusCode.BadRequest });
            }

            try {
                await db.connect();

                const { deletedCount } = await ProjectModel.deleteOne({ _id: deleteId });
                if (!deletedCount) {
                    return res
                        .status(StatusCode.NotFound)
                        .json({ msg: "¡Proyecto no encontrado!", status: StatusCode.NotFound });
                }

                // Set the last project before the deleted one as active
                await ProjectModel.updateOne(
                    {},
                    { $set: { isActive: true } },
                    { sort: { createdAt: -1 } }
                );

                return res.status(StatusCode.OK).json({ status: StatusCode.OK });
            } catch (e) {
                console.error(e);

                return res.status(StatusCode.InternalServerError).json({
                    msg: "¡Ha ocurrido un error interno en el servidor!",
                    status: StatusCode.InternalServerError,
                });
            }

        case HTTPMethod.PATCH:
            if (!newFeedback) {
                return res
                    .status(StatusCode.BadRequest)
                    .json({ msg: "¡Petición Inválida!", status: StatusCode.BadRequest });
            }

            try {
                await db.connect();

                await ProjectModel.updateOne(
                    { isActive: true },
                    { $inc: { "feedback.total": 1, [`feedback.${newFeedback}`]: 1 } }
                );

                return res.status(StatusCode.OK).json({ status: StatusCode.OK });
            } catch (e) {
                console.error(e);

                return res.status(StatusCode.InternalServerError).json({
                    msg: "¡Ha ocurrido un error interno en el servidor!",
                    status: StatusCode.InternalServerError,
                });
            }

        default:
            return res
                .status(StatusCode.MethodNotAllowed)
                .json({ msg: "¡Método No Permitido!", status: StatusCode.MethodNotAllowed });
    }
}
