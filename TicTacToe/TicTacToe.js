let currentPlayer = "X";
let gameStatus = ""; // "" - continue game, "Tie", "X Wins", "O Wins"
let numTurns = 0;
let idNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

// reset board and all variables
function newGame() {
	
	// reset board
	for (var i = 0; i < idNames.length; i++) {
		document.getElementById(idNames[i]).innerHTML = "";
	} // for
	
	numTurns = 0;
	gameStatus = "";
	currentPlayer = "X";
	
	changeVisibility("controls");
	
} // newGame

// randomly chooses a free box for computer
function computerTakeTurn() {
	let cb = [];
	let idName = "";
	let block = false;     //flags whether to place an "O" has already been placed to block "x"
	currentPlayer = "O";
	
	// loop through the board to get all elements
	cb[0] = ""; // not going to use
	cb[1] = getInput("one");
	cb[2] = getInput("two");
	cb[3] = getInput("three");
	cb[4] = getInput("four");
	cb[5] = getInput("five");
	cb[6] = getInput("six");
	cb[7] = getInput("seven");
	cb[8] = getInput("eight");
	cb[9] = getInput("nine");
	
	// makes sure opponent does not have two boxes in a row, in a column or a diagonal
	for (i = 0;  i < 3; i++) {
		        // horizontal check
		if (cb[1 + 3 * i] == cb[2 + 3 * i] && cb[1 + 3 * i] != "" && cb[3+3*i] == "" ){ // if po1 and 2 are the same, and po3 is empty
			document.getElementById(idNames[3 - 1 + 3 * i]).innerHTML = currentPlayer;
			block = true;
			break; // make no more moves
		} else if (cb[2 + 3 * i] == cb[3 + 3 * i] && cb[2 + 3 * i] != "" &&cb[1+3*i] == "") {        // check if po2 and 3 are the same, and po1 is empty
		    document.getElementById(idNames[1 -1 + 3 * i]).innerHTML = currentPlayer;
			block = true;
			break;
		} else if (cb[1 + 3 * i] == cb[3 + 3 * i] && cb[1 + 3 * i] != "" && cb[2+3*i] == "") {        //check if po 1 and 3 are the same, and po2 is empty
		    document.getElementById(idNames[2 - 1 + 3 * i]).innerHTML = currentPlayer;
			block = true;
			break;

		// vertical check
		} else if (cb[1 + i] == cb[4 +  i] && cb[1 +  i] != "" && cb[7 + i] == "" ) { // if po1 and 4 are the same, and po3 is empty
			document.getElementById(idNames[7 - 1 + i]).innerHTML = currentPlayer;
			block = true;
			break; // makes no more moves
		} else if (cb[4 + i] == cb[7 + i] && cb[4 + i] != "" && cb[1 + i] == "") {        // check if po4 and 7 are the same, and po1 is empty
		    document.getElementById(idNames[1 - 1 + i]).innerHTML = currentPlayer;
			block = true;
			break;
		} else if (cb[1 + i] == cb[7 + i] && cb[1 + i] != "" && cb[4 + i] == "") {        // check if po 1 and 7 are the same, and po2 is empty
		    document.getElementById(idNames[4 - 1 + i]).innerHTML = currentPlayer;
			block = true;

		// negative diagonal check
		} else if (cb[1] == cb[5] && cb[1] != "" && cb[9] == "" ) { // if po1 and 5 are the same, and po3 is empty
			document.getElementById(idNames[9 - 1]).innerHTML = currentPlayer;
			block = true;
			break; // make no more moves
		} else if ( cb[5] == cb[9] && cb[5] != "" && cb[1] == "") {        // check if po5 and 9 are the same, and po1 is empty
		    document.getElementById(idNames[1-1]).innerHTML = currentPlayer;
			block = true;
			break;
		} else if (cb[1] == cb[9] && cb[1] != "" && cb[5] == "") {        // check if po 1 and 9 are the same, and po2 is empty
		    document.getElementById(idNames[5 - 1]).innerHTML = currentPlayer;
			block = true;

		// positive diagonal check
		} else if (cb[3] == cb[5] && cb[3] != "" && cb[7] == "" ) { // if po3 and 5 are the same, and po3 is empty
			document.getElementById(idNames[7 - 1]).innerHTML = currentPlayer;
			block = true;
			break; // make no more moves
		} else if ( cb[5] == cb[7] && cb[5] != "" && cb[3] == "") {        // check if po5 and 7 are the same, and po1 is empty
		    document.getElementById(idNames[3 - 1]).innerHTML = currentPlayer;
			block = true;
			break;
		} else if (cb[3] == cb[7] && cb[3] != "" && cb[5] == "") {        // check if po 3 and 7 are the same, and po2 is empty
		    document.getElementById(idNames[5 - 1]).innerHTML = currentPlayer;
			block = true;
		} else {
		} // else
		
	} // for
	
	// choose random boxes until an empty box is found
       if (block == false)
	{
		do {
			let rand = parseInt(Math.random()*9) +1; // 1-9
			idName = idNames[rand-1];
			
			// check if chosen box is empty
			if (document.getElementById(idName).innerHTML == "") {
				document.getElementById(idName).innerHTML = currentPlayer;
				break;
			} // if
	
		} while(true);
	}

} // computerTakeTurn

function getInput(index) {
	var input = "";
	var item= document.getElementById(index).innerHTML;
	if (item =="X" || item =="O")
	{
		input = item;
	}

	return input;
} // getInput

// take player turn
function playerTakeTurn(e) {
	
	if (e.innerHTML == "")  {
		e.innerHTML = currentPlayer;
		checkGameStatus();
		
		// if game not over, computer goes
		if (gameStatus == "") {
			setTimeout(function() {
					computerTakeTurn();
					checkGameStatus();
				}, 500
			);
		} // if
		
	} else {
		showLightBox("This box is already selected.", "Please select an open box.");
		return;
	} // else

} // playerTakeTurn

// after each turn, check for a winner, a tie,
// or continue playing
function checkGameStatus() {
	numTurns++; // count turn
	
	// check for a win
	if (checkWin()) {
		gameStatus = currentPlayer + " wins!";
	} // if
	
	// check for tie
	if (numTurns == 9) {
		gameStatus = "Tie Game";
	} // if
	
	// switch current player
	currentPlayer = (currentPlayer == "X" ? "O" : "X");
	
	// game is over
	if (gameStatus != "") {
		setTimeout(function() {showLightBox(gameStatus, "Game Over.");}, 500);
	} // if
	
} // checkGameStatus

// check for a Win, there are 8 win paths
function checkWin() {
	let cb = []; // current board
	cb[0] = ""; // not going to use
	cb[1] = document.getElementById("one").innerHTML;
	cb[2] = document.getElementById("two").innerHTML;
	cb[3] = document.getElementById("three").innerHTML;
	cb[4] = document.getElementById("four").innerHTML;
	cb[5] = document.getElementById("five").innerHTML;
	cb[6] = document.getElementById("six").innerHTML;
	cb[7] = document.getElementById("seven").innerHTML;
	cb[8] = document.getElementById("eight").innerHTML;
	cb[9] = document.getElementById("nine").innerHTML;
	
	// top row
	if (cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]) {
		return true;
	}
	
	// middle row
	if (cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6]) {
		return true;
	}
	
	// bottom row
	if (cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9]) {
		return true;
	}
	
	// left column
	if (cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7]) {
		return true;
	}
	
	// middle column
	if (cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8]) {
		return true;
	}
	
	// right column
	if (cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9]) {
		return true;
	}
    
	// negative diagonal
	if (cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9]) {
		return true;
	}
	
	// positive diagonal
	if (cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7]) {
		return true;
	}
	
} // checkWin

// change the visibility of ID
function changeVisibility(divID) {
	var element = document.getElementById(divID);
	
	// if ellement exists, it is considered true
	if (element) {
		element.className = (element.className == 'hidden') ? 'unhidden' : 'hidden';
	} // if
	
} // changeVisibility

// display message in lightbox
function showLightBox(message, message2) {
	
	// set messages
	document.getElementById("message").innerHTML = message;
	document.getElementById("message2").innerHTML = message2;
	
	// show lightbox
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
	
} // showLightBox

// close light box
function continueGame() {
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
	
	// if the game is over, show controls
	if (gameStatus != "") {
		changeVisibility("controls");
	} // if
	
} // continueGame
