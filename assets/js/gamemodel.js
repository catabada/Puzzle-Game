class GameModel {
    constructor(ctx) {
        this.ctx = ctx;
        this.fallingPiece = null;
        this.bomb = null;
        this.bullet = null;
        this.grid = this.makeStartingGrid();

    }

    makeStartingGrid() {
        let grid = [];
        for (var i = 0; i < ROWS; i++) {
            grid.push([]);
            for (var j = 0; j < COLS; j++) {
                grid[i].push(0);
            }
        }
        return grid;
    }

    collision(x, y) {
        const shape = this.fallingPiece.shape;
        const n = shape.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j] > 0) {
                    let p = x + j;
                    let q = y + i;
                    if (p >= 0 && p < COLS && q < ROWS) {
                        if (this.grid[q][p] > 0 || this.grid[q][p] == -1)
                            return true;
                    } else
                        return true;

                }
            }
        }
        return false;
    }
    collisionBomb(x, y) {
        const shape = this.bomb.shape;
        const n = shape.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                let p = x + j;
                let q = y + i;
                if (p >= 0 && p < COLS && q < ROWS) {
                    if (this.grid[q][p] > 0 || this.grid[q][p] == -1) {
                        return true;
                    }
                } else
                    return true;
            }
        }
        return false;
    }
    collisionBullet(x, y) {
        const shapePiece = this.fallingPiece.shape;
        const xPiece = this.fallingPiece.x;
        const yPiece = this.fallingPiece.y;
        const n = shapePiece.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (shapePiece[i][j] > 0) {
                    let p = xPiece + j;
                    let q = yPiece + i;
                    if (x < COLS) {
                        if ((x === p && y === q)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    renderGameState() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                let cell = this.grid[i][j];
                if (cell === -1) {
                    this.ctx.drawImage(WALL_IMAGE, j, i, 1, 1);
                } else if (cell === -2) {
                    this.ctx.fillStyle = "#fafa";
                    this.ctx.fillRect(j, i, 1, 1);
                } else if (IMAGE_SHAPE[cell] === null) {
                    this.ctx.fillStyle = COLORS[0];
                    this.ctx.fillRect(j, i, 1, 1);
                } else {
                    this.ctx.drawImage(IMAGE_SHAPE[cell], j, i, 1, 1);
                }
            }
        }
        if (this.fallingPiece !== null) {
            this.fallingPiece.renderPiece();
        }
        if (this.bomb !== null)
            this.bomb.renderBomb();
        if (this.bullet !== null) this.bullet.renderBullet();
    }
    bulletRight = () => {
        this.bullet.move += (Date.now() - this.bullet.startTime);
        this.bullet.startTime = Date.now();
        if (this.bullet === null) {
            this.renderGameState();
            return;
        }
        //  else if () {
        else if (this.collisionBullet(this.bullet.x, this.bullet.y)) {
            const shapePiece = this.fallingPiece.shape;
            const xPiece = this.fallingPiece.x;
            const yPiece = this.fallingPiece.y;
            $.map(shapePiece, (row, i) => {
                $.map(row, (cell, j) => {
                    if (cell > 0) {
                        let p = xPiece + j;
                        let q = yPiece + i;
                        if (p === this.bullet.x && q === this.bullet.y) {
                            this.fallingPiece.shape[i][j] = 0;
                        }
                    }
                })
            });
            this.bullet = null;

        } else {
            if (this.bullet !== null)
                if (this.bullet.move >= this.bullet.speed) {
                    this.bullet.x += 1;
                    this.bullet.move = 0;
                }
        }
    }
    bombDown = () => {
        this.bomb.move += (Date.now() - this.bomb.startTime);
        this.bomb.startTime = Date.now();
        if (this.bomb === null) {
            this.renderGameState();
            return;
        } else if (this.collisionBomb(this.bomb.x, this.bomb.y + 1)) {
            const shape = this.bomb.shape;
            const x = this.bomb.x;
            const y = this.bomb.y;
            console.log(x, y, Math.floor(BOMB_BOOM / 2))
            for (let i = x - BOMB_BOOM; i < x + BOMB_BOOM * 2; i++) {
                for (let j = y - BOMB_BOOM; j < y + BOMB_BOOM * 2; j++) {
                    if (i > 0 && i < COLS && j > 0 && j < ROWS) {
                        this.grid[j][i] = 0;
                    }
                }
            }
            this.bomb = null;
        } else {
            if (this.bomb.move >= this.bomb.speed) {
                this.bomb.y += 1;
                this.bomb.move = 0;
            }
        }
        this.renderGameState();
    }

    moveDown() {
        this.fallingPiece.move += (Date.now() - this.fallingPiece.startTime);
        this.fallingPiece.startTime = Date.now();
        if (this.fallingPiece === null) {
            this.renderGameState();
            return;
        } else if (this.collision(this.fallingPiece.x, this.fallingPiece.y + 1)) {
            const shape = this.fallingPiece.shape;
            const x = this.fallingPiece.x;
            const y = this.fallingPiece.y;
            $.map(shape, (row, i) => {
                $.map(row, (cell, j) => {
                    let p = x + j;
                    let q = y + i;
                    if (p >= 0 && p < COLS && q < ROWS && cell > 0)
                        this.grid[q][p] = shape[i][j];
                })
            });

            // check game over
            if (this.fallingPiece.y === 0) {
                alert("Game over");
                this.grid = this.makeStartingGrid();
            }
            this.fallingPiece = null;

        } else {
            if (this.fallingPiece.move >= this.fallingPiece.speed) {
                this.fallingPiece.y += 1;
                this.fallingPiece.move = 0;
            }
        }
        this.renderGameState();
    }

    move(right) {
        if (this.fallingPiece === null) return;

        let x = this.fallingPiece.x;
        let y = this.fallingPiece.y;

        if (right) {
            // move right 
            if (!this.collision(x + 1, y))
                this.fallingPiece.x += 1;
        } else {
            // move left
            if (!this.collision(x - 1, y))
                this.fallingPiece.x -= 1;
        }
        this.renderGameState();
    }


    rotate() {
        if (this.fallingPiece !== null) {
            let shape = this.fallingPiece.shape;
            let x = this.fallingPiece.x;
            let y = this.fallingPiece.y;

            let typeNumPiece = this.getTypePiece(shape);
            var index = (typeNumPiece != 1) ? index = 3 : index = 4;
            if (x >= 0 && x <= COLS - index && !this.collision(x, y + 1))
                this.fallingPiece.shape = this.transpose(shape);
        }
        this.renderGameState();
    }
    getTypePiece(shape) {
        var res = 0;
        $.map(shape, (row, i) => {
            $.map(row, (col, j) => {
                if (col > 0)
                    res = col
            })
        })
        return res;
    }

    transpose(shape) {
        $.map(shape, (row) => {
            row.reverse();
        })
        var temp = [];
        for (let y = 0; y < shape[0].length; y++) {
            temp.push([]);
            for (let x = 0; x < shape.length; x++) {
                temp[y][x] = shape[x][y]
            }
        }
        console.log(this.mapLevel6())
        return temp;
    }
    mapLevel6 = () => {
        let mapGrid = [];
        for (let i = 0; i < ROWS; i++) {
            let array = [];
            for (let j = 0; j < COLS; j++) {
                if (j >= 0 && j <= COLS) {
                    if (j < 5 - i  || j > 8 + i) {
                        array.push(-1);
                    } else {
                        array.push(0);
                    }
                }
                if(i === ROWS- 1) {
                    array[j] = -1;
                }
                
            }
            mapGrid.push(array);
        }
        return mapGrid;
    }
}