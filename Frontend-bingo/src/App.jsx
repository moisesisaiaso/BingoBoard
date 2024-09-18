import { useState } from "react";
import generalStyles from "./assets/styles/generalStyles.module.css";
import { TopBar } from "./components/TopBar";
import { RenderBingoBoard } from "./components/RenderBingoBoard";
import { RenderLetter } from "./components/RenderLetter";
import { ModalPush } from "./components/ModalPush";
import { ModalVerify } from "./components/ModalVerify";

import banner from "./assets/icons/banner1.png";
import question from "./assets/icons/question.png";
import telephone from "./assets/icons/telephone.png";
import email from "./assets/icons/email.png";

import { ModalBanner } from "./components/ModalBanner";

function App() {
    const [markedNumbers, setMarkedNummbers] = useState([]);
    const [lastLetter, setLastLetter] = useState([]);
    const [lastNumbers, setLastNumbers] = useState([]);
    const [juega, setJuega] = useState(false);
    const [bannerEdit, setBannerEdit] = useState(false);
    const [mainMessage, setMainMessage] = useState("¡Gran Bingo!, Parroquia San Martín de Porres");
    const [secundaryMessage, setSecundaryMessage] = useState(
        " 'El Señor es justo en todos sus caminos y bondadoso en todas sus obras.' - Salmo 145:17"
    );
    const [letter, setLetter] = useState("");
    const [verify, setVerify] = useState(false);

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
                    letter={letter}
                    mainMessage={mainMessage}
                    secundaryMessage={secundaryMessage}
                />
            </div>
            <header>
                <div className={generalStyles.promotion} onClick={() => setBannerEdit(true)}>
                    <img src={banner} alt="" />
                </div>
                <h1>TABLERO DE BINGO</h1>
                <div className={generalStyles.btnsAction}>
                    <button className={generalStyles.btnClear} onClick={handleClearBoard}>
                        LIMPIAR
                    </button>
                    <button className={generalStyles.btnVerify} onClick={() => setVerify(!verify)}>
                        VERIFICAR
                    </button>
                </div>
            </header>
            <section>
                <div className={generalStyles.containerBoard}>
                    <RenderBingoBoard
                        markedNumbers={markedNumbers}
                        setMarkedNummbers={setMarkedNummbers}
                        setLastLetter={setLastLetter}
                        lastNumbers={lastNumbers}
                        setLastNumbers={setLastNumbers}
                    />
                </div>
            </section>
            {/* modal JUEGA */}
            <RenderLetter juega={juega} setJuega={setJuega} letter={letter} setLetter={setLetter} />

            {/* modal Push */}
            <ModalPush lastLetter={lastLetter} lastNumbers={lastNumbers} />

            {/* modal Verify */}
            <ModalVerify verify={verify} setVerify={setVerify} markedNumbers={markedNumbers} />

            {/* modal banner promocion */}
            <ModalBanner
                bannerEdit={bannerEdit}
                setBannerEdit={setBannerEdit}
                mainMessage={mainMessage}
                secundaryMessage={secundaryMessage}
                setMainMessage={setMainMessage}
                setSecundaryMessage={setSecundaryMessage}
            />

            <footer>
                <span></span>
                <p>&copy; DESARROLLADO POR MOISES ISAIAS ORTIZ GRACIA</p>
                <div className={generalStyles.footerInfo}>
                    <img src={question} alt="" />
                    {/* contactame */}
                    <div className={generalStyles.contact}>
                        <h2>Contáctame</h2>
                        <div>
                            <img src={telephone} alt="" />
                            <span>(+593) 096 971 8160</span>
                        </div>
                        <div>
                            <img src={email} alt="" />
                            <span>moises.ortiz@utelvt.edu.ec</span>
                        </div>
                    </div>
                </div>
            </footer>

            <div
                className={
                    !juega && !bannerEdit
                        ? generalStyles.layerOpacity
                        : generalStyles.layerOpacity + " " + generalStyles.active
                }
                onClick={() => (juega ? setJuega(!juega) : setBannerEdit(false))}
            ></div>
        </main>
    );
}

export default App;
