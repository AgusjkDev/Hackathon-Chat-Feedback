"use client";

import { ProjectsProvider, SocketsProvider } from "contexts";

import { LandingText, Projects } from "components";

export default function Index() {
    return (
        <ProjectsProvider>
            <SocketsProvider>
                <div className="flex flex-col items-center gap-8 py-8">
                    <LandingText />

                    <Projects />
                </div>
            </SocketsProvider>
        </ProjectsProvider>
    );
}
