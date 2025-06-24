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




for(let i=0;i<horizontalSize;i++){
    const cell = gameBoard.getElementsByClassName('b'+i)[0]
    cell.setAttribute("id","sideButton")

}
for(let i=0;i<boardSize;i+=17){
    const cell = gameBoard.getElementsByClassName('b'+i)[0]
    cell.setAttribute("id","sideButton")

}
for(let i=horizontalSize-1;i<boardSize;i+=17){
    const cell = gameBoard.getElementsByClassName('b'+i)[0]
    cell.setAttribute("id","sideButton")

}
for(let i = (verticalSize - 1) * horizontalSize; i < boardSize; i += 1){
    const cell = gameBoard.getElementsByClassName('b'+i)[0]
    cell.setAttribute("id","sideButton")
}

////////////////////////////////
// Event Listeners Here






