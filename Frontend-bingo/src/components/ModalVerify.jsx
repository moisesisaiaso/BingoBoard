import React, { useEffect, useState } from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";

import confetti from "canvas-confetti";

export const ModalVerify = ({
    markedNumbers,
    captureClick,
    setCaptureClick,
    setTablaGanadora,
    tableNumber,
}) => {
    const [optionsBtn, setOptionsBtn] = useState("verificar");

    const [duplicates, setDuplicates] = useState(false);

    const [edit, setEdit] = useState(false);

    const [bloquesBtn, setBloquesBtn] = useState(
        Array(25)
            .fill(true)
            .map((_, i) => (i === 12 ? "FREE" : true))
    );

    const [tableNumbers, setTableNumbers] = useState(Array(25).fill(""));

    //^ animacion de confeti Bingo
    const handleConfeti = (newBloquesBtn) => {
        const tieneNumero = tableNumbers.some((element) => typeof element === "number");
        if (!newBloquesBtn.includes(false) && tieneNumero) {
            // Mando el numero de la tabla ganadora
            setTablaGanadora(tableNumber);

            // animacion de confeti
            const intervalId = setInterval(() => {
                confetti({
                    particleCount: 300,
                    spread: 160,
                    origin: { y: 0.6 },
                });
            }, 800);

            setTimeout(() => {
                clearInterval(intervalId);
            }, 5000);
        }
    };

    //^  verificar - editar
    const handleAction = (action) => {
        const newTableNumbers = [...tableNumbers].filter((number) => number !== "");

        //verificar si se repiten los numeros
        const hasDuplicates = new Set(newTableNumbers).size !== newTableNumbers.length;
        // El objeto Set solo almacena valores únicos, por lo que puedes comparar la longitud del array original con la longitud del Set para determinar si hay duplicados.

        if (hasDuplicates) {
            setDuplicates(true);
            return;
        }
        setDuplicates(false);

        if (action === "verificar") {
            const newBloquesBtn = [...bloquesBtn];

            tableNumbers.forEach((number, i) => {
                if (number) {
                    const exists = markedNumbers.includes(number);

                    newBloquesBtn[i] = exists;
                }
            });

            setBloquesBtn(newBloquesBtn);
            handleConfeti(newBloquesBtn);
            // cambia a editar
            setOptionsBtn("editar");
            setEdit(true);
            setCaptureClick(false);
        } else if (action === "editar") {
            setBloquesBtn(bloquesBtn.map((_, i) => (1 === 12 ? "FREE" : true)));

            //cambia a verificar
            setOptionsBtn("verificar");
            setEdit(false);
        }
    };

    useEffect(() => {
        captureClick && handleAction("verificar");
    }, [captureClick]);

    //^ captura de numeros
    const handleOnChange = (i, event) => {
        const newTableNumbers = [...tableNumbers];
        const { value } = event.target;

        value ? (newTableNumbers[i] = parseInt(value)) : (newTableNumbers[i] = "");

        setTableNumbers(newTableNumbers);
    };

    //^ limpiar
    const handleClear = () => {
        setTableNumbers(Array(25).fill(""));
        setOptionsBtn("verificar");
        setEdit(false);
        setBloquesBtn(bloquesBtn.map((_, i) => (1 === 12 ? "FREE" : true)));
    };

    return (
        <>
            <h6 className={generalStyles.modal_verificarValidation}>
                {duplicates && "!Número duplicado!"}
            </h6>
            <div className={generalStyles.modalOptionsBtn}>
                {optionsBtn === "verificar" ? (
                    <button
                        className={generalStyles.modalBtn + " " + generalStyles.modalBtnsActions}
                        onClick={() => handleAction("verificar")}
                    >
                        Verificar
                    </button>
                ) : (
                    <button
                        className={generalStyles.modalBtn + " " + generalStyles.modalBtnsActions}
                        onClick={() => handleAction("editar")}
                    >
                        Editar
                    </button>
                )}

                <button
                    className={generalStyles.modalBtn + " " + generalStyles.modalBtnsActions}
                    onClick={() => handleClear()}
                >
                    Limpiar
                </button>
            </div>

            <div className={generalStyles.bloquesBtnContainer}>
                {bloquesBtn.map((bloque, i) =>
                    i === 12 ? (
                        <input
                            type="text"
                            key={i}
                            className={generalStyles.bloquesBtn}
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
                                !bloque
                                    ? generalStyles.bloquesBtn + " " + generalStyles.destructive
                                    : generalStyles.bloquesBtn + " " + generalStyles.outline
                            }
                            value={tableNumbers[i]}
                            disabled={edit}
                            onChange={(event) => handleOnChange(i, event)}
                            style={
                                edit && bloque && tableNumbers[i] !== ""
                                    ? {
                                          backgroundColor: "#83DD80",
                                          border: "1px solid #83DD80",
                                      }
                                    : tableNumbers[i] === ""
                                    ? {
                                          backgroundColor: "#e4e4e7",
                                          border: "1px solid #e4e4e7",
                                      }
                                    : {}
                            }
                        />
                    )
                )}
            </div>
        </>
    );
};
