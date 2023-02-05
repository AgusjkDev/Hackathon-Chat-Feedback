import { useContext } from "react";

import { AdminPanelContext } from "contexts";

interface ModalProps {
    children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
    const { setShowModal } = useContext(AdminPanelContext);

    const handleOutsideModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;

        if (target.getAttribute("data-modal")) {
            setShowModal(false);
        }
    };

    return (
        <div
            data-modal
            onClick={handleOutsideModalClick}
            className="fixed inset-0 z-[1] flex min-h-screen w-full items-center justify-center bg-black/50 px-4 hover:cursor-pointer md:px-0"
        >
            {children}
        </div>
    );
}
