////////////////////////////////
// Global Variables Here
const gameBoard = document.getElementById('middle')
const horizontalSize = 17
const verticalSize = 17
const boardSize = horizontalSize * verticalSize
let cellColor

////////////////////////////////
// Functions For Game Logic Here
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



////////////////////////////////
// Event Listeners Here


