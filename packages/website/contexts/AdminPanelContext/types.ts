import type { BaseForm } from "data/forms";
import type { HandleSubmit as HandleSubmitType } from "components/Form";

interface Alert {
    message: string;
    type: "success" | "error";
}

export interface AdminPanelState {
    form: BaseForm;
    currentProject: Project | null;
    alert: Alert;
    showModal: boolean;
    showAlert: boolean;
}

export type HandleCreate = () => void;
export type HandleUpdate = (project: Project) => void;
export type HandleDelete = (project: Project) => Promise<void>;
export type HandleOutsideModalClick = (event: React.MouseEvent<HTMLDivElement>) => void;
export type HandleSubmit = HandleSubmitType;

export interface AdminPanelContext extends AdminPanelState {
    handleCreate: HandleCreate;
    handleUpdate: HandleUpdate;
    handleDelete: HandleDelete;
    handleOutsideModalClick: HandleOutsideModalClick;
    handleSubmit: HandleSubmit;
}

export enum Type {
    HANDLE_CREATE = "HANDLE_CREATE",
    HANDLE_UPDATE = "HANDLE_UPDATE",
    HANDLE_DELETE = "HANDLE_DELETE",
    SET_ALERT = "SET_ALERT",
    SET_SHOW_ALERT = "SET_SHOW_ALERT",
    SET_INITIAL_ALERT = "SET_INITIAL_ALERT",
    SET_SHOW_MODAL = "SET_SHOW_MODAL",
    HANDLE_SUBMIT = "HANDLE_SUBMIT",
}

export type AdminPanelAction =
    | {
          type: Type.HANDLE_CREATE;
          payload: undefined;
      }
    | {
          type: Type.HANDLE_UPDATE;
          payload: Project;
      }
    | {
          type: Type.HANDLE_DELETE;
          payload: Alert;
      }
    | {
          type: Type.SET_ALERT;
          payload: Alert;
      }
    | {
          type: Type.SET_SHOW_ALERT;
          payload: boolean;
      }
    | {
          type: Type.SET_INITIAL_ALERT;
          payload: undefined;
      }
    | {
          type: Type.SET_SHOW_MODAL;
          payload: boolean;
      }
    | {
          type: Type.HANDLE_SUBMIT;
          payload: Alert;
      };
