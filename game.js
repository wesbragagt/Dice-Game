/*
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBozDYdRMbs_bbSFB1tEsSAUEtHdKY-f94",
    authDomain: "online-pig-game.firebaseapp.com",
    databaseURL: "https://online-pig-game.firebaseio.com",
    projectId: "online-pig-game",
    storageBucket: "online-pig-game.appspot.com",
    messagingSenderId: "1086968331811"
};
firebase.initializeApp(config);

var database = firebase.database();

var session = {
    diceRoll: 0,
    gScore: [0, 0],
    roundScore: 0,
    activePlayer: 0,
    gamePlaying: true
};
// init();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (session.gamePlaying) {
        // Random Number
        session.diceRoll = Math.floor(Math.random() * 6) + 1;
        // add score
        session.roundScore += session.diceRoll;
        // updates database
        database.ref().set(session);

        // retrive info from database
        database.ref().on("value", function(snapshot) {
            var session = snapshot.val();
            // display the dice roll number
            document.querySelector(".dice").src =
                "assets/images/dice-" + session.diceRoll + ".png";

            document.querySelector(".dice").style.display = "block";

            // display current
            document.querySelector(
                "#current-" + session.activePlayer
            ).textContent = session.roundScore;
        });

        // else {
        //     alert("You rolled 1, next player");
        //     nextPlayer();
        // }

        // updating info on firebase
    }
});

// document.querySelector(".btn-hold").addEventListener("click", function() {
//     if (session.gamePlaying) {
//         // add current score to global score
//         session.gScore[session.activePlayer] += session.roundScore;
//         //update the UI
//         document.querySelector("#score-" + session.activePlayer).textContent =
//             session.gScore[session.activePlayer];

//         // check if the player won the game
//         if (session.gScore[session.activePlayer] >= 10) {
//             document.querySelector(
//                 "#name-" + session.activePlayer
//             ).textContent = "Winner!";

//             document.querySelector(".dice").style.display = "none";

//             document
//                 .querySelector(".player-" + session.activePlayer + "-panel")
//                 .classList.add("winner");
//             document
//                 .querySelector(".player-" + session.activePlayer + "-panel")
//                 .classList.remove("active");

//             session.gamePlaying = false;
//         } else {
//             // change player after hold being pressed
//             nextPlayer();
//         }
//     }
//     database.ref().set(session);
// });

// document.querySelector(".btn-new").addEventListener("click", init);

// function nextPlayer() {
//     //Next Player's turn reset the roundScore

//     // reset round score to 0
//     session.roundScore = 0;
//     document.querySelector("#current-" + session.activePlayer).textContent =
//         session.roundScore;

//     //if active player is one then assign 1 to active player, else active player = 0

//     // ternary operator if active player is 0 then change it to one and vice versa
//     session.activePlayer === 0
//         ? (session.activePlayer = 1)
//         : (session.activePlayer = 0);

//     // change players according to the activePlayer
//     // toggle method checks to see if active class exists if it does it will remove it, if it doesn't it will create it.
//     document.querySelector(".player-0-panel").classList.toggle("active");
//     document.querySelector(".player-1-panel").classList.toggle("active");

//     // then make sure the dice is hidden when the next player starts
//     document.querySelector(".dice").style.display = "none";
// }

// function init() {
//     session.diceRoll = 0;
//     session.gScore = [0, 0];
//     session.roundScore = 0;
//     session.activePlayer = 0;
//     session.gamePlaying = true;

//     // when page load do not display the dice
//     document.querySelector(".dice").style.display = "none";

//     document.getElementById("score-0").textContent = "0";
//     document.getElementById("score-1").textContent = "0";

//     document.getElementById("current-0").textContent = "0";
//     document.getElementById("current-1").textContent = "0";

//     document.getElementById("name-0").textContent = "Player 1";
//     document.getElementById("name-1").textContent = "Player 2";

//     document.querySelector(".player-0-panel").classList.remove("winner");
//     document.querySelector(".player-1-panel").classList.remove("winner");

//     document
//         .querySelector(".player-" + session.activePlayer + "-panel")
//         .classList.remove("active");
//     document
//         .querySelector(".player-" + session.activePlayer + "-panel")
//         .classList.add("active");

//     database.ref().set(session);
// }
