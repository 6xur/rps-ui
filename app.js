const history = [];
var playerWins = 0;
var computerWins = 0;
var ties = 0;
var round = 1;

function startGame(){
    const playerHand = document.querySelector('.player-hand');
    const computerHand = document.querySelector('.computer-hand');
    const moves = Array.from(document.querySelectorAll('.moves div'));

    moves.forEach(move => {
        move.addEventListener('click', function(){
            const computerMove = aiMove();
            const playerMove = this.className;  // must save class name first because we'll change it later

            // clicked effect for button
            this.classList.add('user-clicked');

            // shaking animation
            playerHand.classList.add('shake-player-animation');
            computerHand.classList.add('shake-computer-animation');

            // timeout set to 1000 because shaking animation takes 1s
            setTimeout(() =>{
                // update hand images
                setHand(playerHand, playerMove);
                setHand(computerHand, computerMove);

                // remove clicked effect and animation after 1s
                this.classList.remove('user-clicked');
                playerHand.classList.remove('shake-player-animation');
                computerHand.classList.remove('shake-computer-animation');
                
                updateHistory(playerMove, round, computerMove);
                updateScores(playerMove, computerMove);
                incrementRound();  // start of new round
            }, 1000)
        });
    });
}

function setHand(hand, move){
    hand.src = `./assets/${move}.png`;
}

function aiMove(){
    const moves = ["rock", "paper", "scissors"];
    return moves[Math.floor(Math.random() * moves.length)];
}

function incrementRound(){
    const roundText = document.querySelector('.round');
    round++;
    roundText.textContent = "ROUND " + round;
}

function getWinner(playerMove, computerMove){
    const winAgainst = {
        "rock" : "scissors",
        "paper" : "rock",
        "scissors" : "paper"
    }

    const loseTo = {
        "rock" : "paper",
        "paper" : "scissors",
        "scissors" : "rock"
    }

    if(winAgainst[playerMove] === computerMove){  // player wins
        return "player";
    } else if(loseTo[playerMove] === computerMove){  // computer wins
        return "computer";
    } else{
        return null;
    }
}

function updateScores(playerMove, computerMove){
    const winner = getWinner(playerMove, computerMove);

    if(winner === "player"){
        playerWins++;
        document.querySelector('.player-wins p').textContent = playerWins;
    } else if(winner === "computer"){
        computerWins++;
        document.querySelector('.computer-wins p').textContent = computerWins;
    } else{
        ties++;
        document.querySelector('.ties p').textContent = ties;
    }
}

// updates the history table
function updateHistory(playerMove, round, computerMove){
    const winner = getWinner(playerMove, computerMove);
    const play = {playerMove: playerMove, round: round, computerMove: computerMove, winner: winner};

    // limit the size of history to 3
    history.push(play);
    if(history.length > 3){
        history.shift();
    }

    //console.log(play);

    var i;
    for(i = 0; i < history.length; i++){
        const play = history[history.length - 1 - i];
        const player = document.getElementById("player" + i);
        const computer =  document.getElementById("computer" + i);
        const round = document.getElementById("round" + i);

        // update winner text color
        if(play.winner === "player"){
            player.style.color = "yellow";
            computer.style.color = "gainsboro";
        } else if(play.winner === "computer"){
            computer.style.color = "yellow";
            player.style.color = "gainsboro";
        } else {  // no color if tie
            computer.style.color = "gainsboro";
            player.style.color = "gainsboro";
        }

        // update past rounds information
        player.textContent = play.playerMove[0].toUpperCase();
        round.textContent = play.round;
        computer.textContent = play.computerMove[0].toUpperCase();
        
        // make each play visible as they are played
        document.getElementById("row" + i).style = "visibility:visible;";
    }
}


function game(){
    startGame();
}

// start the game function
game();