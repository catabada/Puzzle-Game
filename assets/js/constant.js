const GAME_CLOCK = 1000;
const BLOCK_SIDE_LENGTH = 30;
const ROWS = 22;
const COLS = 14;
const SCORE_WORTH = 100;

const WALL_AMOUNT = 1;

const BOMB_BOOM = 2;

const ROWS_NEXT = 16;
const COLS_NEXT = 7;


const SHAPES = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
        
    ],
    
    [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0]
    ],
    
    [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0]
    ],
    
    [
        [4, 4],
        [4, 4]
    ],
    
    [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0]
    ],
    
    [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0]
    ],
    
    [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]
    ]
    
];
const SHAPES_COPY = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
        
    ],
    
    [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0]
    ],
    
    [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0]
    ],
    
    [
        [4, 4],
        [4, 4]
    ],
    
    [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0]
    ],
    
    [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0]
    ],
    
    [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]
    ]
    
];
const BOMB_IMAGE = document.querySelector(".bomb-img");
const BULLET_IMAGE = document.querySelector(".bullet-img");
const WALL_IMAGE = document.querySelector(".wall-img");
const FLAME_IMAGE = document.querySelector(".flame-img");
const IMAGE_SHAPE = [
    null,
    document.querySelector(".i-img"),
    document.querySelector(".l-img"),
    document.querySelector(".j-img"),
    document.querySelector(".o-img"),
    document.querySelector(".s-img"),
    document.querySelector(".t-img"),
    document.querySelector(".z-img")
]


const COLORS = [
    '#fff', '#000', "#d9d9d9"
]

