// Js for Player Options

// Player Options Selector
const options = document.querySelector('.playerOpt');
const whoseTurn = document.querySelector('.turnMove');
const nextTurn = document.querySelector('.turnMove__who');
const mainContainer = document.querySelector('.container');
const symP1 = document.querySelector('.pTitle__sym');
const circL = document.querySelector('.circL');
const circR = document.querySelector('.circR');
const canvasCS = document.querySelector('.boardCVS');

// Selected Buttons
const pcBtn = document.querySelector('.pc');
const locBtn = document.querySelector('.local');
const xBtn = document.querySelector('.x');
const oBtn = document.querySelector('.o');
const selectFirstPlayer = document.querySelector(".selectFirstPlayer");
const playerBack = document.querySelector("#playerBack");
const playBtn = document.querySelector('.play');

// Rules
const rules = document.querySelector('.rules');
const okay = document.querySelector('#okay');


// When Game is Over
const gameOver = document.querySelector('.gameOver');

const player = new Object;
let Opponent;


// Rules
rules.classList.add('show');

okay.addEventListener('click', () => {
    rules.classList.remove('show');
})

// X or O is clicked
oBtn.addEventListener('click', () => {
    player.man = 'O';
    player.pc = 'X';
    player.local = 'X';
    switchActive(xBtn, oBtn);
});

xBtn.addEventListener('click', () => {
    player.man = 'X';
    player.pc = 'O';
    player.local = 'O';
    switchActive(oBtn, xBtn);
});

// AI or Friend is clicked
pcBtn.addEventListener('click', () => {
    Opponent = 'PC';
    switchActive(locBtn, pcBtn);
    canvasCS.classList.remove('hide');
    xBtn.classList.remove('xHide');
    oBtn.classList.remove('oHide');
    playBtn.classList.remove('sHide');
    symP1.classList.remove('hide');
    circL.style.fill = '#222';
    circR.style.fill = '#222';
});

// When Friend Option is Picked,
// A Whole New Function will be Used
locBtn.addEventListener('click', () => {
    switchActive(pcBtn, locBtn);
    circL.style.fill = '#bfbfbf';
    circR.style.fill = '#bfbfbf';
    playBtn.classList.add('sHide');
    xBtn.classList.add('xHide');
    oBtn.classList.add('oHide');
    symP1.classList.add('hide');
    selectFirstPlayer.classList.add("show");
})

playerBack.addEventListener('click', () => {
    selectFirstPlayer.classList.remove("show");
})

playBtn.addEventListener('click', () => {
    if(!Opponent) {
        pcBtn.style.backgroundColor = "rgb(119, 0, 0)";
        pcBtn.style.color = "#fff";
        locBtn.style.backgroundColor = "rgb(119, 0, 0)";
        locBtn.style.color = "#fff";
        return;
    }
    if(!player.man) {
        oBtn.style.backgroundColor = "rgb(119, 0, 0)";
        oBtn.style.color = "#fff";
        xBtn.style.backgroundColor = "rgb(119, 0, 0)";
        xBtn.style.color = "#fff";
        return;
    }
    init(player, Opponent);
    options.classList.add('hide');
    whoseTurn.classList.remove('hide');
    whoseTurn.classList.add('remCursor');
    mainContainer.classList.add('cursor');
    nextTurn.textContent = "Player 1's Turn";
    canvasCS.style.border = "none";
})

const switchActive = (off, on) => {
    off.classList.remove('activePlayer');
    on.classList.add('activePlayer');
}