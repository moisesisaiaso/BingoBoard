import React, { useState } from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";

export const RenderBingoBoard = ({
    markedNumbers,
    setMarkedNummbers,
    lastNumbers,
    setLastNumbers,
}) => {
    const handleNumberClick = (number) => {
        if (markedNumbers.includes(number)) {
            setMarkedNummbers(markedNumbers.filter((n) => n !== number));
        } else {
            setMarkedNummbers([...markedNumbers, number]);
            setLastNumbers([number, ...lastNumbers.slice(0, 2)]);
        }
    };

    const letters = ["B", "I", "N", "G", "O"];
    return (
        <>
            {letters.map((letter, letterIndex) => (
                <div className={generalStyles.bingoLetterContainer} key={letter}>
                    <div className={generalStyles.bingoLetterContainer_letter}>{letter}</div>
                    {Array.from({ length: 15 }, (_, i) => i + 1 + letterIndex * 15).map(
                        (number, i) => (
                            <button
                                key={i}
                                className={
                                    markedNumbers.includes(number)
                                        ? generalStyles.destructive + " " + generalStyles.numberBtn
                                        : generalStyles.outline + " " + generalStyles.numberBtn
                                }
                                onClick={() => handleNumberClick(number)}
                            >
                                {number}
                            </button>
                        )
                    )}
                </div>
            ))}
        </>
    );
};
