import React, { useEffect, useState } from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";

import { useSpeechSynthesis } from "react-speech-kit";

export const ModalPush = ({ lastLetter, lastNumbers }) => {
    const [active, setActive] = useState(false);
    const [currentNumber, setCurrentNumber] = useState();

    // de texto a voz
    const { speak, voices } = useSpeechSynthesis();

    useEffect(() => {
        console.log(voices);
        // encuentra una voz en espanol
        const spanishVoice = voices.find((voice) => voice.lang === "es-ES");

        // voz especifica
        // const spanishVoice = voices[0];
        // obtengo el numero mas resiente
        setCurrentNumber(lastNumbers[0]);

        if (lastNumbers[0]) {
            setActive(true);

            // sonido texto a voz
            speak({ text: `${lastLetter} ${lastNumbers[0]}`, voice: spanishVoice });
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
                {lastLetter}-{currentNumber}
            </div>
        </div>
    );
};
