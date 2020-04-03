//toggle spymaster view if cards haven't been selected
const toggleSpy = () => {
    for (let i = 0; i < board.length; i++) {
        if (!pickedWords.includes(gameWords[i])) {
            if (red.words.includes(gameWords[i])) {
                board[i].setAttribute("class", "col m-2 py-5 px-2 spy-red")
            } else if (blue.words.includes(gameWords[i])) {
                board[i].setAttribute("class", "col m-2 py-5 px-2 spy-blue")
            } else if ((assassin.includes(gameWords[i])) && (!bystander.includes(gameWords[i]))) {
                board[i].setAttribute("class", "col m-2 py-5 px-2 spy-assassin")
            }
        }
    }
}


//toggle player view if cards haven"t been selected
const togglePlayer = () => {
    for (let i = 0; i < board.length; i++) {
        if (!pickedWords.includes(gameWords[i])) {
            board[i].setAttribute("class", "col m-2 py-5 px-2")
        }
    }
}

//add event listener on toggle buttons
document.getElementById("spymaster-mode").addEventListener("click", toggleSpy)
document.getElementById("player-mode").addEventListener("click", togglePlayer)




