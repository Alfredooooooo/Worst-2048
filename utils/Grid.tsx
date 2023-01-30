const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;

export default class Grid {
    private _cells;
    private _score;
    private _scores;
    private _scoreBoard;

    constructor(gridElement: any) {
        gridElement.style.setProperty('--grid-size', GRID_SIZE);
        gridElement.style.setProperty('--cell-size', `${CELL_SIZE}vmin`);
        gridElement.style.setProperty('--cell-gap', `${CELL_GAP}vmin`);
        this._cells = createCellElements(gridElement).map((_, index) => {
            return new Cell(index % GRID_SIZE, Math.floor(index / GRID_SIZE));
        });
        this._scoreBoard = document.getElementById('score-show');
        this._score = document.getElementById('score');
        this._scores = 0;
    }

    get cells() {
        return this._cells;
    }

    get scoreBoard() {
        return this._scoreBoard;
    }

    get score() {
        return this._score;
    }

    get scores() {
        return this._scores;
    }

    set scores(value) {
        this._scores = value;
    }

    get cellsByRow() {
        return this._cells.reduce((cellGrid: any[], cell) => {
            cellGrid[cell.y] = cellGrid[cell.y] || [];
            cellGrid[cell.y][cell.x] = cell;
            return cellGrid;
        }, []);
    }

    get cellsByColumn() {
        return this._cells.reduce((cellGrid: any[], cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || [];
            cellGrid[cell.x][cell.y] = cell;
            return cellGrid;
        }, []);
    }

    private get _emptyCells() {
        return this._cells.filter((cell) => cell.tile == null);
    }

    randomEmptyCell() {
        const randomIndex = Math.floor(Math.random() * this._emptyCells.length);
        return this._emptyCells[randomIndex];
    }
}

class Cell {
    private _x;
    private _y;
    private _tile: any;
    private _mergeTile: any;

    constructor(x: any, y: any) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get tile() {
        return this._tile;
    }

    set tile(value) {
        this._tile = value;
        if (value == null) return;
        this._tile.x = this._x;
        this._tile.y = this._y;
    }

    get mergeTile() {
        return this._mergeTile;
    }

    set mergeTile(value) {
        this._mergeTile = value;
        if (value == null) return;
        this._mergeTile.x = this._x;
        this._mergeTile.y = this._y;
    }

    canAccept(tile: any) {
        return (
            this.tile == null ||
            (this.mergeTile == null && this.tile.value === tile.value)
        );
    }

    mergeTiles(grid: any) {
        if (this.tile == null || this.mergeTile == null) return;
        this.tile.value = this.tile.value + this.mergeTile.value;
        this.mergeTile.remove();
        this.mergeTile = null;
        grid.scores += this.tile.value;
        grid.score.textContent = grid.scores;
        const toShow = document.createElement('div');
        toShow.classList.add('score-animate');
        toShow.textContent = `+${this.tile.value}`;
        grid.scoreBoard.prepend(toShow);

        grid.scoreBoard.addEventListener(
            'animationend',
            () => {
                toShow.remove();
            },
            { once: true }
        );
    }
}

function createCellElements(gridElement: any) {
    const cells = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cells.push(cell);
        gridElement.append(cell);
    }
    return cells;
}
