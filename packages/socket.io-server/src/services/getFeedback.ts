import fetch from "cross-fetch";

import getExamples from "./getExamples";
import { Feedback } from "../enums";
import Logger from "../logger";

interface CohereAPIResponse {
    id: string;
    classifications: {
        id: string;
        input: string;
        prediction: Feedback;
        confidence: number;
        confidences: {
            option: Feedback;
            confidence: number;
        }[];
        labels: {
            [Feedback.Positive]: { confidence: number };
            [Feedback.Negative]: { confidence: number };
            [Feedback.Neutral]: { confidence: number };
            [Feedback.Unknown]: { confidence: number };
        };
    }[];
}

let examples;
getExamples("v1.csv").then(data => {
    examples = data;
});

export default async function getFeedback(message: string): Promise<Feedback> {
    try {
        const request = await fetch("https://api.cohere.ai/classify", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
            },
            body: JSON.stringify({
                model: "multilingual-22-12",
                inputs: [message],
                examples,
            }),
        });
        const response: CohereAPIResponse = await request.json();
        if (request.status !== 200) {
            Logger.log(
                `Couldn't get feedback from message: '${message}'. ${JSON.stringify(response)}`,
                false
            );

            return Feedback.Unknown;
        }

        const feedback = response.classifications[0].prediction;
        Logger.log(`Got ${feedback} feedback from message: '${message}'`, true);

        return feedback;
    } catch (e) {
        Logger.log(`Couldn't get feedback from message: '${message}'. ${e}`, false);

        return Feedback.Unknown;
    }
}
