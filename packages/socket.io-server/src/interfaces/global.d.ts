interface Project {
    _id: string;
    name: string;
    website: string;
    repository: string;
    feedback: {
        total: number;
        positive: number;
        negative: number;
        neutral: number;
    };
}
