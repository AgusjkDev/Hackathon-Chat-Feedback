import getExamples from "./getExamples";
import { Feedback } from "../enums";

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
            console.error(response);

            return Feedback.Unknown;
        }

        return response.classifications[0].prediction;
    } catch (e) {
        console.error(e);

        return Feedback.Unknown;
    }
}
