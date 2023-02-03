"use client";

import { useState } from "react";

import Button from "./Button";
import Projects from "./Projects";
import Form, { HandleSubmit } from "./Form";
import { useProjects, useModal, useAlert } from "hooks";
import { postProjects, putProjects, deleteProjects } from "services";
import { BaseForm, createForm, updateForm } from "data/forms";

export default function AdminPanel() {
    const [form, setForm] = useState<BaseForm | null>(null);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const { projects, setProjects } = useProjects();
    const { showModal, toggleShowModal, handleOutsideModalClick } = useModal();
    const { alert, showAlert, setAlert } = useAlert();

    const handleSubmit: HandleSubmit = async (values, setErrorMessage, resetForm) => {
        const formType = form!.type;

        const { project, success, errorMessage } = await (formType === "create"
            ? postProjects(values)
            : putProjects({ ...currentProject!, ...values }));

        if (!success) {
            setErrorMessage(errorMessage!);

            return resetForm();
        }

        if (formType === "create") {
            setProjects(prevState => [project!, ...prevState]);
            setAlert({ message: "Proyecto creado satisfactoriamente.", type: "success" });

            return toggleShowModal();
        }

        setProjects(prevState =>
            prevState.map(prevStateProject =>
                prevStateProject._id !== project!._id ? prevStateProject : project!
            )
        );
        setAlert({ message: "Proyecto actualizado satisfactoriamente.", type: "success" });
        toggleShowModal();
    };

    const handleCreateClick = () => {
        setForm(createForm);
        toggleShowModal();
    };

    const handleUpdateClick = (project: Project) => {
        setCurrentProject(project);
        setForm(updateForm);
        toggleShowModal();
    };

    const handleDeleteClick = async (project: Project) => {
        if (!confirm("¿Estás seguro de eliminar éste proyecto?")) return;

        const { _id } = project;

        const { success, errorMessage, notFound } = await deleteProjects(_id);
        if (!success && !notFound) {
            return setAlert({ message: errorMessage!, type: "error" });
        }

        if (notFound) {
            setAlert({ message: errorMessage!, type: "error" });
        } else {
            setAlert({ message: "Proyecto eliminado satisfactoriamente.", type: "success" });
        }

        setProjects(prevState => prevState.filter(project => project._id !== _id));
    };

    return (
        <>
            <div className="flex w-full flex-col items-center gap-8 py-8">
                <Button className="mx-auto" onClick={handleCreateClick}>
                    Crear Proyecto
                </Button>

                <Projects
                    projects={projects}
                    handleUpdate={handleUpdateClick}
                    handleDelete={handleDeleteClick}
                />
            </div>

            {showModal && (
                <div
                    data-modal
                    onClick={handleOutsideModalClick}
                    className="fixed inset-0 z-[1] flex min-h-screen w-full items-center justify-center bg-black/50 px-4 hover:cursor-pointer md:px-0"
                >
                    {form && (
                        <Form
                            {...{
                                ...form,
                                fields:
                                    form.type === "create" || !currentProject
                                        ? form.fields
                                        : form.fields.map(field => ({
                                              ...field,
                                              initialValue: currentProject[
                                                  field.key as keyof Project
                                              ] as string,
                                          })),
                                handleSubmit,
                            }}
                        />
                    )}
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
