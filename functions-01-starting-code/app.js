const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK'
const PAPER = 'PAPER'
const SCISSORS = 'SCISSORS'
const DEFAULT_USER_CHOICE = ROCK
const RESULT_DRAW = 'Draw'
const COMPUTER_WIN = 'Computer Win'
const PLAYER_WIN = 'Player Win'

let gameIsRunning = false

const getPlayerChoice = function () {
  const selection = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}?`, '').toUpperCase()
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert(`Invalid choice! We chose ${DEFAULT_USER_CHOICE} for you.`)
    return
  }
  return selection
}

const getComputerChoice = function () {
  const randomValue = Math.floor(Math.random() * 3)
  if (randomValue === 0) {
    return ROCK
  } else if (randomValue === 1) {
    return PAPER
  } else {
    return SCISSORS
  }
}

const getWinner = (com, player = DEFAULT_USER_CHOICE) =>
  com === player
    ? RESULT_DRAW : com === ROCK && player === PAPER || com === PAPER && player === SCISSORS || com === SCISSORS && player === ROCK
      ? PLAYER_WIN : COMPUTER_WIN
// if (com === player) {
//   return RESULT_DRAW
// } else if (com === ROCK && player === PAPER || com === PAPER && player === SCISSORS || com === SCISSORS && player === ROCK) {
//   return PLAYER_WIN
// } else {
//   return COMPUTER_WIN
// }


startGameBtn.addEventListener('click', () => {
  if (gameIsRunning) {
    return
  }
  gameIsRunning = true
  console.log('Game is starting...')
  const playerSelection = getPlayerChoice()
  const computerSelection = getComputerChoice()
  let winner
  if (playerSelection) {
    winner = getWinner(computerSelection, playerSelection)
  } else {
    winner = getWinner(computerSelection)
  }
  let message = `You picked ${playerSelection || DEFAULT_USER_CHOICE}, computer picked ${computerSelection}, therefore you `
  if (winner === RESULT_DRAW) {
    message += 'had a draw.'
  } else if (winner === PLAYER_WIN) {
    message += 'won.'
  } else {
    message += 'lost.'
  }
  console.log(message)
  gameIsRunning = false
})
