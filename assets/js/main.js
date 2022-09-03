import Board from "./board.js";

let board = new Board();

const grid = board.grid;
const gameBox = document.getElementById('gameBox');
const movesBox = document.getElementById('movesBox');
const scoreBox = document.getElementById('scoreBox');

let savedLosses = 0;
let savedWins = 0;

if (sessionStorage.getItem('totalLosses')) savedLosses = sessionStorage.getItem('totalLosses');

const loseScore = document.getElementById('losses');
loseScore.innerText = `Losses: ${savedLosses}`;

if (sessionStorage.getItem('totalWins')) savedWins = sessionStorage.getItem('totalWins');

const winScore = document.getElementById('wins');
winScore.innerText = `Wins: ${savedWins}`;

const projectilesEl = document.getElementById('projectiles');

const fleetsEl = document.getElementById('fleets');

const currResults = document.getElementById('results');

console.log(grid)

const alterProjectiles = () => {
    projectilesEl.innerText = '';
    
    let totalProjectiles = board.projectiles;
    while (totalProjectiles > 0) {
        projectilesEl.innerText += '💥';
        totalProjectiles--;
    };
};

const alterFleets = () => {
    fleetsEl.innerText = '';
    
    const fleetKeys = [];
    for (let key in board.fleetObj) {
        let val = board.fleetObj[key];

        if (val > 0) fleetKeys.push(key);
    };
    
    let totalFleets = fleetKeys.length;
    while (totalFleets > 0) {
        fleetsEl.innerText += '🚀';
        totalFleets--;
    };
};

const checkPosition = (e) => {
    const currButton = e.target;
    const currButtonVal = board.makeHit(currButton.dataset.row, currButton.dataset.col);

    if (!currButtonVal) {
        currButton.innerText = 'X';

        board.projectiles--;

        currButton.style.backgroundImage = 'linear-gradient(#5F0A87, #A4508B)';
        
        alterProjectiles();

        if (board.checkWin() === false) {
            currResults.style.display = 'flex';
            currResults.innerText = 'You\'re obliterated! Better luck next time, commander.';
            reset.style.display = 'block';

            gameBox.style.display = 'none';
            movesBox.style.display = 'none';
            scoreBox.style.display = 'none';

            savedLosses++;
            sessionStorage.setItem('totalLosses', savedLosses);
        };
    };

    if (currButtonVal) {
        currButton.innerText = currButtonVal;
        currButton.style.backgroundImage = 'linear-gradient(#DE4DAA, #F6D327)';

        board.projectiles--;
        if (board.fleetObj[currButtonVal] > 0) board.fleetObj[currButtonVal] -= 1;
        board.ships--;

        alterProjectiles();
        alterFleets();

        if (board.checkWin() === true) {
            currResults.style.display = 'flex';
            currResults.innerText = 'You\'ve obliterated the enemy fleet! Good work, commander.';
            reset.style.display = 'block';

            gameBox.style.display = 'none';
            movesBox.style.display = 'none';
            scoreBox.style.display = 'none';

            savedWins++;
            sessionStorage.setItem('totalWins', savedWins);
        };

        if (board.checkWin() === false) {
            currResults.style.display = 'flex';
            currResults.innerText = 'You\'re obliterated! Better luck next time, commander.';
            reset.style.display = 'block';

            gameBox.style.display = 'none';
            movesBox.style.display = 'none';
            scoreBox.style.display = 'none';

            savedLosses++;
            sessionStorage.setItem('totalLosses', savedLosses);
        };
    };

    currButton.removeEventListener('click', checkPosition);
};

const populateBoard = (grid) => {
    for (let row = 0; row < grid.length; row++) {
        let currDiv = document.createElement('div');

        currDiv.setAttribute('id', `row-${row}`)
        currDiv.setAttribute('class', 'rows');
        currDiv.style.display = 'flex';

        gameBox.appendChild(currDiv);

        for (let col = 0; col < grid.length; col++) {
            let currButton = document.createElement('button');

            currButton.setAttribute('data-col', col);
            currButton.setAttribute('data-row', row);
            currButton.setAttribute('class', 'buttons');

            currButton.addEventListener('click', checkPosition);

            currDiv.appendChild(currButton);
        };
    };
};

window.addEventListener("DOMContentLoaded", () => {
    alterProjectiles();
    alterFleets();
    populateBoard(grid);

    const reset = document.getElementById('reset');

    reset.addEventListener("click", () => {
        window.location.reload(true);
    });
});