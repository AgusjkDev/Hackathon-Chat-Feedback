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

const socket = io(process.env.SOCKETIO_URL ?? "", {
    extraHeaders: {
        TWITCH_BOT_KEY: process.env.TWITCH_BOT_KEY,
    },
});

client.connect().catch(console.error);

client.on("message", (_, tags, message, self) => {
    if (self) return;

    console.log(`${tags.username} said: '${message}' ✍️`);

    socket.emit("chat-message", message);
});
