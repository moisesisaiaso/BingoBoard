import React, { useState, useRef } from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";
import TextField from "@mui/material/TextField";
import { ModalVerify } from "./ModalVerify";

export const ModalGameBoards = ({
    modal,
    setModal,
    setOpacityLayer,
    markedNumbers,
    captureClick,
    setCaptureClick,
    tablaGanadora,
    setTablaGanadora,
}) => {
    const [numTables, setNumTables] = useState(0);
    const [isNumber, setIsNumber] = useState(true);
    const inputTablas = useRef(0);

    const handleNumTables = () => {
        const { value } = inputTablas.current;
        console.log(value);
        const parseValue = parseInt(value);

        //* cuando ingresamos numeros con letras
        // La función parseInt intenta convertir el valor a un número hasta que encuentra un carácter no numérico. Por ejemplo, parseInt("123abc") devolverá 123, lo cual es un valor numérico y, por lo tanto, tu condición if (parseValue) se evalúa como verdadera.

        if (parseValue) {
            setIsNumber(true);
            setNumTables(parseValue);
        } else {
            setIsNumber(false);
        }
    };

    return (
        <section
            className={
                modal !== "gameBoards"
                    ? generalStyles.modalGameBoards
                    : generalStyles.modalGameBoards + " " + generalStyles.modalGameActive
            }
        >
            <section className={generalStyles.gameBoards_header}>
                <div className={generalStyles.modal_top}>
                    <span>Tablas de Juego</span>
                    <button
                        className={generalStyles.modalClose}
                        onClick={() => {
                            setOpacityLayer(false);
                            setModal("");
                        }}
                        style={{ color: "black" }}
                    >
                        X
                    </button>
                </div>
                <h6 className={generalStyles.modal_verificarValidation}>
                    {!isNumber && "⚠️ Solo se permiten números"}
                </h6>
                {tablaGanadora && (
                    <h6>{tablaGanadora && `La tabla ganadora es la N# ${tablaGanadora}`}</h6>
                )}

                <div className={generalStyles.gameAction}>
                    <div className={generalStyles.gameAction_agregar}>
                        <TextField
                            id="nTablas"
                            label="Cantidad de tablas"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            className={
                                generalStyles.bannerInput + " " + generalStyles.GameAction_input
                            }
                            defaultValue={numTables}
                            inputRef={inputTablas} // para este tipo de componente Cambia ref por inputRef
                        />
                        <button
                            className={
                                generalStyles.gameAction_clear +
                                " " +
                                generalStyles.modalBtnsActions
                            }
                            onClick={handleNumTables}
                            style={{ width: "8.5rem" }}
                        >
                            Agregar
                        </button>
                    </div>

                    <button
                        className={
                            generalStyles.gameAction_clear + " " + generalStyles.modalBtnsActions
                        }
                        onClick={() => setNumTables(0)}
                    >
                        Borrar tablas
                    </button>
                </div>
            </section>
            <section className={generalStyles.gameBoards_body}>
                {[...Array(numTables)].map((_, i) => (
                    <div className={generalStyles.game_verifyBoard} key={i}>
                        <h3>Tabla N# {i + 1}</h3>
                        <ModalVerify
                            markedNumbers={markedNumbers}
                            captureClick={captureClick}
                            setCaptureClick={setCaptureClick}
                            tableNumber={i + 1}
                            setTablaGanadora={setTablaGanadora}
                        />
                    </div>
                ))}
            </section>
        </section>
    );
};
