import React, { useEffect, useState } from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";

export const RenderLetter = ({
    modal,
    setModal,
    opacityLayer,
    setOpacityLayer,
    letter,
    setLetter,
}) => {
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
        //  modal !== "juegaLetra" || !opacityLayer   es decir si modal es diferente a el nombre que se espera quiere decir que se cerro con el boton X , o si !opacityLayer es falso quiere decir que se cierra el modal a traves la capa de opacidad al darle click cambia a false
        <section
            className={
                modal !== "juegaLetra" || !opacityLayer // cierran o abren el modal, si se cumple una de las condiciones el modal se cierra, de lo contrario se abre
                    ? generalStyles.modal
                    : generalStyles.modal + " " + generalStyles.modalActive
            }
        >
            <div className={generalStyles.modal_header}>
                <div className={generalStyles.modal_top}>
                    <span>{letter.length > 1 ? letter : `Letra ${letter}`}</span>
                    <button
                        className={generalStyles.modalClose}
                        onClick={() => {
                            setOpacityLayer(false);
                            setModal("");
                        }}
                    >
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
