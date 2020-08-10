var userClickedPattern=[];
var gamePattern=[];
var buttonColors=["red", "blue", "green", "yellow"];
var level=0;
function nextSequence()
{
  userClickedPattern=[];
  $("#level-title").text("level "+level);
  level+=1;
  var ranNum=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColors[ranNum];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour)
  animatePress(randomChosenColour);

}
$("body").keypress(function(){
  nextSequence();
})
$("div[type='button']").click(function(){
  var userChosenColor=this.id;
  playSound(userChosenColor);
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})
function checkAnswer(currentLevel){
  if(gamePattern.length==0)
  {
    $("#level-title").text("Press Any Key to Play");
    startOver();
  }
  else if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    console.log("Success");
  }
  else{
    console.log("Failure");
    playSound("sounds/wrong.mp3");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
  if(currentLevel+1==level){
    console.log("NEXT LEVEL");
    setTimeout(function(){
      nextSequence();
    },1500);

  }
}
function startOver(){
  gamePattern=[];
  level=0;
}
function playSound(name)
{
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(name)
{
  $("#"+name).animate({opacity:0.5}).animate({opacity:1});
  $("#"+name).addClass("pressed");
  setTimeout(function(){
    $("#"+name).removeClass("pressed");
  },100)
}
