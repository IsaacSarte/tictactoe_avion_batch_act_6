// Js for Player Options

// Player Options Selector
const options = document.querySelector('.playerOpt');
const whoseTurn = document.querySelector('.turnMove');
const nextTurn = document.querySelector('.turnMove__who');
const mainContainer = document.querySelector('.container');

// Selected Buttons
const pcBtn = document.querySelector('.pc');
const locBtn = document.querySelector('.local');
const xBtn = document.querySelector('.x');
const oBtn = document.querySelector('.o');
const playBtn = document.querySelector('.play');

// When Game is Over
const gameOver = document.querySelector('.gameOver');

const player = new Object;
let Opponent;

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
});

locBtn.addEventListener('click', () => {
    Opponent = 'FRIEND';
    switchActive(pcBtn, locBtn);
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
    mainContainer.classList.add('cursor');
    nextTurn.textContent = "Player 1's Turn";
})

const switchActive = (off, on) => {
    off.classList.remove('active');
    on.classList.add('active');
}