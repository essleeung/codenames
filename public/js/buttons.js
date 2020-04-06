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
    document.getElementById('msg').textContent = 'GAME OVER! THE ASSASSIN WAS CONTACTED!'
    document.getElementById('next-player').removeEventListener('click', passTurn)
    document.getElementById('spymaster-mode').removeEventListener('click', toggleSpy)
    document.getElementById('player-mode').removeEventListener('click', togglePlayer)
}

// fetch words on game load
document.addEventListener('DOMContentLoaded', () => {
    //add event listener to start game button
    document.getElementById('start').addEventListener('click', startGame)

})



// getting new game info from server
socket.on('next game', (words, words2, nextPlayer) => {
    gameWords = [...words]
    newWords = [...words2]
    currentPlayer = nextPlayer
    removeStyle()
    initializeGame()
})

socket.on('end game', click = () => {
    endGame()
    console.log('yOU GUYS LSOT!')
})
