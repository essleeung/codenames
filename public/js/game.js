// var gameWords = ["fridge", "banana", "stars", "laser", "island", "mouse", "Hawaii", "lamp", "hi", "cat", "dog", "zebra", "fence", "comb", "tropics", "mountain", "pasta", "fever", "needle", "cup", "keys", "mirror", "tree", "fish", "tulip"]
var board = document.getElementsByClassName("col")
var currentPlayer = ""
var pickedWords = []
var assassin, bystander

//team constructor
class Team {
  constructor(color) {
    this.teamName = color
    this.words = []
    this.remainingCards = 0
  }
}
//create red & blue
var red = new Team("red")
var blue = new Team("blue")

//function to print words onto board
const printWords = () => {
  for (let i = 0; i < gameWords.length; i++) {
    board[i].textContent = gameWords[i];
  }
}
// shuffle words into new array 
// const shuffle = (array) => {
//   let newArray = []
//   while (newArray.length < array.length) {
//     let index = Math.floor(Math.random() * array.length)
//     if (!newArray.includes(array[index])) {
//       newArray.push(array[index])
//     }
//   } return newArray
// }
//set up words for each team
const setBoard = (color, color2) => {
  console.log(newWords)
  color.words = newWords.splice(0, 9)
  color.remainingCards = 9
  color2.words = newWords.splice(0, 8)
  color2.remainingCards = 8
  bystander = newWords.splice(0, 7)
  assassin = newWords.splice(0, 1)
  console.log("bystander: " + bystander)
  console.log("assassin: " + assassin)
  console.log(color)
  console.log(color2)
}
// function to update current player display
const updatePlayer = () => {
  document.getElementById("currentPlayer").textContent = currentPlayer + "'s"
  if (currentPlayer == "red") {
    //set current player to match color
    document.getElementById("currentPlayer").setAttribute("class", "red-font")
  } else {
    document.getElementById("currentPlayer").setAttribute("class", "blue-font")
  }
}
//function to update remaining card display
const updateRemainingCards = () => {
  document.getElementById("blue").textContent = blue.remainingCards
  document.getElementById("red").textContent = red.remainingCards
}

//game start function
const startGame = () => {
  printWords()
  // newWords = [...gameWords]
  // gameWords = shuffle(gameWords)
  //randomize who goes first & set game board accordingly. first team gets 9 cards, 2nd team gets 8, 7 for the bystander & 1 card for the assassin
  if (Math.random() < 0.5) {
    currentPlayer = "red"
    setBoard(red, blue)
  } else {
    currentPlayer = "blue"
    setBoard(blue, red)
  } //print current player onto board & remaining cards
  updatePlayer()
  updateRemainingCards()
}


//getting game words
socket.on('get words', words => {
  gameWords = words
  // console.log("words received!", words)
})
socket.on('new words', words => {
  newWords = words
  console.log("received  new words:", newWords)
})

//start game on dom content load
document.addEventListener("DOMContentLoaded", () => {
  socket.emit('get words')
  socket.emit('new words')
})