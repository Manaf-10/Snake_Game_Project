// Global Variables Here
const gameBoard = document.getElementById('middle')//game board
const gameSideSize = 17 // Merged variable
const boardSize = gameSideSize * gameSideSize // game board size
ball = document.createElement('div') // ball element
ball.setAttribute('id', 'ball')
ball.textContent = '⬤' //ball shape
let snakeHead = document.createElement('div')//snake head element
let boxs = []//boxs array 
let snakeArray = []//snake body array
let ballSpawnLocation// ball spawn location
let currentPoints = 0//current points
let bestPoints = 0// best points

snakeHead.setAttribute("id", "snake")
let currentScore = document.getElementsByClassName('current-score')[0]
let bestScore = document.getElementsByClassName('best-score')[0]

// creates a grid based on the gameSideSize variable, and alternates between two colors and assigns an id to each button
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
//game lost functions , resets the necceresry variable
const gameLost = ()=>{
    currentPoints = 0 //resets game score
    currentScore.textContent = "Current Score: "+currentPoints
    for(let i =snakeArray.length-1 ;i >= 0;i--){
        //iterates the snake array and removes the element from the DOM and the array
        const segment = snakeArray[i]
        segment.remove()
        snakeArray.splice(i, 1)
    }

}

createGameBorder()
let middleButton = gameBoard.getElementsByClassName((boardSize - 1) / 2)[0]
middleButton.appendChild(snakeHead)
// declares the side buttons by taking the gameSideSize and the board size
const declareSideButtons = (iteration, num, increase) => {
    for (let i = iteration; i < num; i += increase) {
        const cell = gameBoard.getElementsByClassName(i)[0]
        cell.setAttribute("id", "sideButton")
    }
}
const SpawnBall = () => {
    while (true) {
        // generate a number between 1 and the number of buttons available
        ballSpawnLocation = Math.floor(Math.random() * (boxs.length - 1)) + 1
        // checks if box the ball will spawn is either empty or the middle button(snake spawn location)
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

    // If the snake has no segments, start from the snake head
    let lastBodyIndex = snakeArray.length > 0
        ? parseInt(snakeArray[snakeArray.length - 1].parentElement.className)
        : parseInt(snakeHead.parentElement.className)
    // Calculate new index for the body segment
    const newBodyIndex = lastBodyIndex + gameSideSize
    // Check if the new index is within bounds
    if (newBodyIndex >= 0 && newBodyIndex < boxs.length) {
        boxs[newBodyIndex].appendChild(snakeBody)
        snakeArray.push(snakeBody)
    }
}


const relocateBall = snakeHeadPosition => {
    // checks if the head of the snake is in the same location of the ball
    if (snakeHeadPosition === ballSpawnLocation) {
        SpawnBall()//relocates the ball
        //increases the players score when the snake gets the ball
        currentPoints++
        currentScore.textContent = "Current Score: "+currentPoints
        //if the current score is more than the best score increases the best score
        if(currentPoints > bestPoints){
            bestPoints = currentPoints
        }
        bestScore.textContent = "Best Score: "+ bestPoints
        increaseSnakeSize()//increases snake size if the ball is eaten
    }
}
////////////////////////////////
// Event Listeners Here

// changes the direction of the snake based on the input
let lastDirection = null // Store the last direction
const gameLoop = setInterval    (() => {
    if (lastDirection) {
        moveSnake(lastDirection) // Move the snake in the last direction
    }
}, 100) // Adjust the interval time as needed

const moveSnake = (direction) => {
    const currentIndex = parseInt(snakeHead.parentElement.className)
    const newIndex = currentIndex + direction

    // Check if the new index is within bounds
    if (newIndex >= 0 && newIndex < boxs.length) {
        // Check if the new position is occupied by the first snake body segment
        if (snakeArray.length > 0 && boxs[newIndex].childNodes[0] === snakeArray[0]) {
            return // Allow moving onto the first body segment
        }
        // Check if the new position is occupied by any other body segment
        else if (snakeArray.some(segment => boxs[newIndex].childNodes[0] === segment)) {
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
    }
}

const changePosition = (input, newPosition) => {
    window.addEventListener('keydown', e => {
        if (e.code === input) {
            lastDirection = newPosition // Set the last direction based on the key pressed
        }
    })
}

// Generating a WASD and left, right, down, up arrows as input fields
changePosition('KeyW', -gameSideSize) // Moving Up
changePosition('KeyS', gameSideSize) // Moving Down
changePosition('KeyA', -1) // Moving Left
changePosition('KeyD', 1) // Moving Right

changePosition('ArrowUp', -gameSideSize) // Moving Up
changePosition('ArrowDown', gameSideSize) // Moving Down
changePosition('ArrowLeft', -1) // Moving Left
changePosition('ArrowRight', 1) // Moving Right


