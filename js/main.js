const parts = document.querySelectorAll('.part');
const board = document.querySelector('.board');
const winWindow = document.querySelector('.win')
const drawWindow = document.querySelector('.draw')
const winnerPlayer = document.querySelector('.winnerPlayer')
const playAgainBtn = document.querySelectorAll('.playAgainBtn')

let player = true; // true substitude 'x'
let sum = 0, sumArr = [], isWin = false, isDraw = false;
let firstPlayer = prompt("Which player starts? (write x or o)")
if(firstPlayer == 'x') player = true;
if(firstPlayer == 'o') player = false;

const validWinning = [
    [0, 1, 2], // 0,0 0,1 0,2
    [3, 4, 5], // 1,0 1,1 1,2
    [6, 7, 8], // 2,0 2,1 2,2
    [0, 3, 6], // 0,0 1,0 2,0
    [1, 4, 7], // 0,1 1,2 2,1
    [2, 5, 8], // 0,2 1,2 2,2
    [0, 4, 8], // 0,0 1,1 2,2
    [2, 4, 6]  // 0,2 1,1 2,0
];


//x player 1, o player -1
let currentGame = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

const fillBoard = (e) => {
    for (let i = 0; i < parts.length; i++) {
        if (parts[i] == e.target) {
            let clickedPart = e.target;
            if (!clickedPart.matches('.x') && !clickedPart.matches('.o')) {
                if (player) {
                    clickedPart.classList.add('x')
                    player = !player
                    let h = Math.floor(i / 3);
                    let v = i % 3;
                    if (currentGame[h][v] != 1) currentGame[h][v] = 1;
                } else if (player == false) {
                    clickedPart.classList.add('o')
                    player = !player
                    let h = Math.floor(i / 3);
                    let v = i % 3;
                    if (currentGame[h][v] != 1) currentGame[h][v] = -1;
                }
            }
        }
    }
}

const checkWinning = () => {
    validWinning.forEach(combination => {
        combination.forEach(el => {
            let hor = Math.floor(el / 3)
            let ver = el % 3;
            sum += currentGame[hor][ver];
        })
        sumArr.push(sum)
        if (sum == 3 || sum == -3) {
            return isWin = true;
        }
        sum = 0;
    })
    sumArr = []
    return isWin;
}

const checkDraw = () => {
    const winState = checkWinning()
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (currentGame[i][j] != 0) {
                continue;
            }
            return isDraw = false;
        }
    }
    if(!winState) return isDraw = true;
}

document.addEventListener('click', () => {
    playAgainBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            winWindow.classList.remove('active');
            drawWindow.classList.remove('active')
            currentGame = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]
            sumArr = [];
            isWin = false;
            player = true;
            parts.forEach((part) => {
                part.classList.remove('x');
                part.classList.remove('o');
            })
        })
    })
})

const winPlayer = () => {
    const winState = checkWinning()
    if (winState) {
        let playerSign;
        player ? playerSign = 'O' : playerSign = 'X';
        winWindow.classList.add('active');
        winnerPlayer.innerHTML = `${playerSign}'s Win`;
        player = null;
    }
}

const drawCase = () => {
    const drawState = checkDraw()
    if (drawState) {
        drawWindow.classList.add('active');
    }
}

board.addEventListener('click', (e) => {
    fillBoard(e);
    winPlayer();
    drawCase();
})