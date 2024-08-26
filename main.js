console.log("Welcome to tic tac toe.");
let music = new Audio("sounds/music.mp3");
let audioTurn = new Audio("sounds/ting.mp3");
let gameover = new Audio("sounds/gameover.mp3");
let turn = "X";
let isgameover = false;

const changeTurn = () => {
    return turn === "X" ? "0" : "X";
}

// Winning logic
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];

    // Check for a win
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[2]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[0]].innerText !== "")) {

            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            isgameover = true;

            // Visual effects for the win
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
            return;  // Exit early if a win is detected
        }
    });

    // If no win, check for a draw
    if (!isgameover) {
        let isDraw = true;
        Array.from(boxtext).forEach(tile => {
            if (tile.innerText === "") {
                isDraw = false;  // There's still an empty tile, so it's not a draw
            }
        });

        if (isDraw) {
            isgameover = true;
            document.querySelector('.info').innerText = "Oops! It's a draw.";  // Display draw message
        }
    }
};

// Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (isgameover) return;  // Stop further clicks if game is over
        if (boxtext.innerText === "") {  // Only allow marking an empty box
            boxtext.innerText = turn;
            checkWin();
            if (!isgameover) {  // Only change the turn if game is not over
                turn = changeTurn();
                audioTurn.play();
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

// Reset button logic
document.getElementById('reset').addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(e => {
        e.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
});
