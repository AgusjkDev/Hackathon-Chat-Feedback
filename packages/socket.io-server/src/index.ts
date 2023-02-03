import { createServer } from "http";
import { Server } from "socket.io";
import * as dotenv from "dotenv";

import { Event } from "enums/events";

dotenv.config();

const server = createServer();
const io = new Server(server, {
    cors: { origin: process.env.CLIENT_URL ?? "" },
});

io.on("connection", socket => {
    socket.on(Event.CreatedProject, (createdProject: Project) =>
        socket.broadcast.emit(Event.CreatedProject, createdProject)
    );

    socket.on(Event.UpdatedProject, (updatedProject: Project) =>
        socket.broadcast.emit(Event.UpdatedProject, updatedProject)
    );

    socket.on(Event.DeletedProject, (deletedProject: Project) =>
        socket.broadcast.emit(Event.DeletedProject, deletedProject)
    );

    socket.on(Event.ChatMessage, (chatMessage: { username: string; message: string }) => {
        const { username, message } = chatMessage;

        console.log(`Received chat message from ${username}: ${message}`);
    });
});

const PORT = process.env.PORT ?? 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
