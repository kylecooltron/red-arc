
export default class DrawingGameTile {
    constructor(color, x, y) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.up = null;
        this.left = null;
        this.right = null;
        this.down = null;
    }

    borderLeft() {
        return this.left?.color != this.color;
    }
    borderRight() {
        return this.right?.color != this.color;
    }
    borderBottom() {
        return this.down?.color != this.color;
    }
}