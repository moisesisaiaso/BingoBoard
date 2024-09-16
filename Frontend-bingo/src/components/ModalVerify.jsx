import React, { useState } from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";

export const ModalVerify = ({ verify, setVerify, markedNumbers }) => {
    const [optionsBtn, setOptionsBtn] = useState("verificar");

    const [bloquesBtn, setBloquesBtn] = useState(
        Array(25)
            .fill(false)
            .map((_, i) => (i === 12 ? "FREE" : false))
    );

    const handleAction = (action) => {
        action === "verificar" ? setOptionsBtn("editar") : setOptionsBtn("verificar");
    };

    return (
        <div
            className={
                verify
                    ? generalStyles.modalPushContainer + " " + generalStyles.active
                    : generalStyles.modalPushContainer
            }
        >
            <section
                className={
                    !verify
                        ? generalStyles.modal
                        : generalStyles.modal + " " + generalStyles.modalActive
                }
            >
                <div className={generalStyles.modal_header}>
                    <div className={generalStyles.modal_top}>
                        <span>Verifica la tabla</span>
                        <button
                            className={generalStyles.modalClose}
                            onClick={() => setVerify(false)}
                        >
                            X
                        </button>
                    </div>
                    <div className={generalStyles.modalOptionsBtn}>
                        {optionsBtn === "verificar" ? (
                            <button
                                className={
                                    generalStyles.modalBtn + " " + generalStyles.modalBtnsActions
                                }
                                onClick={() => handleAction("verificar")}
                            >
                                Verificar
                            </button>
                        ) : (
                            <button
                                className={
                                    generalStyles.modalBtn + " " + generalStyles.modalBtnsActions
                                }
                                onClick={() => handleAction("editar")}
                            >
                                Editar
                            </button>
                        )}
                    </div>

                    <div className={generalStyles.bloquesBtnContainer}>
                        {bloquesBtn.map((bloque, i) =>
                            i === 12 ? (
                                <input
                                    type="text"
                                    key={i}
                                    className={
                                        bloque
                                            ? generalStyles.bloquesBtn +
                                              " " +
                                              generalStyles.destructive
                                            : generalStyles.bloquesBtn + " " + generalStyles.outline
                                    }
                                    value={"FREE"}
                                    disabled
                                    style={{
                                        backgroundColor: "#e4e4e7",
                                        border: "1px solid #e4e4e7",
                                        textShadow: "0px 2px 2px white",
                                        letterSpacing: "1px",
                                        color: "black",
                                    }}
                                />
                            ) : (
                                <input
                                    type="text"
                                    key={i}
                                    className={
                                        bloque
                                            ? generalStyles.bloquesBtn +
                                              " " +
                                              generalStyles.destructive
                                            : generalStyles.bloquesBtn + " " + generalStyles.outline
                                    }
                                    onChange={(event) => handleChange(i, event)}
                                />
                            )
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};
