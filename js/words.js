var fs = require('fs')
var gameWords = []
//Function to shuffle words into new array 
const shuffle = (array) => {
    let newArray = []
    while (newArray.length < array.length) {
      let index = Math.floor(Math.random() * array.length)
      if (!newArray.includes(array[index])) {
        newArray.push(array[index])
      }
    } return newArray
  }

// read text file into array, shuffle all words and return array
const getWords = () => {
    let data = ''
    try {
        data = fs.readFileSync(__dirname + '/../words.txt', 'utf8')
    }
    catch (err) {
        console.log('error!')
        //default words to start game in case file sync error
        return ['fridge', 'banana', 'stars', 'laser', 'island', 'mouse', 'Hawaii', 'lamp','hi', 'cat', 'dog', 'zebra', 'fence', 'comb', 'tropics', 'mountain', 'pasta', 'fever', 'needle', 'cup', 'keys', 'mirror', 'tree', 'fish', 'tulip']
    }
    let allWords = data.toString().split('\n')
    //return a subset of 25 shuffled words
    return shuffle(allWords).splice(0,25)
}

gameWords = getWords()
console.log('Game words are:', gameWords)

