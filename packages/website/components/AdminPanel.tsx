"use client";

import { useContext } from "react";

import Button from "./Button";
import Projects from "./Projects";
import Form from "./Form";
import { AdminPanelContext } from "contexts";

export default function AdminPanel() {
    const {
        form,
        alert,
        showAlert,
        showModal,
        handleCreate,
        handleOutsideModalClick,
        handleSubmit,
    } = useContext(AdminPanelContext);

    return (
        <>
            <div className="flex w-full flex-col items-center gap-8 py-8">
                <Button className="mx-auto" onClick={handleCreate}>
                    Crear Proyecto
                </Button>

                <Projects />
            </div>

            {showModal && (
                <div
                    data-modal
                    onClick={handleOutsideModalClick}
                    className="fixed inset-0 z-[1] flex min-h-screen w-full items-center justify-center bg-black/50 px-4 hover:cursor-pointer md:px-0"
                >
                    <Form {...{ ...form, handleSubmit }} />
                </div>
            )}

            {showAlert && (
                <span
                    className={`fixed top-0 left-0 w-full p-4 text-center font-bold text-white ${
                        alert.type === "success" ? "bg-secondary" : "bg-red-600"
                    }`}
                >
                    {alert.message}
                </span>
            )}
        </>
    );
}
