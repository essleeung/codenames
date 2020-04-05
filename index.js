// Require express; declare app variable
let express = require('express')
let app = express()
var fs = require('fs')


// Configure http and socket.io
let http = require('http').Server(app)
let io = require('socket.io')(http)
app.use(express.static('public'))

// Define home route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})


// ========VARIABLES=========
var nextWordsServer = []
var shuffleServer = []


// ========FUNCTIONS=========
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
//function to randomize starting team
const randomizePlayer = () => {
  if (Math.random() < 0.5) {
    player = 'red'
  } else {
    player = 'blue'
  }
  return player
}

// ========LISTENERS=========
// Define socket settings (listeners)
io.on('connection', socket => {
  console.log('Someone has connected')

  //send words & randomized player to client
  socket.on('next game', () => {
    nextWordsServer = getWords()
    shuffleServer = (shuffle([...nextWordsServer]))
    nextPlayer = randomizePlayer()
    io.emit('next game', nextWordsServer, shuffleServer, nextPlayer)
  })

// change player on pass turn
  socket.on('change player', currentPlayer  => {
 player = currentPlayer
  io.emit('change player', player)
  console.log("SENDING THEM THIS BAD BOY:", player)
})

  //card clicks
  socket.on('card click', word => {
    console.log(word)
    io.emit('card click', word)
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
