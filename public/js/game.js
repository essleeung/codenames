// var gameWords = ['fridge', 'banana', 'stars', 'laser', 'island', 'mouse', 'Hawaii', 'lamp', 'hi', 'cat', 'dog', 'zebra', 'fence', 'comb', 'tropics', 'mountain', 'pasta', 'fever', 'needle', 'cup', 'keys', 'mirror', 'tree', 'fish', 'tulip']
var board = document.getElementsByClassName('col')
var currentPlayer, gameState, assassin, bystander
var pickedWords = []
var newWords = []
var gameWords = []

//team constructor
class Team {
  constructor(color) {
    this.teamName = color
    this.words = []
    this.remainingCards = 0
  }
}

// create red & blue
var red = new Team('red')
var blue = new Team('blue')

// function to print words onto board
const printWords = () => {
  for (let i = 0; i < gameWords.length; i++) {
    board[i].textContent = gameWords[i];
  }
}

//set up words for each team
const setBoard = (color, color2) => {
  color.words = newWords.splice(0, 9)
  color.remainingCards = 9
  color2.words = newWords.splice(0, 8)
  color2.remainingCards = 8
  bystander = newWords.splice(0, 7)
  assassin = newWords.splice(0, 1)
  console.log('bystander: ' + bystander)
  console.log('assassin: ' + assassin)
  console.log(color)
  console.log(color2)
  //enable click on all squares & toggle buttons
  for (const card of board) {
    card.addEventListener('click', clickCard)
  }
  document.getElementById('spymaster-mode').addEventListener('click', toggleSpy)
  document.getElementById('player-mode').addEventListener('click', togglePlayer)
}


//function to update remaining card display
const updateRemainingCards = () => {
  if (blue.remainingCards === 0) {
    document.getElementById('msg').textContent = 'BLUE team wins!'
    document.getElementById('msg').style.color = '#4169e1'
    document.getElementById('blue').textContent = blue.remainingCards
    endGame()
  } else if (red.remainingCards === 0) {
    document.getElementById('msg').textContent = 'RED team wins!'
    document.getElementById('msg').style.color = '#dc143c'
    document.getElementById('red').textContent = red.remainingCards
    endGame()
  } else {
    document.getElementById('blue').textContent = blue.remainingCards
    document.getElementById('red').textContent = red.remainingCards
  }
}

//initialize game function
const initializeGame = () => {
  updatePlayer()
  printWords()
  if (currentPlayer === 'red') {
    setBoard(red, blue)
  } else {
    setBoard(blue, red)
  } 
  //print current player onto board & remaining cards
  displayElements() 
  updateRemainingCards()
  
}


//change player display
const updatePlayer = () => {
  if (currentPlayer === 'red') {
    //set current player to match color
    document.getElementById('currentPlayer').setAttribute('class', 'red-font')
  } else {
    document.getElementById('currentPlayer').setAttribute('class', 'blue-font')
  }
  document.getElementById('currentPlayer').textContent = currentPlayer + "'s"
}

//displays buttons and text
const displayElements = () => {
  //replace start game with new game button
  document.getElementById('start').style.display = 'none'
  document.getElementById('new-game').style.display = 'inline-block'
  document.getElementById('new-game').addEventListener('click', newGame)
  //show & add event listener on toggle buttons
  document.getElementById('toggle-btns').style.display = 'inline-block'
  //show turn & card text
  document.getElementById('turn-display').style.display = 'block'
  document.getElementById('card-display').style.display = 'block'
  //show pass turn button
  document.getElementById('next-player').style.display = 'inline-block'
  document.getElementById('next-player').addEventListener('click', passTurn)
}