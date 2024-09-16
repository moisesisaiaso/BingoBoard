import React, { useEffect, useState } from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";

export const RenderLetter = ({ juega, setJuega, letter, setLetter }) => {
    const letters = ["B", "I", "N", "G", "O", "Completa", "Otra"];

    const [bloquesBtn, setBloquesBtn] = useState(
        Array(25)
            .fill(false)
            .map((_, i) => (i === 12 ? "FREE" : false))
    );

    const handleBloqueClick = (index) => {
        const newBloquesBtn = [...bloquesBtn];
        newBloquesBtn[index] = bloquesBtn[index] ? false : true;

        setBloquesBtn(newBloquesBtn);
    };

    useEffect(() => {
        const newBloquesBtn =
            letter === "Completa"
                ? bloquesBtn.map((_, i) => (i === 12 ? "FREE" : true))
                : bloquesBtn.map((_, i) => (i === 12 ? "FREE" : false));

        setBloquesBtn(newBloquesBtn);
    }, [letter]);

    return (
        <section
            className={
                !juega ? generalStyles.modal : generalStyles.modal + " " + generalStyles.modalActive
            }
        >
            <div className={generalStyles.modal_header}>
                <div className={generalStyles.modal_top}>
                    <span>{letter.length > 1 ? letter : `Letra ${letter}`}</span>
                    <button className={generalStyles.modalClose} onClick={() => setJuega(false)}>
                        X
                    </button>
                </div>
                <div className={generalStyles.modalOptionsBtn}>
                    {letters.map((letra) =>
                        letra !== "Otra" ? (
                            <button
                                key={letra}
                                className={
                                    letter === letra
                                        ? generalStyles.modalBtn +
                                          " " +
                                          generalStyles.modalBtnActive
                                        : generalStyles.modalBtn
                                }
                                onClick={() => setLetter(letra)}
                            >
                                {letra}
                            </button>
                        ) : (
                            <input
                                key={letra}
                                className={
                                    letter === letra
                                        ? generalStyles.modalBtn +
                                          " " +
                                          generalStyles.modalBtnActive
                                        : generalStyles.modalBtn
                                }
                                onChange={(e) => setLetter(e.target.value.toUpperCase())}
                                style={{ maxWidth: "4.1rem", backgroundColor: "#eab308" }}
                            />
                        )
                    )}
                </div>

                <div className={generalStyles.bloquesBtnContainer}>
                    {bloquesBtn.map((bloque, i) => (
                        <button
                            key={i}
                            className={
                                bloque
                                    ? generalStyles.bloquesBtn + " " + generalStyles.destructive
                                    : generalStyles.bloquesBtn + " " + generalStyles.outline
                            }
                            onClick={() => handleBloqueClick(i)}
                            disabled={i === 12}
                            style={i === 12 ? { opacity: "0.6" } : {}}
                        >
                            {i === 12 ? "FREE" : ""}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};
