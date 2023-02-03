import { createServer } from "http";
import { Server } from "socket.io";
import * as dotenv from "dotenv";

dotenv.config();

const server = createServer();
const io = new Server(server, {
    cors: { origin: process.env.CLIENT_URL ?? "" },
});

io.on("connection", socket => {
    socket.on("chat-message", (chatMessage: { username: string; message: string }) => {
        const { username, message } = chatMessage;

        console.log(`Received chat message from ${username}: ${message}`);
    });
});

const PORT = process.env.PORT ?? 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
