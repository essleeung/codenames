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

//function to remove styles
const removeStyle = () => {
    for (let i = 0; i < gameWords.length; i++) {
        document.getElementById(i).setAttribute('class', 'col m-2 py-5 px-2')
    }
}

//start game function
const startGame = () => {
    pickedWords = []
    document.getElementById('msg').textContent = ' '
    //replace start game with new game button
    document.getElementById('start').style.display = 'none'
    document.getElementById('new-game').style.display = 'inline-block'
    document.getElementById('turn-display').style.display = 'block'
    document.getElementById('card-display').style.display = 'block'
    document.getElementById('new-game').addEventListener('click', newGame)
    //add event listener on toggle buttons
    document.getElementById('spymaster-mode').addEventListener('click', toggleSpy)
    document.getElementById('player-mode').addEventListener('click', togglePlayer)

    initializeGame()
}
const endGame = () => {
    document.getElementById('msg').textContent = 'Game over!'
    for (const card of board) {
        card.removeEventListener('click', clickCard)
    }
    document.getElementById('next-player').removeEventListener('click', passTurn)
    document.getElementById('spymaster-mode').removeEventListener('click', toggleSpy)
    document.getElementById('spymaster-mode').removeEventListener('click', togglePlayer)
    document.getElementsByClassName('btn-group-toggle').disabled
}

//After finishing first game, can start a new round by making call to server for new words
const newGame = () => {
    //go server side to get new words
    console.log("OLD WORDS:", gameWords, "new words", newWords)
    socket.emit('next game')
    removeStyle()
    // startGame()
}


// getting game words round 2
socket.on('next game', (words, words2) => {
    console.log("gameWORDS RD2", words)
    console.log("SERVER DELIVERED RD2", words2)
    gameWords = [...words]
    newWords = [...words2]
    startGame()
    console.log("GET IT New red:", red.words, "new blue:", blue.words)
})

