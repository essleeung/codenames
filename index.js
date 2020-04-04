// Require express; declare app variable
let express = require('express')
let app = express()
var fs = require('fs')
var gameWords = []
var newWords = []

// Configure http and socket.io
let http = require('http').Server(app)
let io = require('socket.io')(http)
app.use(express.static('public'))

// Define home route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// shuffle function
const shuffle = (array) => {
  let newArray = []
  while (newArray.length < array.length) {
    let index = Math.floor(Math.random() * array.length)
    if (!newArray.includes(array[index])) {
      newArray.push(array[index])
    }
  } return newArray
}

// read text file of 400 words into array, shuffle all words and return array of 25
const getWords = () => {
  let data = ''
  try {
    data = fs.readFileSync(__dirname + '/words.txt', 'utf8')
  }
  catch (err) {
    console.log('error!', err)
    //default words to start game in case file sync error
    return ['fridge', 'banana', 'stars', 'laser', 'island', 'mouse', 'Hawaii', 'lamp', 'hi', 'cat', 'dog', 'zebra', 'fence', 'comb', 'tropics', 'mountain', 'pasta', 'fever', 'needle', 'cup', 'keys', 'mirror', 'tree', 'fish', 'tulip']
  }
  let allWords = data.toString().split('\n')
  //return a subset of 25 shuffled words
  return shuffle(allWords).splice(0, 25)
}

// these game words are for printing on the board
gameWords = getWords()
// this is another shuffled array to ensure teams don't get words in sequential order
newWords = shuffle([...gameWords])

var nextWords = []
// var nextShuffled = []
getWords()
shuffle([...nextWords])
// Define socket settings (listeners)
io.on('connection', socket => {
  console.log('Someone has connected')
  console.log("nextWords", nextWords)

  //first round of words on DOMContent load
  socket.on('get words', () => {
    console.log('Game words are:' + gameWords)
    io.emit('get words', gameWords)
  })
  socket.on('new words', () => {
    console.log('newWords are:' + newWords)
    io.emit('new words', newWords)
  })

  //card clicks
  socket.on('card click', word => {
    console.log(word)
    io.emit('card click', word)
  })

  //subsequent rounds words
  socket.on('next game', () => {
    // nextWords = getWords()
    nextWords = getWords()
    console.log("nextWords shuffle 2: electric boogaloo", shuffle([...nextWords]))
    console.log(shuffle([...nextWords]))
    console.log('next round GW:', nextWords)
    io.emit('next game', nextWords)
  })
  // socket.on('next shuffle', () => {
  //   // nextShuffled = shuffle([...nextWords])
  //   nextShuffled = shuffle([...nextWords])

  //   console.log('next shuffle GW:', nextShuffled)
  //   io.emit('next game', nextShuffled)
  // })

  //on disconnect
  socket.on('disconnect', () => {
    console.log('Byeeee')
  })
})

// Listen on port 3000
http.listen(process.env.PORT || 3000, () => {
  console.log('Listening!')
})
