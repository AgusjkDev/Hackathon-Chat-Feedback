import { Event } from "./enums";

export default class Logger {
    static event(eventName: Event) {
        console.log(`Received event ${eventName} ✔️`);
    }

    static log(message: string, success: boolean) {
        console.log(`${message} ${success ? "✔️" : "❌"}`);
    }
}
