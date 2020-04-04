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
    initializeGame()
    //replace start game with new game button
    document.getElementById('start').style.display = 'none'
    document.getElementById('new-game').style.display = 'inline-block'
    document.getElementById('turn-display').style.display = 'block'
    document.getElementById('card-display').style.display = 'block'
    document.getElementById('new-game').addEventListener('click', newGame)
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

const newGame = () => {
    //go server side to get new words
   
    console.log("next round:", gameWords, "new words", newWords)
    // socket.emit('next game', nextWords)
    //send this back to other player (new shuffled words)
    removeStyle()
    startGame()
}

    
// getting game words
socket.on('next game', words => {
    console.log("gameWORDS", words)
    gameWords = [...words]
    // newWords = [...words2]
  })
  
//   socket.on('next shuffle', words => {
//     newWords = [...words]
//   })
  