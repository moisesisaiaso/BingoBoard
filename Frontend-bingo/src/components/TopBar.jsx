import React from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";

export const TopBar = ({ markedNumbers, lastNumbers, juega, setJuega }) => {
    return (
        <nav className={generalStyles.topBar}>
            <div className={generalStyles.lastNumbers}>
                {[...Array(3)].map((_, i) => (
                    <div className={generalStyles.lastNumbers_number} key={i}>
                        {markedNumbers.includes(lastNumbers[i]) ? lastNumbers[i] : ""}
                    </div>
                ))}
            </div>

            <button className={generalStyles.btnJuega} onClick={() => setJuega(!juega)}>
                Juega
            </button>
        </nav>
    );
};
