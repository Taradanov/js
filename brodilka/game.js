'use strict';

const settings = {
    rowCount: 10,
    colsCount: 10,
    startPositionX: 1,
    startPositionY: 2,
    startDirection: 'right',
    stepsInSecond: 5,
    playerCellColor: '#AA3333',
    emptyCellColor: '#EEEEEE'
};

const player = {
    x: null,
    y: null,
    direction: null,

    init(startX, startY, startDirection) {
        this.x = startX;
        this.y = startY;
        this.direction = startDirection;

    },
    makeStep() {
        const nextPoint = this.getNextStepPonint();

        this.x = nextPoint.x;
        this.y = nextPoint.y;

    },
    getNextStepPonint() {
        const point = {
            x: this.x,
            y: this.y,
        }
        switch (this.direction) {
            case 'up':
                point.y--;
                break;
            case 'right':
                point.x++;
                break;
            case 'down':
                point.y++;
                break;
            case 'left':
                point.x--;
                break;
        }
        return point;
    },
    setDirection(direction) {
        this.direction = direction;
    }
}

const game = {
    player,
    settings,
    containerElement: null,
    cellElements: null,
    run() {
        this.init();
        this.render();
        setInterval(() => {
            if (this.canPlayerMakeStep()) {
                this.player.makeStep();
                this.render();
            }
        }, 1000/this.settings.stepsInSecond);

    },
    init() {
        this.player.init(this.settings.startPositionX, this.settings.startPositionY, this.settings.startDirection);
        this.containerElement = document.getElementById('game');
        this.initCells();
        this.initEventHandlers();
    },

    initCells() {
        this.containerElement.innerHTML = '';
        this.cellElements = [];
        for (let row = 0; row < this.settings.rowCount; row++) {
            const trElem = document.createElement('tr');
            this.containerElement.appendChild(trElem);
            for (let col = 0; col < this.settings.colsCount; col++) {
                const cell = document.createElement('td');
                this.cellElements.push(cell);
                trElem.appendChild(cell);
            }
        }
    },

    initEventHandlers() {
        document.addEventListener('keydown',event => this.keyDownHandler(event))
    },
    keyDownHandler(event){
        console.log(event)
        switch (event.code) {
            case 'KeyW':
            case 'ArrowUp':
                return this.player.setDirection('up');
            case 'KeyS':
            case 'ArrowDown':
                return this.player.setDirection('down');
            case 'KeyA':
            case 'ArrowLeft':
                return this.player.setDirection('left');
            case 'KeyD':
            case 'ArrowRight':
                return this.player.setDirection('right');

        }
    },

    render() {
        this.cellElements.forEach(cell => cell.style.backgroundColor = this.settings.emptyCellColor)
        const playerCell = document.querySelector(`tr:nth-child(${this.player.y + 1})`)
            .querySelector(`td:nth-child(${this.player.x + 1})`);
        playerCell.style.backgroundColor = this.settings.playerCellColor
    },
    canPlayerMakeStep() {
        const nextPoint = this.player.getNextStepPonint();
        return nextPoint.x >= 0
            && nextPoint.x < this.settings.colsCount
            && nextPoint.y >= 0
            && nextPoint.y < this.settings.rowCount
    }
}

window.addEventListener('load', () => game.run());