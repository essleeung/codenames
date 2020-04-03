//function to remove styles
const removeStyle = () => {
    for (let i = 0; i < gameWords.length; i++) {
        document.getElementById(i).setAttribute("class", "col m-2 py-5 px-2")
    }
}

//reset game function
const resetGame = () => {
    pickedWords = []
    document.getElementById('msg').textContent = ""
    startGame()
    removeStyle()

    // TODO: Get new gameWords/newWords
    // This means separating the "start game" and "reset game" functionality
}
