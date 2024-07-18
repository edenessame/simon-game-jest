/**
 * @jest-environment jsdom
 */

const { game } = require("../game");

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
});