"use client";

import Form from "./Form";
import { postAdmin } from "services";
import { loginForm } from "data/forms";
import type { HandleSubmit } from "./Form";

interface LoginFormProps {
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginForm({ setIsLogged }: LoginFormProps) {
    const handleSubmit: HandleSubmit = async (values, setErrorMessage, resetForm) => {
        const { success, errorMessage } = await postAdmin(values);
        if (!success) {
            setErrorMessage(errorMessage!);

            return resetForm();
        }

        setIsLogged(true);
    };

    return (
        <div className="flex min-h-[calc(100vh-72px)] w-full flex-col items-center justify-center md:min-h-[calc(100vh-76px)]">
            <Form {...{ ...loginForm, handleSubmit }} />
        </div>
    );
}
