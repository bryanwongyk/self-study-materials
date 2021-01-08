var numSquares = 6;
var colours = [];
var pickedColour;
var squares = document.querySelectorAll(".square");
var colourDisplay = document.getElementById("colourDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
    reset();
    // INITIALISE SQUARES
    setUpModeButtons();
    // INITIALISE MODE BUTTON
    setUpSquares();
    // INITIALISE RESET BUTTON
    setUpResetButton();
}

function setUpModeButtons(){
    for (var i=0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            // Selected styling
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
    
            // Change numSquares
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        })
    }   
}

function setUpSquares(){
    for (var i=0; i < squares.length; i++){
        // Add click listeners to squares
        squares[i].addEventListener("click", function(){
            // Grab colour that was clicked
            clickedColour = this.style.backgroundColor;
            if (clickedColour === pickedColour){
                messageDisplay.textContent = "Correct!";
                changeColours(clickedColour);
                h1.style.backgroundColor = clickedColour;
                resetButton.textContent = "Play Again?";
            }
            else{
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function setUpResetButton(){
    resetButton.addEventListener("click", function(){
        reset();
    })
}

function reset(){
    // Generate all new colours
    colours = generateRandomColours(numSquares);
    // Pick a new random colour from the array
    pickedColour = pickColour();
    // Change colourDisplay to match picked Colour
    colourDisplay.textContent = pickedColour;
    // Change colours of squares
    for (var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = colours[i];
        if (colours[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colours[i];
        }
        else{ /* If it is easy mode, the last 3 squares will be undefined */
            squares[i].style.display = "none";
        }
    }
    // Reset h1 colour
    h1.style.backgroundColor = "steelblue";
    // Reset reset button
    resetButton.textContent = "New Colours"
    // Change displayed message
    messageDisplay.textContent = "";
}

function changeColours(colour){
    for (var i=0; i < squares.length; i++){
        squares[i].style.backgroundColor = colour;
    }
}

function pickColour(){
    // JavaScript randomiser that gives a number between 0 and 1. Multiply it for bigger numbers e.g. *6 for a dice roll. We want to choose from the possible colours i.e. length of colours.
    // To get a whole number, we can use Math.floor() to round it down as a whole number.
    // Example tip: Adding 1 would mean our range starts from 1.
    var random = Math.floor(Math.random() * colours.length);
    return colours[random];
}

function generateRandomColours(num){
    // Generates a random num number of colours
    // Make an array
    var arr = []
    // Add num random colours
    for (var i=0; i < num; i++){
        arr[i] = randomColour();
    }

    // return that array
    return arr;

}

function randomColour(){
    // Generate red value from 0 to 255.
    var red = Math.floor(Math.random() * 256);
    // Generate green value from 0 to 255.
    var green = Math.floor(Math.random() * 256);
    // Generate blue value from 0 to 255.
    var blue = Math.floor(Math.random() * 256);
    // Concatenate e.g. rgb(0, 255, 0)
    var colour = "rgb(" + red + ", " + green + ", " + blue +")";
    return colour;
}
/* Removed and refactored into reset().
easyButton.addEventListener("click", function(){
    // Select styling
    hardButton.classList.remove("selected");
    easyButton.classList.add("selected");
    // Generate all new colours
    numSquares = 3;
    colours = generateRandomColours(numSquares);
    // Pick a new random colour from the array
    pickedColour = pickColour();
    // Change colourDisplay to match picked Colour
    colourDisplay.textContent = pickedColour;
    // Change colours of squares
    for (var i = 0; i < squares.length; i++){
        if (colours[i]){
            squares[i].style.backgroundColor = colours[i];
        }
        else{
            squares[i].style.display = "none";
        }
    }
    // Reset h1 colour
    h1.style.backgroundColor = "steelblue";
    // Reset reset button
    resetButton.textContent = "New Colours"

    messageDisplay.textContent = "";
})

hardButton.addEventListener("click", function(){
    // Select styling
    hardButton.classList.add("selected");
    easyButton.classList.remove("selected");
    // Generate all new colours
    numSquares = 6;
    colours = generateRandomColours(numSquares);
    // Pick a new random colour from the array
    pickedColour = pickColour();
    // Change colourDisplay to match picked Colour
    colourDisplay.textContent = pickedColour;
    // Change colours of squares
    for (var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = colours[i];
        squares[i].style.display = "block";
    }
    // Reset h1 colour
    h1.style.backgroundColor = "steelblue";
    // Reset reset button
    resetButton.textContent = "New Colours"

    messageDisplay.textContent = "";
})
*/