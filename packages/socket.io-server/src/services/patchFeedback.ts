import fetch from "cross-fetch";

import { Feedback } from "../enums";

export default function patchFeedback(newFeedback: Feedback): void {
    try {
        fetch(`${process.env.CLIENT_URL}/api/projects`, {
            method: "PATCH",
            body: JSON.stringify({ newFeedback }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (e) {
        console.error(e);
    }
}
