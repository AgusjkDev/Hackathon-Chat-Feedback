import { useContext, useEffect, useReducer } from "react";

import AdminPanelContext from "./AdminPanelContext";
import AdminPanelReducer from "./AdminPanelReducer";
import initialState from "./initialState";
import { Type } from "./types";
import { ProjectsContext, SocketsContext } from "contexts";
import { postProjects, putProjects, deleteProjects } from "services";
import { Event } from "enums/events";
import type {
    HandleCreate,
    HandleUpdate,
    HandleDelete,
    HandleOutsideModalClick,
    HandleSubmit,
} from "./types";

interface ProjectsProviderProps {
    children: React.ReactNode;
}

export default function ProjectsProvider({ children }: ProjectsProviderProps) {
    const { projects, setProjects } = useContext(ProjectsContext);
    const { socket } = useContext(SocketsContext);
    const [state, dispatch] = useReducer(AdminPanelReducer, initialState);

    const handleCreate: HandleCreate = () => {
        dispatch({
            type: Type.HANDLE_CREATE,
            payload: undefined,
        });
    };

    const handleUpdate: HandleUpdate = project => {
        dispatch({
            type: Type.HANDLE_UPDATE,
            payload: project,
        });
    };

    const handleDelete: HandleDelete = async project => {
        if (!confirm("¿Estás seguro de eliminar éste proyecto?")) return;

        const { _id } = project;

        const { success, errorMessage, notFound } = await deleteProjects(_id);
        if (!success && !notFound) {
            return dispatch({
                type: Type.SET_ALERT,
                payload: { message: errorMessage!, type: "error" },
            });
        }

        socket.emit(Event.DeletedProject, project);
        setProjects(projects.filter(({ _id }) => _id !== project._id));
        dispatch({
            type: Type.HANDLE_DELETE,
            payload: notFound
                ? { message: errorMessage!, type: "error" }
                : { message: "Proyecto eliminado satisfactoriamente.", type: "success" },
        });
    };

    const handleOutsideModalClick: HandleOutsideModalClick = event => {
        const target = event.target as HTMLDivElement;

        if (target.getAttribute("data-modal")) {
            dispatch({
                type: Type.SET_SHOW_MODAL,
                payload: false,
            });
        }
    };

    const handleSubmit: HandleSubmit = async (values, setErrorMessage, resetForm) => {
        const isCreateForm = state.form.type === "create";

        const { project, success, errorMessage } = await (isCreateForm
            ? postProjects(values)
            : putProjects({ ...state.currentProject!, ...values }));

        if (!success) {
            setErrorMessage(errorMessage!);

            return resetForm();
        }

        socket.emit(isCreateForm ? Event.CreatedProject : Event.UpdatedProject, project);
        setProjects(
            isCreateForm
                ? [project!, ...projects]
                : projects.map(p => (p._id !== project!._id ? p : project!))
        );
        dispatch({
            type: Type.HANDLE_SUBMIT,
            payload: {
                message: `Proyecto ${isCreateForm ? "creado" : "actualizado"} satisfactoriamente.`,
                type: "success",
            },
        });
    };

    useEffect(() => {
        if (!state.alert.message) return;

        dispatch({
            type: Type.SET_SHOW_ALERT,
            payload: true,
        });

        const timeoutId = setTimeout(() => {
            dispatch({
                type: Type.SET_INITIAL_ALERT,
                payload: undefined,
            });
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, [state.alert]);

    return (
        <AdminPanelContext.Provider
            value={{
                ...state,
                handleCreate,
                handleUpdate,
                handleDelete,
                handleOutsideModalClick,
                handleSubmit,
            }}
        >
            {children}
        </AdminPanelContext.Provider>
    );
}