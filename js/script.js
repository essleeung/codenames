//get words from text file

//TO REMOVE: while getting that sorted use this random array
var gameWords = ['fridge', 'banana', 'stars', 'laser', 'island', 'mouse', 'Hawaii', 'lamp','hi', 'cat', 'dog', 'zebra', 'fence', 'comb', 'tropics', 'mountain', 'pasta', 'fever', 'needle', 'cup', 'keys', 'mirror', 'tree', 'fish', 'tulip']
let board = document.getElementsByClassName('col')
let currentPlayer = ''
let newWords = []

//team constructor
class Team {
    constructor(color) {
        this.teamName = color
        this.words = []
        this.remainingCards = 0
    }
}
//create red & blue
var red = new Team('red')
var blue = new Team('blue')

//function to print words onto board
const printWords = () => {
    for (let i = 0; i < gameWords.length; i++) {
        board[i].textContent = gameWords[i];
    }
}

//shuffle words into new array 
const shuffle = (array) => {
  while (newWords.length < 25) {
    let index = Math.floor(Math.random() * array.length)
    if (!newWords.includes(array[index])) {
      newWords.push(array[index])
    }
  } return newWords
}

//game start function
const startGame = () => {
    printWords()
    shuffle(gameWords)
 
    //randomize who goes first & set game board accordingly. first team gets 9 cards, 2nd team gets 8, 7 for the bystander & 1 card for the assassin
    if (Math.random() < 0.5) {
        currentPlayer = 'red'
        //set current player to match color
        document.getElementById('currentPlayer').setAttribute('class', 'red-font')
        red.words = newWords.splice(0,9)
        red.remainingCards = 9
        blue.words = newWords.splice(0,8)
        blue.remainingCards = 8
        bystander = newWords.splice(0,7)
        assassin = newWords.splice(0,1) 
        console.log("bystander: " + bystander)
        console.log("assassin: " + assassin)
        console.log (red)
        console.log (blue)
    } else {
        currentPlayer = 'blue'
        document.getElementById('currentPlayer').setAttribute('class', 'blue-font')
        blue.words = newWords.splice(0,9)
        blue.remainingCards = 9
        red.words = newWords.splice(0,8)
        red.remainingCards = 8
        bystander = newWords.splice(0,7)
        assassin = newWords.splice(0,1)
        console.log("bystander: " + bystander)
        console.log("assassin: " + assassin)
        console.log (red)
        console.log (blue)
    } //print current player onto board & remaining cards
    document.getElementById('currentPlayer').textContent = currentPlayer +"'s"
    document.getElementById('blue').textContent = blue.remainingCards
    document.getElementById('red').textContent = red.remainingCards
}

//start game on dom content load
document.addEventListener('DOMContentLoaded', startGame)


