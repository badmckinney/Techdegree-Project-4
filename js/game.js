/*================
   START SCREEN
=================*/
//Creates Elements for the start screen and appends them to the DOM
const startScreen = document.createElement('div');
const startHeader = document.createElement('header');
const gameTitle = document.createElement('h1');
const startButton = document.createElement('a');
const body = document.getElementsByTagName('body')[0];
startScreen.className = "screen screen-start";
startScreen.id = "start";
gameTitle.textContent = "Tic Tac Toe"
startButton.href = "#";
startButton.className = "button";
startButton.textContent = "Start game";
startScreen.appendChild(startHeader);
startHeader.appendChild(gameTitle);
startHeader.appendChild(startButton);
body.appendChild(startScreen);


/*===========
    START
===========*/

startButton.addEventListener('click', () => {
  startScreen.style.display = "none";
});
