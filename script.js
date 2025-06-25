// Global Variables Here
const gameBoard = document.getElementById('middle')
const horizontalSize = 17
const verticalSize = 17
const boardSize = horizontalSize * verticalSize
const buttons = []
let snakeArray = []
let cellColor
let snakeSize = 0

// Functions For Game Logic Here

// A loop that creates a 17 by 17 grid and alternates between light green and dark green and assigns an id to each button
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

// A function that declares the side buttons by taking the horizontal size, vertical size and the boarder size
const declareSideButtons = (iteration, num, increase) => {
    for (let i = iteration; i < num; i += increase) {
        const cell = gameBoard.getElementsByClassName(i)[0]
        cell.setAttribute("id", "sideButton")
    }
}

declareSideButtons(0, horizontalSize, 1) // First row
declareSideButtons(0, boardSize, 17) // First column
declareSideButtons(horizontalSize - 1, boardSize, 17) // Last row
declareSideButtons(((verticalSize - 1) * horizontalSize), boardSize, 1) // Last column

let middleButton = gameBoard.getElementsByClassName((boardSize - 1) / 2)[0]
let snakeHead = document.createElement('div')
snakeHead.setAttribute("id", "snake")
middleButton.appendChild(snakeHead)

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
changePosition('KeyW', -horizontalSize) // Moving Up
changePosition('KeyS', horizontalSize) // Moving Down
changePosition('KeyA', -1) // Moving Left
changePosition('KeyD', 1) // Moving Right

changePosition('ArrowUp', -horizontalSize) // Moving Up
changePosition('ArrowDown', horizontalSize) // Moving Down
changePosition('ArrowLeft', -1) // Moving Left
changePosition('ArrowRight', 1) // Moving Right

const increaseSnakeSize = () => {
    const snakeBody = document.createElement('div')
    snakeBody.setAttribute('id', 'snake-body')

    let lastBodyIndex

    if (snakeArray.length === 0) {
        lastBodyIndex = parseInt(snakeHead.parentElement.className)
    } else {
        lastBodyIndex = parseInt(snakeArray[snakeArray.length - 1].parentElement.className)
    }

    // Calculate new index for the body segment
    const newBodyIndex = lastBodyIndex + horizontalSize

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
