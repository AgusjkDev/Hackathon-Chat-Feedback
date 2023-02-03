"use client";

import { useState } from "react";

import { AdminPanel, LoginForm } from "components";

export default function Admin() {
    const [isLogged, setIsLogged] = useState<boolean>(false);

    return isLogged ? <AdminPanel /> : <LoginForm setIsLogged={setIsLogged} />;
}
