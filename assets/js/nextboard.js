class NextBoard {
    constructor(ctx, arrPiece) {
        this.ctx = ctx;
        this.arrPiece = arrPiece;
        this.grid = this.makeGrid();

        $.map(arrPiece, (piece, index) => {
            var x = piece.x_next;
            var y = piece.y_next + index * 5;
            for (let i = 0; i < piece.shape.length; i++) {
                for (let j = 0; j < piece.shape[i].length; j++) {
                    let p = x + j;
                    let q = y + i;
                    this.grid[q][p] = piece.shape[i][j];
                }
            }
        })
    }
    renderGameState() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                let cell = this.grid[i][j];
                if (IMAGE_SHAPE[cell] === null) {
                    this.ctx.fillStyle = '#000';
                    this.ctx.fillRect(j, i, 1, 1);
                } else {
                    this.ctx.drawImage(IMAGE_SHAPE[cell], j, i, 1, 1);
                }
            }
        }
    }

    makeGrid = () => {
        let grid = [];
        for (var i = 0; i < ROWS_NEXT; i++) {
            grid.push([]);
            for (var j = 0; j < COLS_NEXT; j++) {
                grid[i].push(0);
            }
        }
        return grid;
    }

}