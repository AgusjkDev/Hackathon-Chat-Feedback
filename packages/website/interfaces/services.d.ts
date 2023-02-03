interface ReturnValues {
    success: boolean;
    errorMessage?: string;
}

interface PostProjectsReturnValues extends ReturnValues {
    project?: Project;
}

interface PutProjectsReturnValues extends ReturnValues {
    project?: Project;
}

interface DeleteProjectsReturnValues extends ReturnValues {
    notFound?: boolean;
}

interface PostAdminReturnValues extends ReturnValues {}
