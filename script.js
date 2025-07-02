//globel variables
////////////////////
const gameBoard = document.getElementById('middle') // game board
const gameSideSize = 17 // Merged variable
const boardSize = gameSideSize * gameSideSize // game board size
const darkThemeButton = document.getElementById('dark-theme')
const navigation = document.getElementById('top')
ball = document.createElement('div') // ball element
ball.setAttribute('id', 'ball')
ball.textContent = '⬤' // ball shape
let snakeHead = document.createElement('div') // snake head element
let boxs = [] // boxs array
let snakeArray = [] // snake body array
let ballSpawnLocation // ball spawn location
let currentPoints = 0// current points
let bestPoints = localStorage.getItem('bestScore') ? parseInt(localStorage.getItem('bestScore')) : 0 // Load best score from localStorage
snakeHead.setAttribute("id", "snake")
let currentScore = document.getElementsByClassName('current-score')[0]
let bestScore = document.getElementsByClassName('best-score')[0]
let lastDirection = null // Store the last direction
// Initialize scores display
currentScore.textContent = "Current Score: " + currentPoints
bestScore.textContent = "Best Score: " + bestPoints


//functions
////////////////////
// Creates a grid based on the gameSideSize variable
const createGameBorder = () => {
    for (let i = 0; i < boardSize; i++) {
        let cellColor = (i % 2 === 0) ? 'lightgreen' : 'darkgreen'
        const cell = document.createElement('div')
        cell.style.backgroundColor = cellColor
        cell.setAttribute("class", i)
        gameBoard.appendChild(cell)
        boxs.push(cell)
    }
}

// Game lost function resets necessary variables
const gameLost = () => {
    currentPoints = 0 // resets game score
    currentScore.textContent = "Current Score: " + currentPoints
    for (let i = snakeArray.length - 1; i >= 0; i--) {
        const segment = snakeArray[i]
        segment.remove()
        snakeArray.splice(i, 1)
    }
    lastDirection = null // stops the snake movement
    middleButton.appendChild(snakeHead) // returns the snake to the middle
}

createGameBorder()
let middleButton = gameBoard.getElementsByClassName((boardSize - 1) / 2)[0]
middleButton.appendChild(snakeHead)

// Declare side buttons by taking the gameSideSize and the board size
const declareSideButtons = (iteration, num, increase) => {
    for (let i = iteration; i < num; i += increase) {
        const cell = gameBoard.getElementsByClassName(i)[0]
        cell.setAttribute("id", "sideButton")
    }
}

const SpawnBall = () => {
    while (true) {
        ballSpawnLocation = Math.floor(Math.random() * (boxs.length - 1)) + 1
        if (boxs[ballSpawnLocation].childNodes.length === 0
            || boxs[ballSpawnLocation].className === (gameSideSize * gameSideSize - 1) / 2)
            break
    }
    boxs[ballSpawnLocation].appendChild(ball)
}

SpawnBall()

declareSideButtons(0, gameSideSize, 1) // First row
declareSideButtons(0, boardSize, gameSideSize) // First column
declareSideButtons(gameSideSize - 1, boardSize, gameSideSize) // Last row
declareSideButtons(((gameSideSize - 1) * gameSideSize), boardSize, 1) // Last column

const increaseSnakeSize = () => {
    const snakeBody = document.createElement('div')
    snakeBody.setAttribute('id', 'snake-body')

    let lastBodyIndex = snakeArray.length > 0
        ? parseInt(snakeArray[snakeArray.length - 1].parentElement.className)
        : parseInt(snakeHead.parentElement.className)
    const newBodyIndex = lastBodyIndex + gameSideSize
    if (newBodyIndex >= 0 && newBodyIndex < boxs.length) {
        boxs[newBodyIndex].appendChild(snakeBody)
        snakeArray.push(snakeBody)
    }
}

const relocateBall = (snakeHeadPosition) => {
    if (snakeHeadPosition === ballSpawnLocation) {
        SpawnBall() // relocates the ball
        currentPoints++
        currentScore.textContent = "Current Score: " + currentPoints
        
        // Save new best score if currentPoints exceed bestPoints
        if (currentPoints > bestPoints) {
            bestPoints = currentPoints
            localStorage.setItem('bestScore', bestPoints) // Save new best score
        }
        bestScore.textContent = "Best Score: " + bestPoints // Update displayed best score
        increaseSnakeSize() // increases snake size if the ball is eaten
    }
}


const gameLoop = setInterval(() => {
    if (lastDirection) {
        moveSnake(lastDirection) // Move the snake in the last direction
    }
}, 250) // snake speed rate

const moveSnake = (direction) => {
   

    const currentIndex = parseInt(snakeHead.parentElement.className)
    let newIndex = currentIndex + direction

    // Horizontal wrapping
    if (direction === 1 && newIndex % gameSideSize === 0) {
        newIndex -= gameSideSize // Wrap to the left
    } else if (direction === -1 && currentIndex % gameSideSize === 0) {
        newIndex += gameSideSize // Wrap to the right
    }

    // Vertical wrapping
    if (newIndex < 0) {
        newIndex += boardSize // Wrap to the bottom
    } else if (newIndex >= boardSize) {
        newIndex -= boardSize // Wrap to the top
    }

    // Check if the new position is the neck (last segment)
    if (snakeArray.length > 0 && newIndex === parseInt(snakeArray[0].parentElement.className)) {
        return // Do nothing if trying to move into the neck
    }

    // Check for collision with the snake body
    if (snakeArray.some(segment => boxs[newIndex].childNodes[0] === segment)) {
        gameLost() // Call the game lost function
        return // Stop further execution
    }

    // Move the snake head
    boxs[newIndex].appendChild(snakeHead)
    relocateBall(newIndex)

    // Move the snake body segments
    for (let i = snakeArray.length - 1; i > 0; i--) {
        const segmentIndex = parseInt(snakeArray[i - 1].parentElement.className)
        boxs[segmentIndex].appendChild(snakeArray[i])
    }

    // Move the first body segment to the previous head's position
    if (snakeArray.length > 0) {
        boxs[currentIndex].appendChild(snakeArray[0])
    }

    // Update the last direction
    lastDirection = direction
}


const changePosition = (input, newPosition) => {
    window.addEventListener('keydown', e => {
        if (e.code === input) {
            // Check if the new position is opposite to the last direction (prevents the snake from going on its 'neck')
            if ((lastDirection === -gameSideSize && newPosition === gameSideSize) || 
                (lastDirection === gameSideSize && newPosition === -gameSideSize) || 
                (lastDirection === -1 && newPosition === 1) || 
                (lastDirection === 1 && newPosition === -1)) {
                return // Ignore the move
            }
            lastDirection = newPosition // Set the last direction based on the key pressed
        }
    })
}

// Generating WASD and arrow keys as input fields
changePosition('KeyW', -gameSideSize) // Moving Up
changePosition('KeyS', gameSideSize) // Moving Down
changePosition('KeyA', -1) // Moving Left
changePosition('KeyD', 1) // Moving Right

changePosition('ArrowUp', -gameSideSize) // Moving Up
changePosition('ArrowDown', gameSideSize) // Moving Down
changePosition('ArrowLeft', -1) // Moving Left
changePosition('ArrowRight', 1) // Moving Right

// Dark theme toggle functionality
darkThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme')
    navigation.classList.toggle('dark-theme')
    for (let i = 0; i < boxs.length; i++) {
        if (document.body.classList.contains('dark-theme')) {
            boxs[i].style.backgroundColor = (i % 2 === 0) ? 'darkgray' : 'lightgray'
        } else {
            boxs[i].style.backgroundColor = (i % 2 === 0) ? 'lightgreen' : 'darkgreen'
        }
    }
})

