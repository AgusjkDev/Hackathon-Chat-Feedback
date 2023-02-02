interface SVG {
    viewBox: string;
    path: string;
}

interface ProjectFeedback {
    total: number;
    positive: number;
    negative: number;
    neutral: number;
}

interface Project {
    _id: string;
    name: string;
    website: string;
    repository: string;
    feedback: ProjectFeedback;
}
