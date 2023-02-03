"use client";

import { useState } from "react";

import { AdminPanel, LoginForm } from "components";
import { ProjectsProvider, SocketsProvider, AdminPanelProvider } from "contexts";

export default function Admin() {
    const [isLogged, setIsLogged] = useState<boolean>(false);

    return isLogged ? (
        <ProjectsProvider>
            <SocketsProvider>
                <AdminPanelProvider>
                    <AdminPanel />
                </AdminPanelProvider>
            </SocketsProvider>
        </ProjectsProvider>
    ) : (
        <LoginForm setIsLogged={setIsLogged} />
    );
}
