import './index.html';
import './index.scss';
// import '../node_modules/swiper/swiper-bundle.min.css';
// import MySwiper from './swiper.js';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
const domNode = document.getElementById('root');
const root = createRoot(domNode);

const App = () => {

    const SYMBOL_X = 'X';
    const SYMBOL_O = 'O';

    const [cells, setCells] = useState([null, null, null, null, null, null, null, null, null]);
    const [currentStep, setCurrentStep] = useState(SYMBOL_X);

    const getSymbolClassName = (symbol) => {
        if (symbol === SYMBOL_O) return 'symbol--o';
        if (symbol === SYMBOL_X) return 'symbol--x';
        return '';
    }

    const renderSymbol = (symbol) => <span className={`symbol ${getSymbolClassName(symbol)}`}>{symbol}</span>
    const putSymbol = (itemCell) => {
        if (cells[itemCell]) {
            return;
        } else {
            let copyCell = cells;
            copyCell[itemCell] = currentStep;
            setCells(copyCell);
            const copyCellsWithoutNull = copyCell.map( (item, index) => item == null ? index : item );

            if ((copyCellsWithoutNull[0] == copyCellsWithoutNull[1] && copyCellsWithoutNull[1] == copyCellsWithoutNull[2]) ||
                (copyCellsWithoutNull[3] == copyCellsWithoutNull[4] && copyCellsWithoutNull[4] == copyCellsWithoutNull[5]) ||
                (copyCellsWithoutNull[6] == copyCellsWithoutNull[7] && copyCellsWithoutNull[7] == copyCellsWithoutNull[8]) ||
                (copyCellsWithoutNull[0] == copyCellsWithoutNull[3] && copyCellsWithoutNull[3] == copyCellsWithoutNull[6]) ||
                (copyCellsWithoutNull[1] == copyCellsWithoutNull[4] && copyCellsWithoutNull[4] == copyCellsWithoutNull[7]) ||
                (copyCellsWithoutNull[2] == copyCellsWithoutNull[5] && copyCellsWithoutNull[5] == copyCellsWithoutNull[8]) ||
                (copyCellsWithoutNull[0] == copyCellsWithoutNull[4] && copyCellsWithoutNull[4] == copyCellsWithoutNull[8]) ||
                (copyCellsWithoutNull[2] == copyCellsWithoutNull[5] && copyCellsWithoutNull[5] == copyCellsWithoutNull[6])) {
                    alert(currentStep + ' is win!')
                }

            
            currentStep == SYMBOL_X ? setCurrentStep(SYMBOL_O) : setCurrentStep(SYMBOL_X);

        }
    }

    return (
        <div className="game">
            <div className="game-info">
                Ход: {renderSymbol(currentStep)}
            </div>
            <div className="game-field">
                {cells.map((symbol, index) => {
                    return <button onClick={() => putSymbol(index)} key={index} className="cell">{symbol ? renderSymbol(symbol) : null}</button>
                })}
            </div>
        </div>
    )

}

root.render(<App />)