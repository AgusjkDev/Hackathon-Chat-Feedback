import type { Socket } from "socket.io-client";

export interface SocketsState {
    socket: Socket | null;
}

export interface SocketsContext extends SocketsState {}
