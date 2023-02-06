import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

import { getFeedback, patchFeedback } from "./services";
import { Event, Feedback } from "./enums";
import Logger from "./logger";

dotenv.config();

const server = createServer();
const io = new Server(server);

io.use((socket, next) => {
    const origin = socket.request.headers.origin;
    const twitchBotKey = socket.request.headers["twitch_bot_key"];

    if (origin === process.env.CLIENT_URL || twitchBotKey === process.env.TWITCH_BOT_KEY) {
        return next();
    }

    return next(new Error("¡No estás autorizado!"));
});

io.on("connection", socket => {
    socket.on(Event.CreatedProject, (createdProject: Project) => {
        Logger.event(Event.CreatedProject);
        socket.broadcast.emit(Event.CreatedProject, createdProject);
    });

    socket.on(Event.UpdatedProject, (updatedProject: Project) => {
        Logger.event(Event.UpdatedProject);
        socket.broadcast.emit(Event.UpdatedProject, updatedProject);
    });

    socket.on(Event.DeletedProject, (deletedProject: Project) => {
        Logger.event(Event.DeletedProject);
        socket.broadcast.emit(Event.DeletedProject, deletedProject);
    });

    socket.on(Event.ChatMessage, async (message: string) => {
        Logger.event(Event.ChatMessage);

        const feedback = await getFeedback(message);
        if (feedback === Feedback.Unknown) return;

        socket.broadcast.emit(Event.Feedback, feedback);
        patchFeedback(feedback);
    });
});

const PORT = process.env.PORT ?? 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
