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

// button roll will update firebase with real time info
document.querySelector(".btn-roll").addEventListener("click", function() {
    if (session.gamePlaying) {
        // Random Number
        session.diceRoll = Math.floor(Math.random() * 6) + 1;

        if (session.diceRoll !== 1) {
            // add score
            session.roundScore += session.diceRoll;
            // document.querySelector(
            //     "#current-" + session.activePlayer
            // ).textContent = session.roundScore;

            // updating info on firebase
            database.ref().set(session);
        } else {
            // updating info on firebase
            database.ref().set(session);
        }
    }
});

// reference data in firebase
database.ref().on("value", function(snapshot) {
    var session = snapshot.val();
    console.log(session);

    if (session.gamePlaying) {
        document.querySelector(".dice").style.display = "block";
        document.querySelector(".dice").src =
            "assets/images/dice-" + session.diceRoll + ".png";

        document.querySelector("#current-" + session.activePlayer).textContent =
            session.roundScore;

        if (session.diceRoll === 1) {
            alert(
                "player " +
                    (session.activePlayer + 1) +
                    "rolled " +
                    session.diceRoll
            );
            nextPlayer();
        }
    }
});

function nextPlayer() {
    //Next Player's turn reset the roundScore

    // reset round score to 0
    session.roundScore = 0;
    document.querySelector("#current-" + session.activePlayer).textContent =
        session.roundScore;

    //if active player is one then assign 1 to active player, else active player = 0

    // ternary operator if active player is 0 then change it to one and vice versa
    session.activePlayer === 0
        ? (session.activePlayer = 1)
        : (session.activePlayer = 0);

    database.ref().set(session.roundScore);
    database.ref().set(session.activePlayer);

    // change players according to the activePlayer
    // toggle method checks to see if active class exists if it does it will remove it, if it doesn't it will create it.
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    // then make sure the dice is hidden when the next player starts
    document.querySelector(".dice").style.display = "none";
}
