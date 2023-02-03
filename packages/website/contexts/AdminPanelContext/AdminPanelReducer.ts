import initialState from "./initialState";
import { Type } from "./types";
import { createForm, updateForm } from "data/forms";
import type { AdminPanelState, AdminPanelAction } from "./types";

export default function AppReducer(
    state: AdminPanelState,
    action: AdminPanelAction
): AdminPanelState {
    const { type, payload } = action;

    switch (type) {
        case Type.HANDLE_CREATE:
            return {
                ...state,
                form: createForm,
                showModal: !state.showModal,
            };

        case Type.HANDLE_UPDATE:
            return {
                ...state,
                currentProject: payload,
                form: {
                    ...updateForm,
                    fields: updateForm.fields.map(field => ({
                        ...field,
                        initialValue: payload[field.key as keyof typeof payload] as string,
                    })),
                },
                showModal: !state.showModal,
            };

        case Type.HANDLE_DELETE:
            return {
                ...state,
                alert: payload,
            };

        case Type.SET_ALERT:
            return {
                ...state,
                alert: payload,
            };

        case Type.SET_SHOW_ALERT:
            return {
                ...state,
                showAlert: payload,
            };

        case Type.SET_INITIAL_ALERT:
            return {
                ...state,
                alert: initialState.alert,
                showAlert: initialState.showAlert,
            };

        case Type.SET_SHOW_MODAL:
            return {
                ...state,
                showModal: payload,
            };

        case Type.HANDLE_SUBMIT:
            return {
                ...state,
                alert: payload,
                showModal: false,
            };

        default:
            return state;
    }
}
