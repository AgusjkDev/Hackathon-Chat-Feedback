"use client";

import { useContext } from "react";

import Button from "./Button";
import Projects from "./Projects";
import Modal from "./Modal";
import Form from "./Form";
import { AdminPanelContext } from "contexts";

export default function AdminPanel() {
    const { form, alert, showAlert, showModal, handleCreate, handleSubmit } =
        useContext(AdminPanelContext);

    return (
        <>
            <div className="flex w-full flex-col items-center gap-8 py-8">
                <Button className="mx-auto" onClick={handleCreate}>
                    Crear Proyecto
                </Button>

                <Projects />
            </div>

            {showModal && (
                <Modal>
                    <Form {...{ ...form, handleSubmit }} />
                </Modal>
            )}

            {showAlert && (
                <span
                    className={`fixed top-0 left-0 z-[2] w-full p-4 text-center font-bold text-white ${
                        alert.type === "success" ? "bg-secondary" : "bg-red-600"
                    }`}
                >
                    {alert.message}
                </span>
            )}
        </>
    );
}
