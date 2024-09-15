import React, { useEffect, useState } from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";

export const ModalPush = ({ lastNumbers }) => {
    const [active, setActive] = useState(false);
    const [currentNumber, setCurrentNumber] = useState();

    useEffect(() => {
        // obtengo el numero mas resiente

        setCurrentNumber(lastNumbers[0]);
        if (lastNumbers[0]) {
            setActive(true);
            setTimeout(() => {
                setActive(false);
            }, 3000);
        }
    }, [lastNumbers]);

    return (
        <div
            className={
                active
                    ? generalStyles.modalPushContainer + " " + generalStyles.active
                    : generalStyles.modalPushContainer
            }
        >
            <div
                className={
                    !active
                        ? generalStyles.modalPush
                        : generalStyles.modalPush + " " + generalStyles.modalPushActive
                }
            >
                {currentNumber}
            </div>
        </div>
    );
};
