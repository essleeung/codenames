//function to remove styles
const removeStyle = () => {
    for (let i = 0; i < gameWords.length; i++) {
        document.getElementById(i).setAttribute("class", "col m-2 py-5 px-2")
    }
}

//reset game function
const resetGame = () => {
    pickedWords = []
    newWords = []
    document.getElementById('msg').textContent = ""
    startGame()
    removeStyle()
}

//add eventlistener to new game button 
document.getElementById("reset").addEventListener("click", resetGame)