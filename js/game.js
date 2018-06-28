!function() {
  function ticTacToe() {
    /*==========================================================
       PAGE CREATION
    ===========================================================*/
    //START SCREEN
    //Creates elements for the start screen and appends them to the DOM
    const startScreen = document.createElement('div');
    const startHeader = document.createElement('header');
    const gameTitle = document.createElement('h1');
    const twoPlayerButton = document.createElement('a');
    const body = document.getElementsByTagName('body')[0];
    const onePlayerDiv = document.createElement('div');
    const onePlayerButton = document.createElement('a');
    const onePlayerNameDiv = document.createElement('div');
    const onePlayerNameInput = document.createElement('input');
    const p1NameDiv = document.createElement('div');
    const p2NameDiv = document.createElement('div');
    const p1NameInput = document.createElement('input');
    const p2NameInput = document.createElement('input');
    onePlayerNameInput.placeholder = "Player name"
    onePlayerNameInput.style.marginBottom = "2em";
    onePlayerNameInput.style.color = "#FFA000";
    p1NameInput.style.color = "#FFA000";
    p2NameInput.style.color = "#3688C3";
    p1NameInput.placeholder = "Player 1 name";
    p2NameInput.placeholder = "Player 2 name";
    startScreen.className = "screen screen-start";
    startScreen.id = "start";
    gameTitle.textContent = "Tic Tac Toe"
    twoPlayerButton.href = "#";
    twoPlayerButton.className = "button";
    twoPlayerButton.textContent = "2P: Player vs. Player";
    onePlayerButton.href = "#";
    onePlayerButton.className = "button";
    onePlayerButton.textContent = "1P: Player vs. AI";
    onePlayerButton.style.marginTop = "2em";
    startScreen.appendChild(startHeader);
    startHeader.appendChild(gameTitle);
    startHeader.appendChild(twoPlayerButton);
    startHeader.insertBefore(onePlayerDiv, twoPlayerButton);
    startHeader.insertBefore(onePlayerNameDiv, twoPlayerButton);
    onePlayerNameDiv.appendChild(onePlayerNameInput);
    onePlayerDiv.appendChild(onePlayerButton);
    startHeader.appendChild(p1NameDiv);
    startHeader.appendChild(p2NameDiv);
    p1NameDiv.appendChild(p1NameInput);
    p2NameDiv.appendChild(p2NameInput);
    body.appendChild(startScreen);

    //GAME OVER SCREEN
    //Creates elements for the game over screen and appends them to the DOM
    //Hides the page until there is a winner or draw
    const gameOverScreen = document.createElement('div');
    const endHeader = document.createElement('header');
    const endTitle = document.createElement('h1');
    const endMessage = document.createElement('p');
    const newGameButton = document.createElement('a');
    gameOverScreen.className = "screen screen-win";
    gameOverScreen.id = "finish";
    endTitle.textContent = "Tic Tac Toe";
    endMessage.className = "message";
    newGameButton.href = "#";
    newGameButton.className = "button";
    newGameButton.textContent = "New game";
    gameOverScreen.appendChild(endHeader);
    endHeader.appendChild(endTitle);
    endHeader.appendChild(endMessage);
    endHeader.appendChild(newGameButton);
    gameOverScreen.style.display = "none";
    body.appendChild(gameOverScreen);

    //GAME BOARD
    //Creates an element to display names
    //Appends elements to the respective player divs
    const p1 = document.getElementById('player1');
    const p2 = document.getElementById('player2');
    const p1Name = document.createElement('h3');
    const p2Name = document.createElement('h3');
    p1.appendChild(p1Name);
    p2.appendChild(p2Name);

    /*===========================================================
        START BUTTONS
    ============================================================*/
    //When "start" button is clicked, checks to make sure required names are given
    //If names are given, start screen is hidden, revealing game board
    //Populates name elements with input from start screen
    //Initiates 2-player game programming
    twoPlayerButton.addEventListener('click', () => {
      if (p1NameInput.value == "" && p2NameInput.value == "") {
        p1NameInput.className = "invalid";
        p2NameInput.className = "invalid";

      } else if (p1NameInput.value == "") {
        p1NameInput.className = "invalid";

      } else if (p2NameInput.value == "") {
        p2NameInput.className = "invalid";

      } else {
        p1Name.textContent = p1NameInput.value;
        p2Name.textContent = p2NameInput.value;
        startScreen.style.display = "none";
        twoPlayerPvP();
      }
    });

    //When 1P: vs. AI button is clicked, checks to make sure required name is given
    //If name is given, start screen is hidden, revealing game board
    //Populates name elements with input from start screen and array of famous AIs
    //Initiates 1-player game programming
    onePlayerButton.addEventListener('click', () => {
      if (onePlayerNameInput.value == "") {
        onePlayerNameInput.className = "invalid";

      } else {
        p1Name.textContent = onePlayerNameInput.value;
        p2Name.textContent = famousAIs[Math.floor(Math.random() * 10) + 1];
        startScreen.style.display = "none";
        p2.id = "ai";
        onePlayerPvA();
      }
    });


    /*===========================================================
        2P GAME PvP
    ============================================================*/
    //Variables
    //Selects all boxes on the game board
    //Sets player 1 as active for turn 1
    //Sets a turn counter
    const boxes = document.querySelectorAll('.box');
    p1.classList.add('active');
    p1Name.style.color = "#fff";
    let turns = 0;

    //Programming for a 2-player game
    //Iterates over all boxes
    //Listens for clicks on each box
    //If box is not filled, it will be filled based on players turns
    //Turn counter increments and alternates players turn
    const twoPlayerPvP = () => {
      boxes.forEach(box => {
        box.addEventListener('click', () => {
          if (event.target.className == 'box') {
            if (turns % 2 === 0) {
              event.target.classList.add('box-filled-1');
              p1.classList.remove('active');
              p1Name.style.color = "#ccc";
              p2.classList.add('active');
              p2Name.style.color = "#fff";
              turns += 1;
              winAnalyzer();
            } else if (turns % 2 !== 0) {
              event.target.classList.add('box-filled-2');
              p1.classList.add('active');
              p1Name.style.color = "#fff";
              p2.classList.remove('active');
              p2Name.style.color = "#ccc";
              turns += 1;
              winAnalyzer();
            }
          }
        });

    //Listens for a mouse over each box
    //If the box hasn't been selected it will display the image associated with the player whose turn it is
        box.addEventListener('mouseover', () => {
          if (event.target.className == 'box') {
            if (turns % 2 === 0) {
              event.target.style.backgroundImage = "url('img/o.svg')"
            } else if (turns % 2 !== 0) {
              event.target.style.backgroundImage = "url('img/x.svg')"
            }
          }
        });

    //Listens for a mouse to leave each box
    //Removes background image
        box.addEventListener('mouseleave', () => {
          if (event.target.className == 'box') {
              event.target.style.backgroundImage = ""
          }
        });
      });
    }


    /*===========================================================
        WIN ANALYZER
    ============================================================*/
    //An array of possible win combinations
    const possibleWins = [
      [boxes[0], boxes[1], boxes[2]],
      [boxes[0], boxes[3], boxes[6]],
      [boxes[0], boxes[4], boxes[8]],
      [boxes[1], boxes[4], boxes[7]],
      [boxes[2], boxes[4], boxes[6]],
      [boxes[2], boxes[5], boxes[8]],
      [boxes[3], boxes[4], boxes[5]],
      [boxes[6], boxes[7], boxes[8]]
    ];

    //Iterates over all possible wins combinations
    //Checks to see if any combination contains the same specified class, otherwise, indicates a tie
    //Edits the game over screen accordingly and displays it on the page
    const winAnalyzer = () => {
      possibleWins.forEach(possibility => {
        if (possibility[0].classList.contains('box-filled-1') &&
            possibility[1].classList.contains('box-filled-1') &&
            possibility[2].classList.contains('box-filled-1')) {

          gameOverScreen.classList.add("screen-win-one");
          endMessage.textContent = p1Name.textContent + " Wins!";
          gameOverScreen.style.display = "block";

        } else if (possibility[0].classList.contains('box-filled-2') &&
                   possibility[1].classList.contains('box-filled-2') &&
                   possibility[2].classList.contains('box-filled-2')) {

          gameOverScreen.classList.add("screen-win-two");
          endMessage.textContent = p2Name.textContent + " Wins!";
          gameOverScreen.style.display = "block";

        } else if (possibility[0].classList.contains('box-filled-3') &&
                   possibility[1].classList.contains('box-filled-3') &&
                   possibility[2].classList.contains('box-filled-3')) {

          gameOverScreen.classList.add("screen-win-three");
          endMessage.textContent = p2Name.textContent + " Wins!";
          gameOverScreen.style.display = "block";

        } else if (turns === 9 && gameOverScreen.style.display == "none") {

          gameOverScreen.classList.add('screen-win-tie');
          endMessage.textContent = "It's a tie!"
          gameOverScreen.style.display = "block";
        }
      });
    }

    /*==========================================================
        RESET
    ==========================================================*/
    //Resets all default classes and styles
    //Resets turn counter
    //Iterates over all boxes and resets class names and background images
    //If game is 1P vs AI, A new AI challenger is chosen
    const reset = () => {
      p1.classList.add('active');
      p2.classList.remove('active');
      p1Name.style.color = "#fff";
      p2Name.style.color = "#ccc";
      startScreen.style.display = "none";
      gameOverScreen.style.display = "none";
      gameOverScreen.className = "screen screen-win"
      turns = 0;

      boxes.forEach(box => {
        box.className = "box";
        box.style.backgroundImage = "";
      });

      famousAIs.forEach(AI => {
        if (p2Name == AI) {
          p2Name = famousAIs[Math.floor(Math.random() * 10) + 1];
        }
      });
    }

    //Listens for clicks on the "new game" button
    //Calls the reset function on click
    newGameButton.addEventListener('click', () => {
      reset();
    });


    /*==========================================================
        1P GAME PvA
    ==========================================================*/
    //An array of AI's for potential challengers
    const famousAIs = [
      "Skynet",
      "Ultron Prime",
      "J.A.R.V.I.S.",
      "C.L.U.",
      "Femputer",
      "Gort",
      "Brainiac",
      "C3PO",
      "Data",
      "HAL 9000"
    ];

    //A true array of spaces on the board for AI's reference
    const origBoard = [boxes[0], boxes[1], boxes[2], boxes[3], boxes[4], boxes[5], boxes[6], boxes[7], boxes[8]];

    //Sets all the boxes Id's equal to their index
    for (i = 0; i < boxes.length; i += 1) {
      boxes[i].id = i;
    }

    let availableBoxes;

    //Function that encapsulates the AIs complete turn
    //Updates the availableBoxes array by filtering out all selected boxes in origBoard array
    //Randomly generates a number between 0 and the number of available boxes
    //Uses the random number as an index for the AIs box choice
    //Switches active players, along with styling
    //Turn counter increments
    //Analyzes board for a win or draw
    const aiTurn = () => {
      availableBoxes = origBoard.filter(box => box.className === "box");
      let aiMoveIndex = Math.floor(Math.random() * availableBoxes.length);
      availableBoxes[aiMoveIndex].classList.add('box-filled-3');
      p1.classList.add('active');
      p1Name.style.color = "#fff";
      p2.classList.remove('active');
      p2Name.style.color = "#ccc";
      turns += 1;
      winAnalyzer();
    }

    //Player vs AI gameplay function
    //Iterates over all boxes and listens for clicks on each box
    //If a box that hasn't been selected is clicked, its marked for Player and active player is switched, along with stylings
    //Turn counter increments
    //Analyzes for a win or draw
    //If the game hasn't ended, aiTurn function is called, which is delayed randomly for a duration of 1-3 seconds.
    const onePlayerPvA = () => {
      boxes.forEach(box => {
        box.addEventListener('click', () => {
          if (event.target.className == 'box') {
            if (turns % 2 === 0) {
              event.target.classList.add('box-filled-1');
              p1.classList.remove('active');
              p1Name.style.color = "#ccc";
              p2.classList.add('active');
              p2Name.style.color = "#fff";
              turns += 1;
              winAnalyzer()
              if (gameOverScreen.style.display == "none") {
                setTimeout(aiTurn, Math.floor((Math.random() * 3) * 1000));
              }
            }
          }
        });

    //Listens for a mouse over each box
    //If the box hasn't been selected it will display the image associated with the player whose turn it is
        box.addEventListener('mouseover', () => {
          if (event.target.className == 'box') {
            event.target.style.backgroundImage = "url('img/o.svg')"
          }
        });

    //Listens for a mouse to leave each box
    //Removes background image
        box.addEventListener('mouseleave', () => {
          if (event.target.className == 'box') {
              event.target.style.backgroundImage = ""
          }
        });
      });
    }
  };

  ticTacToe();
}();
