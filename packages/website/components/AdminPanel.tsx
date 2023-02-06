"use client";

import { useContext } from "react";

import Button from "./Button";
import Projects from "./Projects";
import Modal from "./Modal";
import Form from "./Form";
import Alert from "./Alert";
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

            {showAlert && <Alert />}
        </>
    );
}
