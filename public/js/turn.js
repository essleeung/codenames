let diamond = '\u2B26'
let circle = '\u20DD'
//function to pass turn to other team
const passTurn = () => {
    if (currentPlayer == 'red') {
        currentPlayer = 'blue'
        updatePlayer()
    } else {
        currentPlayer = 'red'
        updatePlayer()
    }
}
const clickCard = (e) => {
    var word = e.target.textContent
    let redStyle = 'col m-1 px-2 pick-red'
    let blueStyle = 'col m-1 pt-3 px-2 pick-blue'
    //Scenario: Assassin card gets picked & game ends
    if (assassin == word) {
        e.target.textContent = 'X'
        e.target.setAttribute('class', 'col m-1 py-1 px-2 pick-assassin')
        endGame()
        //Scenario: red team picks word correctly & gets another turn until they pass turn to blue
    } else if (currentPlayer == 'red' && (red.words.includes(word))) {
        //add selected word to keep track
        pickedWords.push(word)
        console.log(pickedWords)
        //display and style selection of red card
        e.target.textContent = diamond
        e.target.setAttribute('class', redStyle)
        //update remaining cards
        red.remainingCards = red.remainingCards - 1
        updateRemainingCards()
        //Scenario: red team picks blue word, turn ends
    } else if (currentPlayer == 'red' && (blue.words.includes(word))) {
        //add selected word to keep track
        pickedWords.push(word)
        console.log(pickedWords)
        //display and style selection of blue card
        e.target.textContent = circle
        e.target.setAttribute('class', blueStyle)
        //update remaining cards
        blue.remainingCards = blue.remainingCards - 1
        updateRemainingCards()
        //end turn and change player to other team
        passTurn()
        //Scenario: blue team picks word correctly & gets another turn until they pass turn to red
    } else if (currentPlayer == 'blue' && (blue.words.includes(word))) {
        //add selected word to keep track
        pickedWords.push(word)
        console.log(pickedWords)
        //display and style selection of blue card
        e.target.textContent = circle
        e.target.setAttribute('class', blueStyle)
        //update remaining cards
        blue.remainingCards = blue.remainingCards - 1
        updateRemainingCards()
        //Scenario: blue team picks red word, turn ends
    } else if (currentPlayer == 'blue' && (red.words.includes(word))) {
        //add selected word to keep track
        pickedWords.push(word)
        console.log(pickedWords)
        //display and style selection of red card
        e.target.textContent = diamond
        e.target.setAttribute('class', redStyle)
        //update remaining cards
        red.remainingCards = red.remainingCards - 1
        updateRemainingCards()
        //end turn and change player to other team
        passTurn()
        //Scenario: either team picks bystander card, turn ends      
    } else if (bystander.includes(word)) {
        pickedWords.push(word)
        console.log(pickedWords)
        //display and style selection of bystander card
        e.target.setAttribute('class', 'col m-1 pb-1 px-2 pick-bystander')
        e.target.textContent = ' - '
        //end turn and change player to other team
        passTurn()
        //emit card click back to server & catching word to blast to everyone
        socket.emit('card click', word)
    }
}

//enable click on all squares
console.log(board)
for (const card of board) {
    card.addEventListener('click', clickCard)
}
//add event listeners on pass turn buttons
document.getElementById('next-player').addEventListener('click', passTurn)

//receive neutral click from other team
socket.on('card click', word => {
    console.log('someone clicked:' + word)
    for (const card of board) {
        if (card.textContent === word) {
            card.setAttribute('class', 'col m-1 pb-1 px-2 pick-bystander')
            card.textContent = ' - '
            pickedWords.push(word)
            console.log(pickedWords)
        }
        
    }
})