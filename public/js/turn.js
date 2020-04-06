//GLOBAL VARIABLES
let diamond = '\u2B26'
let circle = '\u20DD'
let redStyle = 'col m-1 px-2 pick-red'
let blueStyle = 'col m-1 pt-3 px-2 pick-blue'

//function to pass turn to other team
const passTurn = () => {
    if (currentPlayer == 'red') {
        currentPlayer = 'blue'
    } else {
        currentPlayer = 'red'
    }
    updatePlayer()
    socket.emit('change player', currentPlayer)
}



//function for card clicks
const clickCard = (e) => {
    var word = e.target.textContent
    //SCENARIO: Assassin card gets picked & game ends
    if (assassin == word) {
        e.target.textContent = 'X'
        e.target.setAttribute('class', 'col m-1 py-1 px-2 pick-assassin')
        endGame()
        socket.emit('card click', word)
        //SCENARIO: red team picks word correctly & gets another turn until they pass turn to blue
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
        socket.emit('card click', word)
        //SCENARIO: red team picks blue word, turn ends
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
        socket.emit('card click', word)
        //SCENARIO blue team picks word correctly & gets another turn until they pass turn to red
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
        socket.emit('card click', word)
        //SCENARIO: blue team picks red word, turn ends
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
        socket.emit('card click', word)
        //SCENARIO: either team picks bystander card, turn ends      
    } else if (bystander.includes(word)) {
        pickedWords.push(word)
        console.log(pickedWords)
        //display and style selection of bystander card
        e.target.setAttribute('class', 'col m-1 pb-1 px-2 pick-bystander')
        e.target.textContent = ' - '
        //emit card click back to server & catching word to blast to everyone
        socket.emit('card click', word)
        //end turn and change player to other team
        passTurn()
    }
}


//receive clicks from other team and update their board
socket.on('card click', word => {
    console.log('someone clicked:' + word)
    for (const card of board) {
        if ((card.textContent === word) && (red.words.includes(word))) {
            //display and style selection of red card
            card.setAttribute('class', redStyle)
            card.textContent = diamond
            pickedWords.push(word)
            console.log(pickedWords)
            //update remaining cards
            red.remainingCards = red.remainingCards - 1
            updateRemainingCards()
        } else if ((card.textContent === word) && (blue.words.includes(word))) {
            //display and style selection of blue card
            card.setAttribute('class', blueStyle)
            card.textContent = circle
            pickedWords.push(word)
            console.log(pickedWords)
            //update remaining cards
            blue.remainingCards = blue.remainingCards - 1
            updateRemainingCards()
        } else if ((card.textContent === word) && (bystander.includes(word))) {
            card.setAttribute('class', 'col m-1 pb-1 px-2 pick-bystander')
            card.textContent = ' - '
            pickedWords.push(word)
            console.log("OLD PLAYER:", currentPlayer)
            passTurn()
            console.log("NEW PLAYA", currentPlayer)
            console.log(pickedWords)
        } else if ((card.textContent === word)) {
            card.textContent = 'X'
            card.setAttribute('class', 'col m-1 py-1 px-2 pick-assassin')
            endGame()
        }
    }
})


//receive player update
socket.on('change player', player => {
    currentPlayer = player
    console.log("I CAUGHT IT:", currentPlayer)
    updatePlayer()
})