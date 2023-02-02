import tmi from "tmi.js";
import io from "socket.io-client";
import dotenv from "dotenv";

dotenv.config();

const client = new tmi.Client({
    identity: {
        username: process.env.TWITCH_USERNAME ?? "",
        password: process.env.TWITCH_OAUTH_TOKEN ?? "",
    },
    channels: [process.env.TWITCH_CHANNEL ?? ""],
});

const socket = io(process.env.SOCKET_URL ?? "");

client.connect().catch(console.error);

client.on("message", (_, tags, message, self) => {
    if (self) return;

    const { username } = tags;

    socket.emit("chat-message", { username, message });
});
