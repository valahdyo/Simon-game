var buttonColour = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 1;

//Start the game
$(document).keypress(function(){
    if(started === false){
        nextSequence();
        started = true;
    }
});

//Making random pattern
function nextSequence() {
   var randomNumber = Math.floor(Math.random() * 4);
   $("#level-title").text(`Level ${level}`);
   level++;
   randomChosenColour = buttonColour[randomNumber];
   animateRandom(randomChosenColour);
   playSound(randomChosenColour);
   gamePattern.push(randomChosenColour);
}

//User guessing
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    animatePress(userChosenColour);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAns();    
});

//Method
function checkAns(){
    var lastColour = userClickedPattern.length - 1;
    if (userClickedPattern[lastColour] === gamePattern[lastColour]) {
        if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
            nextSequence();
        }, 1000);
        userClickedPattern = [];
        }
    } else {
        playSound("wrong");
        gameOver();
        started = false;
    }
}

function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animateRandom(currColour) {
    $(`#${currColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatePress(currColour) {
    $(`#${currColour}`).addClass("pressed");
    setTimeout(function () {
        $(`#${currColour}`).removeClass("pressed");
    },100);
    
}

function gameOver() {
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    gamePattern = [];
    userClickedPattern = [];
    level = 1;
}

