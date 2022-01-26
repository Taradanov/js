'use strict'

const settings = {
    rowCount: 10,
    colsCount: 10,

    blackCellColor: '#051428',
    whiteCellColor: '#c6cffa'
};
const figures = {
    figuresArr: [],
    init() {
    }
}
const desccriptions = {
    descriptionArr: [],
    init() {
        let letters = 'abcdefgh';
        for (let i = 1; i < 9; i++) {
            this.descriptionArr.push({cell: `cell${'0' + i}`, figure: i,})
            this.descriptionArr.push({cell: `cell${'9' + i}`, figure: i,})
        }
        for (let i = 1; i < 9; i++) {
            this.descriptionArr.push({cell: `cell${'' + i + 0}`, figure:letters[i - 1] ,})
            this.descriptionArr.push({cell: `cell${'' + i + 9}`, figure:letters[i - 1] ,})
        }
    }
}

const board = {
    settings,
    figures,
    desccriptions,
    containerElement: null,
    showBoard() {
        this.containerElement.innerHTML = '';
        this.cellElements = [];
        for (let row = 0; row < this.settings.rowCount; row++) {
            const trElem = document.createElement('tr');
            this.containerElement.appendChild(trElem);
            for (let col = 0; col < this.settings.colsCount; col++) {
                const cell = document.createElement('td');
                if ((row > 0 && row < 9 && col > 0 && col < 9)
                    && (row % 2 === 1 && col % 2 === 0 || row % 2 === 0 && col % 2 === 1)) {
                    cell.classList.add('blackCell')
                }
                cell.classList.add(`cell${'' + col + row}`);
                this.cellElements.push(cell);
                trElem.appendChild(cell);
            }
        }
    },
    init() {
        this.containerElement = document.getElementById('board');
        this.showBoard();
        this.figures.init();
        this.desccriptions.init();
        this.showDescriptions();
        this.showFigures()

    },

    showFigures() {
        this.showElements(this.figures.figuresArr)
    },
    showDescriptions() {
        this.showElements(this.desccriptions.descriptionArr)
    },

    showElements(figures) {
        for (let i = 0; i < figures.length; i++) {
            const cell = document.getElementsByClassName(figures[i].cell);
            cell[0].innerHTML = figures[i].figure;
        }

    }
}

window.addEventListener('load', () => board.init());