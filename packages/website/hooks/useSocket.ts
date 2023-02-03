import { useState } from "react";
import io, { Socket } from "socket.io-client";

export default function useSocket() {
    const [socket] = useState<Socket>(
        io(process.env.NEXT_PUBLIC_SOCKETIO_URL!, { transports: ["websocket"] })
    );

    // I'll bring some more uses later on.

    return { socket };
}
