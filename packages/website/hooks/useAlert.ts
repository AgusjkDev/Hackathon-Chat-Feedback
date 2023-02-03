import { useState, useEffect } from "react";

interface Alert {
    message: string;
    type: "success" | "error";
}

export default function useAlert() {
    const initialValues: Alert = {
        message: "",
        type: "success",
    };
    const [alert, setAlert] = useState<Alert>(initialValues);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    useEffect(() => {
        if (!alert.message) return;

        setShowAlert(true);

        const timeoutId = setTimeout(() => {
            setShowAlert(false);
            setAlert(initialValues);
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, [alert]);

    return { alert, showAlert, setAlert };
}
