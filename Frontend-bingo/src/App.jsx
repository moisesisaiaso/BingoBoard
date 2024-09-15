import { useState } from "react";
import generalStyles from "./assets/styles/generalStyles.module.css";
import { TopBar } from "./components/TopBar";
import { RenderBingoBoard } from "./components/RenderBingoBoard";
import { RenderLetter } from "./components/RenderLetter";
import { ModalPush } from "./components/ModalPush";

function App() {
    const [markedNumbers, setMarkedNummbers] = useState([]);
    const [lastNumbers, setLastNumbers] = useState([]);
    const [juega, setJuega] = useState(false);

    const handleClearBoard = () => {
        setMarkedNummbers([]);
        setLastNumbers([]);
    };

    return (
        <main>
            <div className={generalStyles.barContainer}>
                <TopBar
                    markedNumbers={markedNumbers}
                    lastNumbers={lastNumbers}
                    juega={juega}
                    setJuega={setJuega}
                />
            </div>
            <header>
                <h1>TABLERO DE BINGO</h1>
                <button className={generalStyles.btnClear} onClick={handleClearBoard}>
                    LIMPIAR
                </button>
            </header>
            <section>
                <div className={generalStyles.containerBoard}>
                    <RenderBingoBoard
                        markedNumbers={markedNumbers}
                        setMarkedNummbers={setMarkedNummbers}
                        lastNumbers={lastNumbers}
                        setLastNumbers={setLastNumbers}
                    />
                </div>
            </section>
            {/* modal JUEGA */}
            <RenderLetter juega={juega} setJuega={setJuega} />

            {/* modal Push */}
            <ModalPush lastNumbers={lastNumbers} />
            <footer>
                <p>&copy; DESARROLLADO POR MOISES ISAIAS ORTIZ GRACIA</p>
            </footer>
            <div
                className={
                    !juega
                        ? generalStyles.layerOpacity
                        : generalStyles.layerOpacity + " " + generalStyles.active
                }
                onClick={() => setJuega(!juega)}
            ></div>
        </main>
    );
}

export default App;
