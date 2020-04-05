//toggle spymaster view if cards haven't been selected
const toggleSpy = () => {
    //disable card selection when spymaster view is toggled
    if (document.getElementsByName('view')[0].checked) {
        for (const card of board) {
            card.removeEventListener('click', clickCard)
        }
    }
    //show each type of game word array
    for (let i = 0; i < board.length; i++) {
        if (!pickedWords.includes(gameWords[i])) {
            if (red.words.includes(gameWords[i])) {
                board[i].setAttribute('class', 'col m-2 py-5 px-2 spy-red')
            } else if (blue.words.includes(gameWords[i])) {
                board[i].setAttribute('class', 'col m-2 py-5 px-2 spy-blue')
            } else if ((assassin.includes(gameWords[i])) && (!bystander.includes(gameWords[i]))) {
                board[i].setAttribute('class', 'col m-2 py-5 px-2 spy-assassin')
            }
        }
    }
    
    
}


//toggle player view if cards haven't been selected
const togglePlayer = () => {
    //enable card selection by players
    if (document.getElementsByName('view')[1].checked) {
        for (const card of board) {
            card.addEventListener('click', clickCard)
        }
    }
    //revert back to player view
    for (let i = 0; i < board.length; i++) {
        if (!pickedWords.includes(gameWords[i])) {
            board[i].setAttribute('class', 'col m-2 py-5 px-2')
        }
    }
}





