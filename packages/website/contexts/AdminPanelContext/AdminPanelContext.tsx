import { createContext } from "react";

import type { AdminPanelContext as IAdminPanelContext } from "./types";

const AdminPanelContext = createContext<IAdminPanelContext>({} as IAdminPanelContext);

export default AdminPanelContext;
