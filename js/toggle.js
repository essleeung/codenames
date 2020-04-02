//function to change styles
const changeStyle = (array, style) => {
    for (let i=0; i < array.length; i++) {
        indexOf = gameWords.indexOf(array[i])
        document.getElementById(indexOf).setAttribute('class', "col m-2 py-5 px-2 " + style)
        }
} 
//function to remove styles
const removeStyle = (array, style) => {
    for (let i=0; i < array.length; i++) {
        indexOf = gameWords.indexOf(array[i])
        document.getElementById(indexOf).setAttribute('class', "col m-2 py-5 px-2 ")
        }
} 

//toggle spymaster view
const toggleSpy = () => {
    changeStyle(red.words, 'spy-red')
    changeStyle(blue.words, 'spy-blue')
    changeStyle(assassin, 'spy-assassin')
}
//toggle player view
const togglePlayer = () => {
    removeStyle(gameWords, 'spy-red')
    removeStyle(gameWords, 'spy-blue')
    removeStyle(gameWords, 'spy-assassin')
}

//add event listener on toggle buttons
document.getElementById('spymaster-mode').addEventListener('click', toggleSpy)
document.getElementById('player-mode').addEventListener('click', togglePlayer)

