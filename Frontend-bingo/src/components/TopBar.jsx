import React from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";

export const TopBar = ({ markedNumbers, lastNumbers, juega, setJuega, letter }) => {
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
                        <h2>¡Gran Bingo!, Parroquia San Martín de Porres</h2>
                        <p>
                            “El Señor es justo en todos sus caminos y bondadoso en todas sus obras.”
                            - Salmo 145:17
                        </p>
                    </div>
                    <h2 className={generalStyles.bannerJuega}>
                        {letter.length === 1 ? "Juega letra" : "Tabla"}
                        <span> {letter} </span>
                    </h2>
                </div>
            </div>

            <button className={generalStyles.btnJuega} onClick={() => setJuega(!juega)}>
                Juega letra ?
            </button>
        </nav>
    );
};
