
var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//function to start game using any keypress event
$(document).keypress(function(){
  if(!started){ //if will get executed if started is false
    $("#level-title").text("Level "+ level);//changing h1 text
    nextSequence();//once the key is press nextSequence will get executed, which gives randomcolour
    started = true; //changing started to true so that it does not respond to second keypress
  }
});

//function to collect user clicked pattern
$(".btn").click(function(){
 userChosencolour = $(this).attr("id");//this returns the id value of the clicked button
 userClickedPattern.push(userChosencolour);//adding the clicked button to the pattern

 playSound(userChosencolour);//playing the sound that the user clicked
 animatePress(userChosencolour);//adding animation to the button that the user clicked

 checkAnswer(userClickedPattern.length - 1); //calling the function checkAnswer
});

//function to check gamePattern is equal to userClickedPattern or not
function checkAnswer(currentLevel) {     //E.g: checkAnswer(0);
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {//E.g: gamePattern[0]===userClickedPattern[0]
      if (userClickedPattern.length === gamePattern.length){ //E.g: 1 === 1
        setTimeout(function () {
          nextSequence(); //again nextSequence function will called with  1 second delay
        }, 1000);
      }

    } else {
      //playing this sound if the user got one of the answers wrong.
      playSound("wrong");

      //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }

}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
//nextSequence function gives the random colour challanges
function nextSequence(){
  userClickedPattern = [];//removing previous user clicked pattern
  level++; //increasing level every time nextSequence function is called
  $("#level-title").text("Level "+ level);//inisilizing level to h1

  var randomNumber = Math.floor(Math.random()*4); //creating 4 random numbers
  var randomChosenColours = buttonColours[randomNumber];//inisilizing randomNumber to colours in buttonColours array
  gamePattern.push(randomChosenColours);//saving a gamePattern using array.push
  $("#"+ randomChosenColours).fadeIn(100).fadeOut(100).fadeIn(100);//selecting the button with the same id as the randomChosenColour;
  playSound(randomChosenColours);//playing sound for selected colour
}

//creating function to play audio
function playSound(name){
  var audio = new Audio("sounds/"+ name +".mp3");
  audio.play();//playing the sound for the button colour selected.
}

//creating animation function
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");//pressed class add animation to the color

  setTimeout(function(){ //using setTimeout to remove added class after 100 milliseconds
   $("#" + currentColor).removeClass("pressed");
 },100);
}
