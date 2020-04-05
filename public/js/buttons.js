//function to remove styles
const removeStyle = () => {
    for (let i = 0; i < gameWords.length; i++) {
        document.getElementById(i).setAttribute('class', 'col m-2 py-5 px-2')
    }
    document.getElementById('msg').textContent =''
}

// start game function
const startGame = () => {
    //make call to server for words
    socket.emit('next game')
    displayElements()
    //set up board and display words, turn & player info
    initializeGame()
    gameState = true
    //emit game started back to server
    socket.emit('starting click', gameState)
}
 

//After finishing first game, can start a new round by making call to server for new words
const newGame = () => {
    //go server side to get new words
    console.log("OLD WORDS:", gameWords, "new words", newWords)
    socket.emit('next game')
    //remove all previous styling & make previous display reappear
    removeStyle()
}

const endGame = () => {
    for (const card of board) {
        card.removeEventListener('click', clickCard)
    }
    document.getElementById('next-player').removeEventListener('click', passTurn)
    document.getElementById('spymaster-mode').removeEventListener('click', toggleSpy)
    document.getElementById('player-mode').removeEventListener('click', togglePlayer)
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
// fetch words on game load
document.addEventListener('DOMContentLoaded', () => {
    // call to server to get first set of words
    // socket.emit('get words')
    //add event listener to start game button
    document.getElementById('start').addEventListener('click', startGame)
    
})

// getting game words round from server
socket.on('next game', (words, words2) => {
    console.log("server gameWORDS ", words)
    console.log("SERVER newWords", words2)
    gameWords = [...words]
    newWords = [...words2]
    console.log("GET IT  red:", red.words, "new blue:", blue.words)
    initializeGame()
})

//receive game state from other team
socket.on('starting click', gameState => {
    console.log("someone started the game", gameState)
    if (gameState === true) {
       displayElements()
    }

})