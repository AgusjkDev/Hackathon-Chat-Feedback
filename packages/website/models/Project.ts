import { Schema, models, model } from "mongoose";

const projectSchema = new Schema<Project>({
    name: { type: String, required: true },
    website: { type: String, required: true },
    repository: { type: String, required: true },
    feedback: {
        total: { type: Number, default: 0 },
        positive: { type: Number, default: 0 },
        negative: { type: Number, default: 0 },
        neutral: { type: Number, default: 0 },
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

export const ProjectModel = models.Project || model<Project>("Project", projectSchema);
