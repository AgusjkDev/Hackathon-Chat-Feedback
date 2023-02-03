import { useState, useEffect } from "react";

export default function useModal() {
    const [showModal, setShowModal] = useState<boolean>(false);

    const toggleShowModal = () => setShowModal(prevState => !prevState);

    const handleOutsideModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;

        if (target.getAttribute("data-modal")) toggleShowModal();
    };

    useEffect(() => {
        document.documentElement.classList.toggle("overflow-y-hidden");
    }, [showModal]);

    return { showModal, toggleShowModal, handleOutsideModalClick };
}
