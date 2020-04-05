//function to remove styles
const removeStyle = () => {
    for (let i = 0; i < gameWords.length; i++) {
        document.getElementById(i).setAttribute('class', 'col m-2 py-5 px-2')
    }
    document.getElementById('msg').textContent = ''
}

// start game function
const startGame = () => {
    //make call to server for words
    socket.emit('next game')
}


//After finishing first game, can start a new round by making call to server for new words
const newGame = () => {
    //go server side to get new words
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

// fetch words on game load
document.addEventListener('DOMContentLoaded', () => {
    //add event listener to start game button
    document.getElementById('start').addEventListener('click', startGame)

})

// getting game words round from server
socket.on('next game', (words, words2, nextPlayer) => {
    console.log("server gameWORDS ", words)
    console.log("SERVER newWords", words2)
    gameWords = [...words]
    newWords = [...words2]
    console.log("GET IT  red:", red.words, "new blue:", blue.words)
    console.log("WHO GO NEXT?", nextPlayer)
    currentPlayer = nextPlayer
    console.log("GOBBLYBOOK", currentPlayer)
    initializeGame()
})

