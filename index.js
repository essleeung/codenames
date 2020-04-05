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

var nextWordsServer = []
var shuffleServer = []
// Define socket settings (listeners)
io.on('connection', socket => {
  console.log('Someone has connected')

  //function to shuffle and return words to client
  socket.on('get words', () => {
    //server console log
    console.log('ROUND 1 STEP11:', gameWords, "ROUND1 NEW", newWords)
    io.emit('get words', gameWords, newWords)
  })
  

  //card clicks
  socket.on('card click', word => {
    console.log(word)
    io.emit('card click', word)
  })

  //subsequent rounds words
  socket.on('next game', () => {
    nextWordsServer = getWords()
    shuffleServer = (shuffle([...nextWordsServer]))
    console.log('SERVER ROUND2:', nextWordsServer)
    console.log("SHUFFLE ROUND2 electric boogaloo", shuffleServer)
    io.emit('next game', nextWordsServer, shuffleServer)
  })


  //on disconnect
  socket.on('disconnect', () => {
    console.log('Byeeee')
  })
})

// Listen on port 3000
http.listen(process.env.PORT || 3000, () => {
  console.log('Listening!')
})
