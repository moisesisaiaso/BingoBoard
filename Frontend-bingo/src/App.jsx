import { useState } from "react";
import generalStyles from "./assets/styles/generalStyles.module.css";
import { TopBar } from "./components/TopBar";
import { RenderBingoBoard } from "./components/RenderBingoBoard";
import { RenderLetter } from "./components/RenderLetter";
import { ModalPush } from "./components/ModalPush";
import { ModalVerify } from "./components/ModalVerify";

import banner from "./assets/icons/banner1.png";
import foco from "./assets/icons/foco.png";
import question from "./assets/icons/question.png";
import telephone from "./assets/icons/telephone.png";
import email from "./assets/icons/email.png";

import { ModalBanner } from "./components/ModalBanner";
import { ModalGameBoards } from "./components/ModalGameBoards";

function App() {
    // numeros que han salido
    const [markedNumbers, setMarkedNummbers] = useState([]);

    // ultima letra del ultimo numero y tres ultimos numeros
    const [lastLetter, setLastLetter] = useState([]);
    const [lastNumbers, setLastNumbers] = useState([]);

    // capa de opacidad y modal
    const [opacityLayer, setOpacityLayer] = useState(false);
    const [modal, setModal] = useState();

    // mensaje de banner publicitario
    const [mainMessage, setMainMessage] = useState("¡Gran Bingo!, Parroquia San Martín de Porres");
    const [secundaryMessage, setSecundaryMessage] = useState(
        " 'El Señor es justo en todos sus caminos y bondadoso en todas sus obras.' - Salmo 145:17"
    );

    // letra que se juega
    const [letter, setLetter] = useState("");

    // captura de accion click en RenderBingoBoard
    const [captureClick, setCaptureClick] = useState(false);

    // tabla ganadora
    const [tablaGanadora, setTablaGanadora] = useState(0);

    // numero aleatorio
    const [random, setRandom] = useState(false);

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
                    setOpacityLayer={setOpacityLayer}
                    setModal={setModal}
                    letter={letter}
                    mainMessage={mainMessage}
                    secundaryMessage={secundaryMessage}
                />
            </div>
            <header>
                <div className={generalStyles.promotion}>
                    {/* boton del banner */}
                    <img
                        src={banner}
                        alt=""
                        onClick={() => {
                            setOpacityLayer(true);
                            setModal("banner");
                        }}
                        className={generalStyles.promotionBtn}
                    />

                    {/* boton del foco */}
                    <img
                        src={foco}
                        alt=""
                        className={generalStyles.foco}
                        onClick={() => {
                            setOpacityLayer(true);
                            setModal("gameBoards");
                        }}
                    />
                </div>

                <h1>TABLERO DE BINGO</h1>

                <div className={generalStyles.btnsAction}>
                    <button className={generalStyles.btnClear} onClick={handleClearBoard}>
                        LIMPIAR
                    </button>
                    <button
                        className={generalStyles.btnVerify}
                        onClick={() => {
                            setOpacityLayer(true);
                            setModal("verify");
                        }}
                    >
                        VERIFICAR
                    </button>
                    <button className={generalStyles.btnPlay} onClick={() => setRandom(true)}>
                        ALEATORIO
                    </button>
                </div>
            </header>

            {/* renderizado del tablero */}
            <section>
                <div className={generalStyles.containerBoard}>
                    <RenderBingoBoard
                        markedNumbers={markedNumbers}
                        setMarkedNummbers={setMarkedNummbers}
                        setLastLetter={setLastLetter}
                        lastNumbers={lastNumbers}
                        setLastNumbers={setLastNumbers}
                        setCaptureClick={setCaptureClick}
                        random={random}
                        setRandom={setRandom}
                    />
                </div>
            </section>

            {/* modal juega letra */}
            <RenderLetter
                modal={modal}
                setModal={setModal}
                opacityLayer={opacityLayer}
                setOpacityLayer={setOpacityLayer}
                letter={letter}
                setLetter={setLetter}
            />

            {/* modal Push */}
            <ModalPush lastLetter={lastLetter} lastNumbers={lastNumbers} />

            {/* modal Verify */}
            <section
                className={
                    modal !== "verify" || !opacityLayer
                        ? generalStyles.modal
                        : generalStyles.modal + " " + generalStyles.modalActive
                }
            >
                <div className={generalStyles.modal_header}>
                    <div className={generalStyles.modal_top}>
                        <span>Verifica la tabla </span>
                        <button
                            className={generalStyles.modalClose}
                            onClick={() => {
                                setOpacityLayer(false); //cierra la capa de opacidad
                                setModal(""); // cierra el modal
                            }}
                        >
                            X
                        </button>
                    </div>
                    {/* Component */}
                    <ModalVerify
                        markedNumbers={markedNumbers}
                        captureClick={captureClick}
                        setCaptureClick={setCaptureClick}
                        setTablaGanadora={setTablaGanadora}
                    />
                </div>
            </section>

            {/* modal banner promocion */}
            <ModalBanner
                modal={modal}
                setModal={setModal}
                opacityLayer={opacityLayer}
                setOpacityLayer={setOpacityLayer}
                mainMessage={mainMessage}
                secundaryMessage={secundaryMessage}
                setMainMessage={setMainMessage}
                setSecundaryMessage={setSecundaryMessage}
            />

            {/* modal tablas de juego */}
            <ModalGameBoards
                modal={modal}
                setModal={setModal}
                setOpacityLayer={setOpacityLayer}
                markedNumbers={markedNumbers}
                captureClick={captureClick}
                setCaptureClick={setCaptureClick}
                tablaGanadora={tablaGanadora}
                setTablaGanadora={setTablaGanadora}
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

            {/* capa de opacidad para el fondo de los modals */}
            <div
                className={
                    !opacityLayer
                        ? generalStyles.layerOpacity
                        : generalStyles.layerOpacity + " " + generalStyles.active
                }
                onClick={() => setOpacityLayer(false)}
            ></div>
        </main>
    );
}

export default App;
