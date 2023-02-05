import type { Socket } from "socket.io-client";

export interface SocketsState {
    socket: Socket;
}

export interface SocketsContext extends SocketsState {}
