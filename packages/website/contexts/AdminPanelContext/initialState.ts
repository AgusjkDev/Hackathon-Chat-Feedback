import { createForm } from "data/forms";
import type { AdminPanelState } from "./types";

const initialState: AdminPanelState = {
    form: createForm,
    currentProject: null,
    alert: {
        message: "",
        type: "success",
    },
    showAlert: false,
    showModal: false,
};

export default initialState;
