import { useState, useEffect } from "react";

import { getProjects } from "services";

export default function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        getProjects().then(setProjects);
    }, []);

    return { projects, setProjects };
}
