////////////////////////////////
// Global Variables Here
const gameBoard = document.getElementById('middle')
const horizontalSize = 17
const verticalSize = 17
const boardSize = horizontalSize * verticalSize
const buttons = []
let cellColor

////////////////////////////////
// Functions For Game Logic Here


//a loop that creates a 17 by 17 grid and alternates between light green and dark green and assigns an id to each button
const createGameBorder = () => {
    for (let i =0;i<boardSize;i++){
        cellColor = (i % 2 === 0) ? 'lightgreen' : 'darkgreen'
        const cell = document.createElement('div')
        cell.style.backgroundColor = cellColor
        cell.setAttribute("class", + i)
        gameBoard.appendChild(cell)
        //console.log("Created cell with class:", cell.className)
        buttons.push(cell)
    }
}
createGameBorder()

//a function that declares the side buttons by taking the horizontal size,vertical size and the boardsize;
const declareSideButtons = (iteration,num, increase) => {
    for (let i = iteration; i < num; i += increase) {
        const cell = gameBoard.getElementsByClassName(i)[0]
            cell.setAttribute("id", "sideButton")
    }
}


declareSideButtons(0,horizontalSize, 1) // First row
declareSideButtons(0,boardSize, 17) // First column
declareSideButtons(horizontalSize-1,boardSize, 17) // Last row
declareSideButtons(((verticalSize - 1) * horizontalSize),boardSize, 1) // Last column

const middleButton = gameBoard.getElementsByClassName(((boardSize-1)/2))[0]
const snake = document.createElement('div')
middleButton.style.width = '100%'
middleButton.style.height = '100%'
snake.setAttribute("id", "snake")
middleButton.appendChild(snake)
////////////////////////////////
// Event Listeners Here


window.addEventListener('keydown',e=>{
    if(e.code === 'KeyW' ){
        const currnetIndex = parseInt(snake.parentElement.className)
        const newIndex = currnetIndex - horizontalSize
        buttons[newIndex].appendChild(snake)
    }
})

window.addEventListener('keydown',e=>{
    if(e.code === 'KeyS' ){
        const currnetIndex = parseInt(snake.parentElement.className)
        const newIndex = currnetIndex + horizontalSize 
        buttons[newIndex].appendChild(snake)
    }
})

window.addEventListener('keydown',e=>{
    if(e.code === 'KeyA' ){
        const currnetIndex = parseInt(snake.parentElement.className)
        const newIndex = currnetIndex - 1
        buttons[newIndex].appendChild(snake)
    }
})

window.addEventListener('keydown',e=>{
    if(e.code === 'KeyD' ){
        const currnetIndex = parseInt(snake.parentElement.className)
        const newIndex = currnetIndex + 1
        buttons[newIndex].appendChild(snake)
    }
})


// moveSnake()
const currnetIndex = parseInt(snake.parentElement.className)
const newIndex = currnetIndex + verticalSize
console.log(newIndex)