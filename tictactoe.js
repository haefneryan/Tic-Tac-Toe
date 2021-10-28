const xClass = 'x';
const oClass = 'o';
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const dataEndGameMessageElement = document.getElementById('endGameMessage')
const dataEndGameMessageTextElement = document.querySelector('[dataEndGameMessage]')
const restartButton = document.getElementById('restartButton')
let oTurn

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

gameStart()

restartButton.addEventListener('click', gameStart)

function gameStart() {
    oTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(xClass)
        cell.classList.remove(oClass)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    dataEndGameMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = oTurn ? oClass : xClass
    
    placeMark(cell, currentClass) // PLACE MARK
    
    if (checkWin(currentClass)) { // CHECK FOR A WINNER
        endGame(false)
    } else if (isDraw()) { // CHECK FOR DRAW 
        endGame(true)
    } else { // CHANGE BETWEEN X AND O TURN
        changeTurns() 
        setBoardHoverClass()
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function changeTurns() {
    oTurn = !oTurn
}

function setBoardHoverClass() {
    board.classList.remove(xClass)
    board.classList.remove(oClass)
    if(oTurn) {
        board.classList.add(oClass)
    }else {
        board.classList.add(xClass)
    }
}

function checkWin(currentClass) {
    return winningCombos.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if (draw) {
        dataEndGameMessageTextElement.innerText = "DRAW"
    } else {
        if (oTurn == true) {
            dataEndGameMessageTextElement.innerText = "O WINS"
        } else {
            dataEndGameMessageTextElement.innerText = "X WINS"
        }
    }
    dataEndGameMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(oClass)
    })
}
