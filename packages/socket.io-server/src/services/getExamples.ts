import path from "path";
import csv from "csvtojson";

interface Example {
    text: string;
    label: string;
}

export default async function getExamples(filename: string): Promise<Example[]> {
    return await csv().fromFile(path.resolve(__dirname, `../examples/${filename}`));
}
