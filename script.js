// Global Variables Here
const gameBoard = document.getElementById('middle')
const gameSideSize = 17 // Merged variable
const boardSize = gameSideSize * gameSideSize
ball = document.createElement('div') // ball element
ball.setAttribute('id', 'ball')
ball.textContent = '⬤'
let buttons = []
let snakeArray = []
let cellColor
let snakeSize = 0
console.log((boardSize - 1) / 2)
let ballSpwanLocation
let playerPoints = 0

// Functions For Game Logic Here

// A loop that creates a grid based on the gameSideSize variable, and alternates between two colors and assigns an id to each button
const createGameBorder = () => {
    for (let i = 0; i < boardSize; i++) {
        cellColor = (i % 2 === 0) ? 'lightgreen' : 'darkgreen'
        const cell = document.createElement('div')
        cell.style.backgroundColor = cellColor
        cell.setAttribute("class", i)
        gameBoard.appendChild(cell)
        buttons.push(cell)
    }
}
createGameBorder()

// A function that declares the side buttons by taking the gameSideSize and the board size
const declareSideButtons = (iteration, num, increase) => {
    for (let i = iteration; i < num; i += increase) {
        const cell = gameBoard.getElementsByClassName(i)[0]
        cell.setAttribute("id", "sideButton")
    }
}
const SpawnBall = () => {
    while (true) {
        ballSpwanLocation = Math.floor(Math.random() * (buttons.length - 1)) + 1 // generate a number between 1 and the number of buttons available
        if (buttons[ballSpwanLocation].childNodes.length === 0
            ||
            buttons[ballSpwanLocation].className === (gameSideSize * gameSideSize - 1) / 2) // checks if the box the ball will spawn is either empty or the middle button(snake spawn location)
            break
    }
    buttons[ballSpwanLocation].appendChild(ball)
}

SpawnBall()

declareSideButtons(0, gameSideSize, 1) // First row
declareSideButtons(0, boardSize, gameSideSize) // First column
declareSideButtons(gameSideSize - 1, boardSize, gameSideSize) // Last row
declareSideButtons(((gameSideSize - 1) * gameSideSize), boardSize, 1) // Last column

let middleButton = gameBoard.getElementsByClassName((boardSize - 1) / 2)[0]
let snakeHead = document.createElement('div')
snakeHead.setAttribute("id", "snake")
middleButton.appendChild(snakeHead)

// A function that checks if the snake head position ate the ball; if yes, it will change the location of the ball and add 1 point to the player
const relocateBall = snakeHeadPosition => {
    if (snakeHeadPosition === ballSpwanLocation) {
        SpawnBall()
        playerPoints++
        console.log(playerPoints)
    }
}
////////////////////////////////
// Event Listeners Here

// A function that takes an input and the new vector the snake will be headed when that input is pressed
const changePosition = (input, newPosition) => {
    window.addEventListener('keydown', e => {
        if (e.code === input) {
            const currentIndex = parseInt(snakeHead.parentElement.className)
            const newIndex = currentIndex + newPosition

            // Check if the new index is within bounds
            if (newIndex >= 0 && newIndex < buttons.length) {
                // Move the snake head
                buttons[newIndex].appendChild(snakeHead)
                relocateBall(newIndex)

                // Move the snake body segments
                for (let i = snakeArray.length - 1; i > 0; i--) {
                    const segmentIndex = parseInt(snakeArray[i - 1].parentElement.className)
                    buttons[segmentIndex].appendChild(snakeArray[i])
                }

                // Move the first body segment to the previous head's position
                if (snakeArray.length > 0) {
                    buttons[currentIndex].appendChild(snakeArray[0])
                }
            } else {
                console.error('New index out of bounds:', newIndex)
            }
        }
    })
}

const snakeHeadPosition = snakeHead.parentElement

// When pressing a key, the vector of the snake changes
changePosition('KeyW', -gameSideSize) // Moving Up
changePosition('KeyS', gameSideSize) // Moving Down
changePosition('KeyA', -1) // Moving Left
changePosition('KeyD', 1) // Moving Right

changePosition('ArrowUp', -gameSideSize) // Moving Up
changePosition('ArrowDown', gameSideSize) // Moving Down
changePosition('ArrowLeft', -1) // Moving Left
changePosition('ArrowRight', 1) // Moving Right

const increaseSnakeSize = () => {
    // assigns the last element of the snake array to the variable 
    const snakeBody = document.createElement('div')
    snakeBody.setAttribute('id', 'snake-body')
    let lastBodyIndex = parseInt(snakeArray[snakeArray.length - 1].parentElement.className)
    // Calculate new index for the body segment
    const newBodyIndex = lastBodyIndex + gameSideSize
    // Check if the new index is within bounds
    if (newBodyIndex >= 0 && newBodyIndex < buttons.length) {
        buttons[newBodyIndex].appendChild(snakeBody)
        snakeArray.push(snakeBody)
        snakeSize++
    } else {
        console.error('Index out of bounds:', newBodyIndex)
    }
}
increaseSnakeSize()
increaseSnakeSize()