import { useContext, useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

import SocketsContext from "./SocketsContext";
import { ProjectsContext } from "contexts";
import { Event } from "enums/events";
import type { SocketsState } from "./types";

interface SocketsProviderProps {
    children: React.ReactNode;
}

export default function SocketsProvider({ children }: SocketsProviderProps) {
    const { projects, isLoading, setProjects } = useContext(ProjectsContext);
    const [socket] = useState<Socket | null>(
        !process.env.NEXT_PUBLIC_HACKATHON_ENDED
            ? io(process.env.NEXT_PUBLIC_SOCKETIO_URL!, { transports: ["websocket"] })
            : null
    );

    useEffect(() => {
        if (isLoading || !socket) return;

        socket.on(Event.CreatedProject, (createdProject: Project) => {
            setProjects([createdProject, ...projects.map(p => ({ ...p, isActive: false }))]);
            window.scroll(0, 0);
        });

        socket.on(Event.UpdatedProject, (updatedProject: Project) => {
            setProjects(
                projects.map(project =>
                    project._id === updatedProject._id ? updatedProject : project
                )
            );
        });

        socket.on(Event.DeletedProject, (deletedProject: Project) => {
            setProjects(
                projects
                    .filter(project => project._id !== deletedProject._id)
                    .map((p, i) => (i === 0 ? { ...p, isActive: true } : p))
            );
        });

        socket.on(Event.Feedback, (newFeedback: NewFeedback) => {
            setProjects(
                projects.map(p =>
                    p.isActive
                        ? {
                              ...p,
                              feedback: {
                                  ...p.feedback,
                                  total: p.feedback.total + 1,
                                  [newFeedback]: p.feedback[newFeedback] + 1,
                              },
                          }
                        : p
                )
            );
        });

        return () => {
            socket.removeAllListeners();
        };
    }, [projects, isLoading, socket]);

    return <SocketsContext.Provider value={{ socket }}>{children}</SocketsContext.Provider>;
}
