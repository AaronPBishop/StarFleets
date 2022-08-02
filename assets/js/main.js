import Board from "./board.js";

let board = new Board();

// Elements
const grid = board.grid;
const gameBox = document.getElementById('gameBox');

let savedLosses = 0;
let savedWins = 0;

const loseScore = document.getElementById('losses');
loseScore.innerText = `Losses: ${savedLosses}`;

const winScore = document.getElementById('wins');
winScore.innerText = `Wins: ${savedWins}`;

const hitsLeft = document.getElementById('hitsLeft');
hitsLeft.innerText = `Hits left: ${board.numRemaining}`;

const missesLeft = document.getElementById('missesLeft');
missesLeft.innerText = `Misses left: ${board.misses}`;

console.log(grid)

const checkPosition = (e) => {
    let currResults = document.getElementById('results');

    const currButton = e.target;
    const currButtonVal = board.makeHit(currButton.dataset.row, currButton.dataset.col);

    if (!currButtonVal) {
        board.misses--;
        currButton.style.backgroundColor = 'red';
        missesLeft.innerText = `Misses left: ${board.misses}`;

        if (board.isLoss()) {
            currResults.innerText = 'You\'re sunk! Better luck next time, captain.';
            gameBox.style.display = 'none';
            reset.style.display = 'block';

            winScore.style.display = 'none';
            loseScore.style.display = 'none';

            hitsLeft.style.display = 'none';
            missesLeft.style.display = 'none';

            savedLosses++;
            sessionStorage.setItem('totalLosses', savedLosses);
        };
    };

    if (currButtonVal) {
        currButton.innerHTML = currButtonVal;
        currButton.style.backgroundColor = 'green';

        board.numRemaining--;
        hitsLeft.innerText = `Hits left: ${board.numRemaining}`;

        if (board.isWin()) {
            currResults.innerText = 'Arr, ye sunk all me ships!';
            gameBox.style.display = 'none';
            reset.style.display = 'block';

            
            winScore.style.display = 'none';
            loseScore.style.display = 'none';

            hitsLeft.style.display = 'none';
            missesLeft.style.display = 'none';

            savedWins++;
            sessionStorage.setItem('totalWins', savedWins);
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
    populateBoard(grid);

    const reset = document.getElementById('reset');

    reset.addEventListener("click", () => {
        savedLosses = sessionStorage.getItem('totalLosses');
        savedWins = sessionStorage.getItem('totalWins');

        loseScore.innerText = `Losses: ${savedLosses}`;
        winScore.innerText = `Wins: ${savedWins}`;

        window.location.reload(true);
    });
});