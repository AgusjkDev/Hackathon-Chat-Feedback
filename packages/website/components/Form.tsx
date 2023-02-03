import { useState } from "react";

import Button from "./Button";

export type HandleSubmit = (
    values: { [key: string]: string },
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    resetForm: () => void
) => Promise<void>;

export interface FormProps {
    title: string;
    fields: {
        key: string;
        type: "text" | "password";
        placeholder: string;
        children: React.ReactNode;
        initialValue?: string;
    }[];
    submitText: string;
    handleSubmit: HandleSubmit;
}

export default function Form({ title, fields, submitText, handleSubmit }: FormProps) {
    const initialValues: { [key: string]: "" } = fields.reduce(
        (acc, field) => ({ ...acc, [field.key]: field.initialValue ?? "" }),
        {}
    );
    const [values, setValues] = useState<{ [key: string]: string }>(initialValues);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const resetForm = () => setValues(initialValues);

    return (
        <div className="flex w-full max-w-lg flex-col gap-4 rounded-sm bg-white px-6 py-8 hover:cursor-auto md:gap-6 md:px-8 md:py-10">
            <h2 className="text-center text-2xl font-bold text-secondary md:text-3xl">{title}</h2>

            <form
                autoComplete="off"
                onSubmit={event => {
                    event.preventDefault();

                    if (!Object.values(values).every(value => value)) {
                        return setErrorMessage("¡Debes completar todos los campos!");
                    }

                    try {
                        handleSubmit(values, setErrorMessage, resetForm);
                    } catch (e) {
                        setErrorMessage("¡Ha ocurrido un error inesperado!");
                        resetForm();
                    }
                }}
                className="flex flex-col gap-4 md:gap-6"
            >
                {errorMessage && (
                    <span className="rounded-sm bg-red-600 p-1.5 text-center text-sm font-medium text-white">
                        {errorMessage}
                    </span>
                )}
                {fields.map(({ key, type, placeholder, children }) => (
                    <div key={key} className="flex flex-col gap-1.5">
                        <label htmlFor={key} className="text-sm font-medium">
                            {children}
                        </label>

                        <input
                            id={key}
                            type={type}
                            placeholder={placeholder}
                            value={values[key]}
                            onChange={e =>
                                setValues(prevState => ({ ...prevState, [key]: e.target.value }))
                            }
                            className="rounded-sm border-[1px] border-primary-light bg-transparent p-3 text-sm outline-secondary-light placeholder:text-primary-light"
                        />
                    </div>
                ))}

                <Button type="submit" className="mt-2 md:mt-3">
                    {submitText}
                </Button>
            </form>
        </div>
    );
}
