var p1Button = document.querySelector("#p1");
var p2Button = document.getElementById("p2");
var p1Display = document.querySelector("#p1Display");
var p2Display = document.getElementById("p2Display");
var resetButton = document.querySelector("#reset");

var winningScoreInput = document.querySelector("input[type='number']");
var winningScoreDisplay = document.querySelector("p span");
var p1ScoreCount = 0;
var p2ScoreCount = 0;
var gameOver = false;
var winningScore = 5;

p1Button.addEventListener("click", function(){
    if (!gameOver){
        p1ScoreCount ++;
        if (p1ScoreCount === winningScore){
            gameOver = true;
            p1Display.classList.add("winner");
        }
        p1Display.textContent = p1ScoreCount; 
    }
});


p2Button.addEventListener("click", function(){
    if (!gameOver){
        p2ScoreCount ++;
        if (p2ScoreCount === winningScore){
            gameOver = true;
            p2Display.classList.add("winner");
        }
        p2Display.textContent = p2ScoreCount; 
    }
});

resetButton.addEventListener("click", function(){
    reset();
})

function reset(){
    gameOver = false;
    p1ScoreCount = 0;
    p2ScoreCount = 0;

    p1Display.textContent = p1ScoreCount; 
    p2Display.textContent = p2ScoreCount; 

    p1Display.classList.remove("winner");
    p2Display.classList.remove("winner");
}

winningScoreInput.addEventListener("change", function(){
    winningScore = Number(this.value);
    winningScoreDisplay.textContent = this.value;
    // If the winning score is changed to be less than a current score
    reset();
})

