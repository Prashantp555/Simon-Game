
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level=0;
var started=false;

$(document).on("keypress",function(){
    if(!started){
    newSequence();
    $("h1").text("Level "+level);
    started=true;
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        newSequence();
    
    if(userClickedPattern.length===gamePattern.length)
    {
        setTimeout(function () {
            nextSequence();
          }, 1000);
    }
}
else{
    var newaudio=new Audio("sounds/wrong.mp3");
      newaudio.play();
      $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
}
}

function startOver(){
    level=0;
    started=false;
    gamePattern = [];
    userClickedPattern = [];
}

function newSequence() {
    level++;
    $("h1").text("Level "+level);

    var random = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[random];
    gamePattern.push(randomColor);

    $("#" + randomColor).fadeOut(100).fadeIn(100);
    playSound(randomColor);

}

$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    // var userChosenColor = $(".btn").attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}