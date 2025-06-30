// Global Variables Here
const gameBoard = document.getElementById('middle')
const gameSideSize = 17 // Merged variable
const boardSize = gameSideSize * gameSideSize
ball = document.createElement('div') // ball element
ball.setAttribute('id', 'ball')
ball.textContent = '⬤'
let buttons = []
let snakeArray = []
let ballSpwanLocation
let playerPoints = 0
let bestPoints = 0
let snakeHead = document.createElement('div')
snakeHead.setAttribute("id", "snake")
const currentScore = document.getElementsByClassName('current-score')[0]
const bestScore = document.getElementsByClassName('best-score')[0]

// creates a grid based on the gameSideSize variable, and alternates between two colors and assigns an id to each button
const createGameBorder = () => {
    for (let i = 0; i < boardSize; i++) {
        let cellColor = (i % 2 === 0) ? 'lightgreen' : 'darkgreen'
        const cell = document.createElement('div')
        cell.style.backgroundColor = cellColor
        cell.setAttribute("class", i)
        gameBoard.appendChild(cell)
        buttons.push(cell)
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
    if (newBodyIndex >= 0 && newBodyIndex < buttons.length) {
        buttons[newBodyIndex].appendChild(snakeBody)
        snakeArray.push(snakeBody)
    }
}


const relocateBall = snakeHeadPosition => {
    // checks if the head of the snake is in the same location of the ball
    if (snakeHeadPosition === ballSpwanLocation) {
        SpawnBall()//relocates the ball
        //increases the players score when the snake gets the ball
        playerPoints++
        currentScore.textContent = "Current Score: "+playerPoints
        //if the current score is more than the best score increases the best score
        if(playerPoints > bestPoints){
            bestPoints = playerPoints
        }
        bestScore.textContent = "Best Score: "+ bestPoints
        increaseSnakeSize()//increases snake size if the ball is eaten
    }
}
////////////////////////////////
// Event Listeners Here

// changes the direction of the snake based on the input
const changePosition = (input, newPosition) => {
    window.addEventListener('keydown', e => {
        if (e.code === input) {
            const currentIndex = parseInt(snakeHead.parentElement.className)
            const newIndex = currentIndex + newPosition

            // Check if the new index is within bounds
            if (newIndex >= 0 && newIndex < buttons.length) {
                // Check if the new position is the same as the first snake body segment
                if (snakeArray.length !== 0 && buttons[newIndex].childNodes[0] === snakeArray[0]) {
                    return // Do nothing if the snake head moves onto its body
                }

                // Move the snake head
                buttons[newIndex].appendChild(snakeHead);
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
            }
        }
    })
}

const snakeHeadPosition = snakeHead.parentElement

// Generating a WASD and left,right,down,up arrows as input fields
changePosition('KeyW', -gameSideSize) // Moving Up
changePosition('KeyS', gameSideSize) // Moving Down
changePosition('KeyA', -1) // Moving Left
changePosition('KeyD', 1) // Moving Right

changePosition('ArrowUp', -gameSideSize) // Moving Up
changePosition('ArrowDown', gameSideSize) // Moving Down
changePosition('ArrowLeft', -1) // Moving Left
changePosition('ArrowRight', 1) // Moving Right







