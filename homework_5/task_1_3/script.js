'use strict'

//Делал сам.

let letters = 'ABCDEFGH';

const settings = {
    rowCount: 10,
    colsCount: 10,
};

const figures = {
    // массив с фигурами
    figuresArr: [],
    init() {
        // А теперь берем каждую фигуру пальчиками и ставим на доску
        //пешки
        for (let i = 1; i < 9; i++) {
            this.addFigure('cell' + letters[i - 1] + 7, '&#9823')
            this.addFigure('cell' + letters[i - 1] + 2, '&#9817')
        }
        // короли ферзи
        this.addFigure('cellD8', '&#9818')
        this.addFigure('cellD1', '&#9812')
        // this.addFigure('cell', '&#')
        this.addFigure('cellE8', '&#9819')
        this.addFigure('cellE1', '&#9813')

        //Ладьи кони слоны
        this.addFigure('cellC8', '&#9821')
        this.addFigure('cellF8', '&#9821')
        this.addFigure('cellC1', '&#9815')
        this.addFigure('cellF1', '&#9815')

        this.addFigure('cellB8', '&#9822')
        this.addFigure('cellG8', '&#9822')
        this.addFigure('cellB1', '&#9816')
        this.addFigure('cellG1', '&#9816')

        this.addFigure('cellA8', '&#9820')
        this.addFigure('cellH8', '&#9820')
        this.addFigure('cellA1', '&#9814')
        this.addFigure('cellH1', '&#9814')

    },
    addFigure(cell, figure) {
        this.figuresArr.push({cell: cell, figure: figure});
    }
}
const descriptions = {
    //массив описаний ячеек с буквами и цифрами
    descriptionArr: [],
    init() {
        for (let i = 1; i < 9; i++) {
            this.descriptionArr.push({cell: `cell${i}`, figure: i,})
        }
        for (let i = 1; i < 9; i++) {
            this.descriptionArr.push({cell: `cell${'' + letters[i - 1] + 0}`, figure: letters[i - 1],})
            this.descriptionArr.push({cell: `cell${'' + letters[i - 1] + 9}`, figure: letters[i - 1],})
        }
    }
}

const board = {
    settings,
    figures,
    descriptions: descriptions,
    containerElement: null,
    showBoard() {
        this.containerElement.innerHTML = '';
        for (let row = this.settings.rowCount - 1; row >= 0; row--) {
            const trElem = document.createElement('tr');
            this.containerElement.appendChild(trElem);
            for (let col = 0; col < this.settings.colsCount; col++) {
                const cell = document.createElement('td');
                if ((row > 0 && row < 9 && col > 0 && col < 9)
                    && (row % 2 === 1 && col % 2 === 0 || row % 2 === 0 && col % 2 === 1)) {
                    cell.classList.add('blackCell')
                }
                cell.classList.add(`cell${'' + (letters[col - 1] === undefined ? '' : letters[col - 1]) + row}`);
                cell.classList.add('cell')
                trElem.appendChild(cell);
            }
        }
    },
    init() {
        this.containerElement = document.getElementById('board');
        this.showBoard();
        this.descriptions.init();
        this.figures.init();
        this.showDescriptions();
        this.showFigures();

    },

    showFigures() {
        this.showElements(this.figures.figuresArr)
    },
    showDescriptions() {
        this.showElements(this.descriptions.descriptionArr)
    },

    showElements(figures) {
        for (let i = 0; i < figures.length; i++) {
            const cells = document.getElementsByClassName(figures[i].cell);
            for (let j = 0; j < cells.length; j++) {
                cells[j].innerHTML = figures[i].figure;
            }
        }

    }
}

window.addEventListener('load', () => board.init());