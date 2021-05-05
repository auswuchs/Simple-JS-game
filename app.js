var $start = document.querySelector('#start') // game start button
var $game = document.querySelector('#game') // game area
var $time = document.querySelector('#time') // header timer
var $result = document.querySelector('#result') // total score
var $timeHeader = document.querySelector('#time-header') // header timer h1
var $resultHeader = document.querySelector('#result-header') // header game score area
var $gameTime = document.querySelector('#game-time') // footer timer input


/* array of game object colors */
var colors = ['#194350', '#ff8882', '#ffc2b4', '#9dbeb9', '#393e46', '#00adb5', '#aad8d3', '#1b1a17', '#810000', '#7b113a', '#798777']
var score = 0 // total score 
var isGameStarted = false // check if the game started yet


$start.addEventListener('click', startGame) // starts the game
$game.addEventListener('click', handleBoxClick) // increases the total score by clicking on an object
$gameTime.addEventListener('input', setGameTime) // listening to the entered time from input   

/* removes the display: none css class */
function show($elem) {
   $elem.classList.remove('hide')
}

/* adds the display: none css class */
function hide($elem) {
   $elem.classList.add('hide')
}

/* starts the game, executed by pressing start button */
function startGame() {
   score = 0 // sets the score at the start
   setGameTime() // executed started time from input function 
   $gameTime.setAttribute('disabled', 'true') // disables input during the game
   hide($start) // hides start button 
   $game.style.backgroundColor = '#fff' // changes the game area background
   isGameStarted = true // sets the game started status true

   /* refreshing header timer every 100ms function  */
   var tickrate = setInterval(() => {
      var time = parseFloat($time.textContent) // taking only numbers from time input

      /* checking if it's enough time to substract from timer */
      if (time >= 0.1) {
         $time.textContent = (time - 0.1).toFixed(1) //  every 100ms substracting time from timer and leave one digit after decimal point
      } else {
         /* end game 
         stops timer function from updating */
         clearInterval(tickrate)
         endGame()

      }
   }, 100);
   /* calls the new element render function */
   renderBox()
}

/* shows total score in the h1 header tag */
function setGameScore() {
   $result.textContent = score.toString()
}

/* game time from input */
function setGameTime() {
   var time = +$gameTime.value // takes footer time input value
   $time.textContent = time.toFixed(1) // shows  footer time input value in header h1 tag 
   show($timeHeader) // removes display: none class from header game timer
   hide($resultHeader) // adds display: none class to header game result 
}

/* end the game function */
function endGame() {
   isGameStarted = false // sets the game started status false
   setGameScore(); // shows total game score in the h1 header tag
   $gameTime.removeAttribute('disabled') // enables time input 
   show($start) // removes display: none class from start button
   $game.style.backgroundColor = '#ccc' // changes the game area background color
   $game.innerHTML = '' // removes all items from the game area
   hide($timeHeader) // adds display: none class to header game timer
   show($resultHeader) // removes display: none class from header game result
}

/* executes when we click on the item in the game area */
function handleBoxClick(event) {
   if (isGameStarted) { // checking if the game started then continue
      if (event.target.dataset.box) { // continue if element we've clicked have dataset named box 
         score++ // increments the total score by one
         renderBox() // renders new item in the game area
      }
   } else { // checking if the game started
      return
   }

}


/* render new item in the game area */
function renderBox() {
   $game.innerHTML = '' // deletes all the rest items in the game area
   var box = document.createElement('div') // creates item we have to click on
   var boxSize = getRandom(30, 100) // random item size from the random function, first min value, second max  
   var gameSize = $game.getBoundingClientRect() // checking game area size
   var maxTop = gameSize.height - boxSize // the maximum top distance in the game area we can create item 
   var maxLeft = gameSize.width - boxSize // the maximum horizonal distance in the game area we can create item 
   var randomColor = colors[getRandom(0, colors.length)] // picks random color from the color array

   box.style.position = 'absolute' // sets position absolute to the item
   box.style.height = box.style.width = boxSize + 'px' // sets width and height to the item
   box.style.borderRadius = '50%' // sets rounded corners
   box.style.backgroundColor = randomColor // sets the random color to the item
   box.style.top = getRandom(0, maxTop) + 'px' // the distance from the top at which the element will be created, takes 0 as min and maxTop as max value
   box.style.left = getRandom(0, maxLeft) + 'px' //  the distance from the left at which the element will be created, takes 0 as min and maxLeft as max value
   box.style.cursor = 'pointer' // sets cursor pointer when hover
   box.setAttribute('data-box', 'true') // sets dataset to an item by which we can determine it in the handleBoxClick function 

   $game.insertAdjacentElement('afterbegin', box) // sets the item into the DOM game area after begin 

}

/* function returns random number from min to max range */
function getRandom(min, max) {
   var randomNum = Math.floor(Math.random() * (max - min) + min)
   return randomNum
}