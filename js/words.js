var gameWords = []
// read text file into array, shuffle all words and return array
var fs = require('fs')
const getWords = () => {
    fs.readFile(__dirname + '/../words.txt', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        } let allWords = data.toString().split('\n')
        console.log(allWords)
    })
}

//function to print words onto board
const printWords = () => {
    for (let i = 0; i < gameWords.length; i++) {
        board[i].textContent = gameWords[i];
    }
}

//shuffle words into new array 
const shuffle = (words) => {
  while (newWords.length < 25) {
    let index = Math.floor(Math.random() * words.length)
    if (!newWords.includes(words[index])) {
      newWords.push(words[index])
    }
  } return newWords
}
