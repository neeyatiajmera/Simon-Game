/* Game Variables */

var gamePattern = []; //Empty array to determine the random pattern sequence
var userClickedPattern = []; //Empty array to track what the user clicked on

var buttonColors = ["red", "blue", "green", "yellow"]; //Button Colors

//Variable to keep track of the levels
var level = 0;

//Variable to determine whether the game has started or not
var started = false;



/* Logic and functions */

//Actions performed when any key is pressed to start the game
$(document).keydown(function() {
  if (!started) {
    setTimeout(function() {
      nextSequence();
    }, 200);
    started = true;
  }
});

//Actions performed upon pressing the button by the user
$(".btn").click(function(event) {
  var userChosenColor = this.id; //Id of the chosen color
  animatePress(userChosenColor); //Animates the clicked button
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor); //Appends to the userChosenColor sequence array
  checkAnswer(userClickedPattern.length - 1);
});

//Animates a randomly generated button
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level); //Displays the level
  var randomNumber = Math.floor(Math.random() * 4); //Random number between 0 - 3
  var randomChosenColor = buttonColors[randomNumber]; //Random Color (red, blue, green, yellow)
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100); //Animate the chosen button
  gamePattern.push(randomChosenColor); //Add the color to the gamePattern array to determine the sequence
  playSound(randomChosenColor);
}

//Function to check user's response
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

//Actions to be performed when the game is over; resets all the variables
function gameOver() {
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  level = 0;
  $("h1").text("Game over! Press any key to restart");
  animateBackground();
  playSound(wrong);
}

/* Audio/Visual */

//Function to play the sound associated with a color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Function to animate the background when game is over
function animateBackground() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}

//Function to animate the button upon being pressed
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
