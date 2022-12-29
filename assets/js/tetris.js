// Next Piece Board
let canvas_next = document.getElementById("next-board");
let next_board = canvas_next.getContext("2d");
next_board.scale(BLOCK_SIDE_LENGTH, BLOCK_SIDE_LENGTH)
next_board.fillRect(0, 0, COLS_NEXT, ROWS_NEXT);

let canvas_grid = document.getElementById("grid");
let grid = canvas_grid.getContext("2d");

grid.lineWidth = 3
grid.strokeStyle = '#000'

for (var i = 0; i < ROWS; i++) {
    for (var j = 0; j <= COLS; j++) {
        grid.beginPath();
        grid.moveTo(j * 30, 0);
        grid.lineTo(j * 30, ROWS * 30);
        grid.stroke();
    }
    grid.beginPath();
    grid.moveTo(0, i * 30);
    grid.lineTo(COLS * 30, i * 30);
    grid.stroke();
}
// Canvas Game
let scoreContent = $("#content-score");
let levelContent = $("#content-level");
let lineContent = $("#content-lines");
let secondContent = $(".second");
let inputLevel = $("#input-level");

let canvas_game = document.getElementById("tetris-game");
let ctx = canvas_game.getContext("2d");



ctx.scale(BLOCK_SIDE_LENGTH, BLOCK_SIDE_LENGTH);
let model = new GameModel(ctx);
let isPause = false;

// Attribute Game
let scoreNum = 0;
let levelNum = 1;
let lineNum = 0;
let timeLevel = 0;
var countTime = timeLevel;

// Create these piece in nextBoard
const randomPiece = (ctx) => {
    let arrayNum = [];
    let arrayPiece = [];
    while (arrayNum.length < 3) {
        let random = Math.floor(Math.random() * SHAPES.length);
        if (!arrayNum.includes(random)) {
            arrayNum.push(random);
            arrayPiece.push(new Piece(SHAPES[random], ctx));
        }
    }

    return Array.of(arrayPiece, arrayNum);
}
const arrayRandom = randomPiece(ctx);
const arrPiece = arrayRandom[0];
const arrNumOfPiece = arrayRandom[1];


// run() to run these necessary function
function run() {
    fullRows();
    newGameState();
}

function copyShapes(shapes) {
    $.map(SHAPES, (shape, index) => {
        $.map(shape, (row, i) => {
            $.map(row, (col, j) => {
                shape[i][j] = shapes[index][i][j];
            })
        })
    })
}

let index = 0;


restartGame = () => {
    model.grid = model.makeStartingGrid();
    model.fallingPiece = null;
    model.bullet = null;
    model.bomb = null;
    model.ctx = ctx;
}


let newGameState = () => {
    fullRows();
    if (model.fallingPiece === null) {
        let rand = 0;
        while (true) {
            rand = Math.floor(Math.random() * 7);
            if (!arrNumOfPiece.includes(rand)) break;
        }
        arrNumOfPiece.push(rand);
        arrNumOfPiece.shift();
        arrPiece.push(new Piece(SHAPES[rand], ctx));
        const newPiece = arrPiece.shift();
        model.fallingPiece = newPiece;
        const model_next_board = new NextBoard(next_board, arrPiece);
        model_next_board.renderGameState();
        model.moveDown();
    } else {
        if (model.bomb !== null) {
            model.bombDown();
        }
        if (model.bullet !== null) model.bulletRight();
        model.moveDown();
    }
    if (model.fallingPiece === null)
        copyShapes(SHAPES_COPY);
}


const level2 = () => {
    for (let i = 0; i < WALL_AMOUNT; i++) {
        model.grid.shift();

        let arr = [];
        for (let j = 0; j < COLS; j++) {
            arr.push(-1);
        }
        model.grid.push(arr);
    }
}

const level3 = () => {
    model.bullet = new Bullet(ctx);
}

const level4 = () => {
    const random = Math.floor(Math.random() * (COLS - 2));
    model.bomb = new Bomb(random, ctx);
}

const level5 = () => {
    if (model.fallingPiece !== null) {
        let random = Math.floor(Math.random() * SHAPES.length);
        model.fallingPiece.shape = SHAPES[random]
    }
}
// fullRows() to check row is full ?
const fullRows = () => {
    const allFilled = (row) => {
        for (let x of row) {
            if (x <= 0) {
                return false;
            }
        }
        return true;
    }
    var lineRecieved = 0;


    for (let i = 0; i < model.grid.length; i++) {
        if (allFilled(model.grid[i])) {
            lineRecieved++;
            scoreNum += SCORE_WORTH * lineRecieved;
            model.grid.splice(i, 1);
            model.grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            lineNum += 1;
        }
    }

    $(scoreContent).html(String(scoreNum));
    $(levelContent).html(String(levelNum));
    $(lineContent).html(String(lineNum));
}


$(document).ready(() => {
    $(document).on("keydown", (e) => {
        e.preventDefault();
        if (!isPause) {
            switch (e.keyCode) {
                case 38:
                    if (model.fallingPiece !== null)
                        model.rotate();
                    break;
                case 40:
                    if (model.fallingPiece !== null)
                        model.fallingPiece.y += 1;
                    break;
                case 37:
                    model.move(false);
                    break;
                case 39:
                    model.move(true);
                    break;
            }
        }
    })
})
const initLevelGame = (level) => {
    switch (levelNum) {
        case 2:
            timeLevel = 5;
            countTime = timeLevel
            const level2Time = setInterval(() => {
                if (countTime === -1) {
                    level2()
                    countTime = 5;
                }
                if (levelNum !== 2) clearInterval(level2Time);
            }, 30);
            break;
        case 3:
            $(".gun").show();
            timeLevel = 5;
            countTime = timeLevel
            const level3Time = setInterval(() => {
                if (countTime === -1) {
                    level3()
                    countTime = 5;
                }
                if (levelNum !== 3) clearInterval(level3Time);
            }, 30)
            break;
        case 4:
            $(".gun").hide();
            model.bullet = null;
            timeLevel = 5;
            countTime = timeLevel
            const level4Time = setInterval(() => {
                if (countTime === -1) {
                    level4()
                    countTime = 5;
                }
                if (levelNum !== 4) clearInterval(level4Time);
            }, 30)
            break;
        case 5:
            timeLevel = 5;
            countTime = timeLevel
            model.bomb = null;
            const level5Time = setInterval(() => {
                if (countTime === -1) {
                    level5()
                    countTime = 5;
                }
                if (levelNum !== 5) clearInterval(level5Time);
            }, 30)
            break;
        case 6:
            model.grid = model.mapLevel6();
            break;
    }
}
// Event Click button
$(".play").on("click", function (e) {
    isPause = false;
    clearInterval(initLevelGame);
    e.preventDefault();
    e.stopPropagation();

    levelNum = parseInt($(".level-option").html());

    $(".btn-pause").show();
    $(".menu-game").hide();
    $(".game-board").show();
    const timeInterval = setInterval(() => {
        if (!isPause) {
            if (levelNum !== 1 && levelNum !== 6) {
                (countTime >= 10) ? secondContent.html(countTime): secondContent.html("0" + JSON.parse(countTime))
                countTime--;
            }
            $(".menu").on("click", (e) => {
                clearInterval(timeInterval);
            })
        }
    }, 1000)
    // Set time to run the game
    setInterval(() => {
        if (!isPause) {
            $(canvas_grid).css({
                "zIndex": "1000"
            })
            run();
        }
    }, 10);
    initLevelGame(levelNum);

})
$(".exit").on("click", function (e) {
    e.stopPropagation();
    if (confirm("Đừng thoát ra mà  :((")) {
        window.close();
    }
})
$(".help").on("click", function (e) {
    e.stopPropagation();
    $(".modal-help").css("display", "flex");
})
$(".modal-help").on("click", function (e) {
    e.stopPropagation();
    $(this).hide();
})
$(".btn-pause").on("click", function (e) {
    isPause = true;
    $(".modal-pause").css("display", "flex");
})
$(".resume").on("click", function (e) {
    isPause = false;
    $(".modal-pause").hide();
})
$(".restart").on("click", function (e) {
    restartGame();
    isPause = false;
    $(".modal-pause").hide();
})
$(".menu").on("click", function (e) {
    countTime = 0;

    secondContent.html("0" + countTime);
    levelContent.html(0)
    lineContent.html(0);
    scoreContent.html(0);
    scoreNum = 0;
    lineNum = 0;
    restartGame();
    isPause = true;
    $(".gun").hide();
    $(".menu-game").show();
    $(".game-board").hide();
    $(".modal-pause").hide();
    $(".btn-pause").hide();
})
$(".level").on("click", function (e) {
    e.stopPropagation();
    let level = parseInt($(".level-option").html());
    if (level === 6) level = 1;
    else
        level++;
    $(".level-option").html(level);
})