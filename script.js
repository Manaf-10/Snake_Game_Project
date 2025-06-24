////////////////////////////////
// Global Variables Here
const gameBoard = document.getElementById('middle')
const horizontalSize = 17
const verticalSize = 17
const boardSize = horizontalSize * verticalSize
const sideButtons = []
let cellColor

////////////////////////////////
// Functions For Game Logic Here


//a loop that creates a 17 by 17 grid and alternates between light green and dark green and assigns an id to each button
const createGameBorder = () => {
    for (let i =0;i<boardSize;i++){
        cellColor = (i % 2 === 0) ? 'lightgreen' : 'darkgreen';
        const cell = document.createElement('div')
        cell.style.backgroundColor = cellColor
        cell.textContent = i
        cell.setAttribute("class","b" + i)
        gameBoard.appendChild(cell)
        console.log("Created cell with class:", cell.className)
    }
}
createGameBorder()

//a function that declares the side buttons by taking the horizontal size,vertical size and the boardsize;
const declareSideButtons = (iteration,num, increase) => {
    for (let i = iteration; i < num; i += increase) {
        const cell = gameBoard.getElementsByClassName('b' + i)[0];
            cell.setAttribute("id", "sideButton"); 
            sideButtons.push(cell);
            cell.style.backgroundColor = 'black';
            console.log("Assigned ID 'sideButton' to cell at index " + i);
    }
}


declareSideButtons(0,horizontalSize, 1); // First row
declareSideButtons(0,boardSize, 17); // First column
declareSideButtons(horizontalSize-1,boardSize, 17); // Last row
declareSideButtons(((verticalSize - 1) * horizontalSize),boardSize, 1); // Last column


////////////////////////////////
// Event Listeners Here






