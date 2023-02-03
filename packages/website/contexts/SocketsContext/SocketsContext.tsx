import { createContext } from "react";

import type { SocketsContext as ISocketsContext } from "./types";

const SocketsContext = createContext<ISocketsContext>({} as ISocketsContext);

export default SocketsContext;
