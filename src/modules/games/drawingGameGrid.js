import DrawingGameTile from "./drawingGameTile";

export default class DrawingGameColorGrid {
    constructor(data) {
        this.colorGrid = [];
        this.updateColorGrid(data);
        this.width = this.colorGrid[0].length > 0 ? this.colorGrid[0].length : 0;
    }

    getList() {
        return this.colorGrid.flat();
    }

    updateColorGrid(colorGrid) {
        this.colorGrid = [];
        for (let y = 0; y < colorGrid.length; y++) {
            let row = [];
            for (let x = 0; x < colorGrid[y].length; x++) {
                row.push(new DrawingGameTile(colorGrid[y][x].color, x, y));
            }
            this.colorGrid.push(row);
        }
        for (let y = 0; y < this.colorGrid.length; y++) {
            for (let x = 0; x < this.colorGrid[y].length; x++) {
                this.colorGrid[y][x].up = y > 0 ? this.colorGrid[y - 1][x] : null;
                this.colorGrid[y][x].down = y < colorGrid.length - 1 ? this.colorGrid[y + 1][x] : null;
                this.colorGrid[y][x].left = x > 0 ? this.colorGrid[y][x - 1] : null;
                this.colorGrid[y][x].right = x < this.colorGrid[y].length - 1 ? this.colorGrid[y][x + 1] : null;
            }
        }
    }
}