/**
 * object to store global state
 * sets the variables to 0 and the choices buttons
 * so the tests in game.test.js are correct
 * later referenced for example as game.score
 */
let game = {
    currentGame: [],
    playerMoves: [],
    score: 0,
    turnNumber: 0,
    lastButton: "",
    turnInProgress: false,
    choices: ["button1", "button2", "button3", "button4"]
};

/**
 * set the keys in the game object to 0 or empty arrays
 * 
 * runs a for loop through all the elements with a class name of "circle"
 * and if the data-listener atribute does not equal true add the event listener "click"
 * then (e) is the event object, the click object to be referenced later
 * so we can then use (e) to get the targets ID, so depending on which circle we clickon, the ID will be button1/button2 etc
 * and store that in the variable: move
 * then call the lights on function, passing it move: lightsOn(move); to iluminate the correct circle
 * make lastButton "move" - stores "move" in lastButton
 * push that move into game.playerMoves array
 * then call playerTurn function
 * then set the data-listener attribute on our circle to true
 * 
 * call showScore function
 * call addTurn
 */
function newGame() {
    game.currentGame = [];
    game.playerMoves = [];
    game.score = 0;

    for (let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") !== "true") {
            circle.addEventListener("click", (e) => {
                if (game.currentGame.length > 0 && !game.turnInProgress) {// only accept a click if currentGame length is greater than 0 and not game.turnInProgress
                    let move = e.target.getAttribute("id");
                    game.lastButton = move;
                    game.playerMoves.push(move);
                    lightsOn(move);
                    playerTurn();
                }
            });
            circle.setAttribute("data-listener", "true");
        }
    }
    showScore();
    addTurn();
}

/**
 * clear playerMoves array
 * randomly add a button ID to currentGame array, push that into the computer sequence array
 * [(Math.floor(Math.random() * 4))] generates a random number between 1 and 3 to add to select from the choices array
 * the resulting choice is pushed onto the currentGame array
 * call showTurns function
 */
function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();
}

/**
 * call lightsOn function with the ID of one of the circles
 * so this is refered to in the function as "circ"
 * get the element
 * add "light" class
 * set the class to be removed after 400 milliseconds
 * 
 */
function lightsOn(circ) {
    document.getElementById(circ).classList.add("light");
    setTimeout(function () {
        document.getElementById(circ).classList.remove("light");
    }, 400);
}

/**
 * set game.turnInProgress = true; so cant click while the computer is playing
 * set turnNumber to 0
 * use that as the array index number for currentGame array
 * call lightsOn function inside a JS set interval
 * which makes sure we have a pause between the lights being shown and the next step in the sequence
 * then incrementing the turnNumber
 * then an if statement that if our turnNumber is equal or over the length of currentGame array, 
 * then the sequence is complete and to clear the interval 
 * then set game.turnInProgress = false; so the user can play
 * 800 is the interval time
 */
function showTurns() {
    game.turnInProgress = true;
    game.turnNumber = 0;
    let turns = setInterval(function () {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false;
        }
    }, 800);
}

/**
 * gets the last element from playerMoves array- let i = game.playerMoves.length - 1;
 * so we can compare that with the same index in currentGame array
 * if the player gets the answer correct, these two should match
 * if they do increment gameScore
 * call showScore and addTurn functions
 * else send a warning alert and call newGame function
 */
function playerTurn() {
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length === game.playerMoves.length) {
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        alert("Wrong move!");
        newGame();
    }
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

/**
 * export the functions to import them in game.test.js
 */
module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };