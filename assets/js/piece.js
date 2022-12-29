class Piece {
    constructor(shape, ctx) {
        this.shape = shape;
        this.ctx = ctx;
        this.y = 0;
        this.x = Math.floor(COLS / 2 - 1);
        this.y_next = 2
        this.x_next = Math.floor(COLS_NEXT / 2) - 1;
        this.speed = 1000;
        this.move = 0;
        this.startTime = 0;
    }

    renderPiece() {
        $.map(this.shape, (row, i) => {
            $.map(row, (cell, j) => {
                if (cell > 0) {
                    if (IMAGE_SHAPE[cell] === null) {
                        this.ctx.fillRect(this.x + j, this.y + i, 1, 1)
                        this.ctx.fillStyle = COLORS[0];
                    } else {
                        this.ctx.drawImage(IMAGE_SHAPE[cell], this.x + j, this.y + i, 1, 1);
                    }
                }
            })
        })
    }

    typePiece() {
        $.map(this.shape, (row, i) => {
            $.map(this.row, (cell, j) => {
                if (cell !== 0) return cell;
            })
        })
    }
    getArrayNumberToRandomBomb() {
        let array = [];
        $.map(this.shape, (row, i) => {
            $.map(row, (cell, j) => {
                if (cell > 0) {
                    let subArray = [];
                    subArray.push(i);
                    subArray.push(j);
                    array.push(subArray);
                }
            });
        })
        return array;
    }

}