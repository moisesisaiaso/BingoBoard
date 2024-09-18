import React from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";
import TextField from "@mui/material/TextField";

export const ModalBanner = ({
    bannerEdit,
    setBannerEdit,
    mainMessage,
    secundaryMessage,
    setMainMessage,
    setSecundaryMessage,
}) => {
    const handleClear = () => {
        setMainMessage("");
        setSecundaryMessage("");
    };

    return (
        <section
            className={
                !bannerEdit
                    ? generalStyles.modal
                    : generalStyles.modal + " " + generalStyles.modalActive
            }
            style={{ minHeight: "26rem ", top: "calc(50vh - 13rem)" }}
        >
            <div className={generalStyles.modal_header}>
                <div className={generalStyles.modal_top}>
                    <span>Banner Publicitario</span>
                    <button
                        className={generalStyles.modalClose}
                        onClick={() => setBannerEdit(false)}
                    >
                        X
                    </button>
                </div>
                <button
                    className={generalStyles.modalBtn + " " + generalStyles.modalBtnsActions}
                    onClick={() => handleClear()}
                >
                    Limpiar
                </button>
                <div className={generalStyles.modalOptionsBtn} style={{ width: "100%" }}>
                    <form style={{ width: "100%" }}>
                        <TextField
                            id="principal"
                            label="Mensaje principal"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            className={generalStyles.bannerInput}
                            value={mainMessage}
                            onChange={(e) => setMainMessage(e.target.value)}
                        />

                        <TextField
                            id="secundario"
                            label="Mensaje secundario"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            className={generalStyles.bannerInput}
                            value={secundaryMessage}
                            onChange={(e) => setSecundaryMessage(e.target.value)}
                        />
                    </form>
                </div>
            </div>
        </section>
    );
};
