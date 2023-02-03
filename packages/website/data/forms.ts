import { FormProps } from "components/Form";

export interface BaseForm extends Omit<FormProps, "handleSubmit"> {
    type: "login" | "create" | "update";
}

export const loginForm: BaseForm = {
    type: "login",
    title: "Panel de administrador",
    fields: [
        {
            key: "username",
            type: "text",
            placeholder: "Usuario del administrador",
            children: "Usuario",
        },
        {
            key: "password",
            type: "password",
            placeholder: "Contraseña del administrador",
            children: "Contraseña",
        },
    ],
    submitText: "Iniciar Sesión",
};

export const createForm: BaseForm = {
    type: "create",
    title: "Crear proyecto",
    fields: [
        {
            key: "name",
            type: "text",
            placeholder: "Nombre del proyecto",
            children: "Nombre",
        },
        {
            key: "website",
            type: "text",
            placeholder: "Sitio web del proyecto",
            children: "Sitio Web",
        },
        {
            key: "repository",
            type: "text",
            placeholder: "Repositorio de GitHub",
            children: "Repositorio",
        },
    ],
    submitText: "Crear Proyecto",
};

export const updateForm: BaseForm = {
    type: "update",
    title: "Actualizar proyecto",
    fields: [
        {
            key: "name",
            type: "text",
            placeholder: "Nombre del proyecto",
            children: "Nombre",
        },
        {
            key: "website",
            type: "text",
            placeholder: "Sitio web del proyecto",
            children: "Sitio Web",
        },
        {
            key: "repository",
            type: "text",
            placeholder: "Repositorio de GitHub",
            children: "Repositorio",
        },
    ],
    submitText: "Actualizar Proyecto",
};
