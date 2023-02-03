import { useState, useEffect } from "react";

import { getProjects } from "services";

export default function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(true);

    useEffect(() => {
        const startTime = Date.now();
        const minFetchingDuration = 1000; // ms

        getProjects().then(data => {
            const timeConsumed = Date.now() - startTime;
            const timeout =
                timeConsumed < minFetchingDuration ? minFetchingDuration - timeConsumed : 0;

            setTimeout(() => {
                setProjects(data);
                setIsFetching(false);
            }, timeout);
        });
    }, []);

    return { projects, isFetching, setProjects };
}
