

//  top of the game.js file, create a new array called buttonColours
var buttonColours = ["red", "blue", "green", "yellow"]


// At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = []
var userClickedPattern = []

var getColorId
var randomChosenColour

var level=0
var started=false


        $(document).on("keypress",function(){
          if(!started)
          {
             $('#level-title').text("Level "+level)

            nextSequence()
            started=true;
          }
        })

        // to detect when any of the buttons are clicked and trigger a handler function
            var userChosenColour

              $(".btn").on("click", function(event) {

                userChosenColour = $(event.target).attr("id")
                userClickedPattern.push(userChosenColour)
                console.log('User '+userClickedPattern)

                playSound(userChosenColour)
                animatePress(userChosenColour)
                // checkAns((userClickedPattern.length)-1)
                  checkAnswer((userClickedPattern.length)-1)
              });


      function nextSequence() {
        userClickedPattern = []
        level++
        $('#level-title').text("Level "+level)

        var randomNumber = Math.floor(Math.random() * 4);

        randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour)
        console.log('game '+gamePattern)

        getColorId = $("#" + randomChosenColour)

        //  jQuery to animate a flash to the button selected
        getColorId.fadeTo(50, 0.2, function() {
          $(this).fadeTo(500, 1.0);
        });

        playSound(randomChosenColour)

      }


        // Javascript to play the sound for the button colour selected
        function playSound(name) {

          var audio = new Audio("sounds/sounds_" + name + ".mp3")
          audio.play();
        }

        function animatePress(currentColour){
          $('#'+currentColour).addClass("pressed")

          setTimeout(function(){
            $('#'+currentColour).removeClass("pressed")
          },100)
        }


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    if(userClickedPattern.length===level)
    {
      setTimeout(function(){
        nextSequence()
      },1000)

    }
  }
  else{
    playSound('wrong')
    $('body').addClass("red")
    setTimeout(function(){
      $('body').removeClass("red")
    },150)
    $('#level-title').text("Game Over, Press Any Key to Restart")
    started=false
    level=0
  }

}



    
