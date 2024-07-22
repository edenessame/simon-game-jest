
/**
 * @jest-environment jsdom
 */

/**
 * import the functions from game.js to test
 * they must be exported from game.js
 */
const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game");

/**
 * send an alert if anything interesting happens
 * so spy on the window and then send an "alert"
 * alert is a method of the window object
 * so we are going to catch it and divert it harmlessly into an empty function
 */
jest.spyOn(window, "alert").mockImplementation(() => { });

/**
 * loads index.html into jesta mock dom
 * install the fs library
 * set a variable and say what to read= let fileContents = fs.readFileSync("index.html", "utf-8");
 * then open - write it to the variable and close
 * !!! this code will be the same for every html file you want to load to the dom
 */
beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

/**
 * test these corresponding keys exist in game.js
 * they are in the object- let game {score: 0, currentGame[], etc} 
 * they are then referenced later as game.score game.currentGame
 */
describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices contain correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
    });
    test("lastButton key exists", () => {
        expect("lastButton" in game).toBe(true);
    });
    test("turnInProgress key exists", () => {
        expect("turnInProgress" in game).toBe(true);
    });
    test("turnInProgress key value is false", () => {
        expect("turnInProgress" in game).toBe(true);
    });
});

/**
 * beforeall function: set up the game state with some fake values to see if the newgame function resets them
 * set the score in the DOM to 42 beforeAll to test it gets reset by newGame
 * tests the questions against the variables in game.js
 * 
 * gets the elements with the class name: circle, stores them in the variable: elements
 * a for loop gets each "element" in "elements" and expects them to have the data-listener atribute set to true
 */
describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("should clear the player moves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test("should add one move to the computer's game array", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("expect data-listener to be true", () => {
        newGame();
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    });
});

/**
 * beforeAll runs before all tests are run
 * beforeEach runs before each test is run
 * afterEach resets the game state after the test, so tests can be run in any order
 * beforeeach turn sets the score to 0 
 * and emptys the currentGame and playerMoves arrays 
 * calls addTurn function
 * and does the same after
 * tests addTurn adds a new turn: expect(game.currentGame.length).toBe(2);
 * tests it lights up the element
 * test showTurns function
 */
describe("gameplay works correctly", () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test("should increment the score if the turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]); // push the currentGame move int the playerMoves array
        playerTurn();
        expect(game.score).toBe(1); // after calling playerTurn we expect the score to have increased, it should start at 0
    });
    test("clicking during computer sequence should fail", () => {
        showTurns();
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    });
});