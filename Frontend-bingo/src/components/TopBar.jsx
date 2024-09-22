import React from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";

export const TopBar = ({
    markedNumbers,
    lastNumbers,
    setOpacityLayer,
    setModal,
    letter,
    mainMessage,
    secundaryMessage,
}) => {
    return (
        <nav className={generalStyles.topBar}>
            <div className={generalStyles.lastNumbers}>
                {[...Array(3)].map((_, i) => (
                    <div className={generalStyles.lastNumbers_number} key={i}>
                        {markedNumbers.includes(lastNumbers[i]) ? lastNumbers[i] : ""}
                    </div>
                ))}
            </div>

            {/* Banner Publicitario */}
            <div className={generalStyles.banner}>
                <div className={generalStyles.banner_content}>
                    <div>
                        <h2>{mainMessage}</h2>
                        <p>{secundaryMessage}</p>
                    </div>
                    <h2 className={generalStyles.bannerJuega}>
                        Juega {letter.length === 1 ? "letra" : "Tabla"}
                        <span> {letter} </span>
                    </h2>
                </div>
            </div>

            <button
                className={generalStyles.btnJuega}
                onClick={() => {
                    setOpacityLayer(true);
                    setModal("juegaLetra");
                }}
            >
                Juega letra ?
            </button>
        </nav>
    );
};
