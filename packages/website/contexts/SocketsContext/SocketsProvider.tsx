import { useContext, useState, useEffect } from "react";
import io from "socket.io-client";

import SocketsContext from "./SocketsContext";
import { ProjectsContext } from "contexts";
import { Event } from "enums/events";
import type { SocketsState } from "./types";

interface SocketsProviderProps {
    children: React.ReactNode;
}

export default function SocketsProvider({ children }: SocketsProviderProps) {
    const { projects, isLoading, setProjects } = useContext(ProjectsContext);
    const [state] = useState<SocketsState>({
        socket: io(process.env.NEXT_PUBLIC_SOCKETIO_URL!, { transports: ["websocket"] }),
    });

    useEffect(() => {
        if (isLoading) return;

        const { socket } = state;

        socket.on(Event.CreatedProject, (createdProject: Project) => {
            setProjects([createdProject, ...projects.map(p => ({ ...p, isActive: false }))]);
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
    }, [projects, isLoading, state.socket]);

    return <SocketsContext.Provider value={{ ...state }}>{children}</SocketsContext.Provider>;
}
