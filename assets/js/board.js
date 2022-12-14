export default class Board {
    constructor() {
        this.numRows = 9;
        this.numCols = 9;
        this.fleets = [5, 4, 3, 2];
        this.fleetObj = { 5: 5, 4: 4, 3: 3, 2: 2 };
        this.grid = this.populateGrid();
        this.projectiles = 30;
        this.ships = 14;
    };

    populateGrid() {
        const grid = [];

        for (let i = 0; i < this.numRows; i++) {
            grid.push(Array(this.numCols).fill(null));
        };

        const orientations = ["x+", "x-", "y+", "y-"];
        this.fleets.forEach(fleet => {
            let orientation = orientations[Math.floor(Math.random() * 4)];
            let x = Math.floor(Math.random() * this.numCols);
            let y = Math.floor(Math.random() * this.numRows);

            while (!this.verifyFit(grid, fleet, x, y, orientation)) {
                orientation = orientations[Math.floor(Math.random() * 4)];

                x = Math.floor(Math.random() * this.numCols);
                y = Math.floor(Math.random() * this.numRows);
            };

            this.setFleet(grid, fleet, x, y, orientation);
        });
        return grid;
    };

    makeHit(row, col) {
        return this.grid[row][col];
    };

    verifyFit(grid, length, x, y, orientation) {
        if (orientation === "x+") {
            if (x + length - 1 > this.numCols - 1) return false;
            if (grid[y].slice(x, x + length).some(el => el !== null)) return false;
        } else if (orientation === "x-") {
            if (x - length + 1 < 0) return false;
            if (grid[y].slice(x - length + 1, x + 1).some(el => el !== null)) return false;
        } else if (orientation === "y+") {
            if (y + length - 1 > this.numRows - 1) return false;
            for(let i = y; i < y + length; i++){
                if(grid[i][x] !== null) return false;
            }
        } else {
            if (y - length + 1 < 0) return false;
            for(let i = y; i > y - length; i--){
                if(grid[i][x] !== null) return false;
            }
        }
        return true;
    };

    setFleet(grid, length, x, y, orientation) {
        if (orientation === "x+") {
            for(let i = x; i < x + length; i++) {
                grid[y][i] = length;
            }
        } else if (orientation === "x-") {
            for(let i = x; i > x - length; i--) {
                grid[y][i] = length;
            }
        } else if (orientation === "y+") {
            for(let i = y; i < y + length; i++) {
                grid[i][x] = length;
            }
        } else {
            for(let i = y; i > y - length; i--) {
                grid[i][x] = length;
            }
        }
    };

    checkWin() {
        if (this.projectiles === 0 && this.ships > 0) return false;
        if (this.projectiles >= 0 && this.ships === 0) return true;
    };
}