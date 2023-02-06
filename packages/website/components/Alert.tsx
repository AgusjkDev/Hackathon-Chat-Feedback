import { useContext } from "react";

import { AdminPanelContext } from "contexts";

export default function Alert() {
    const { alert } = useContext(AdminPanelContext);

    const { message, type } = alert;

    return (
        <span
            className={`fixed top-0 left-0 z-[2] w-full p-4 text-center font-bold text-white ${
                type === "success" ? "bg-secondary" : "bg-red-600"
            }`}
        >
            {message}
        </span>
    );
}
