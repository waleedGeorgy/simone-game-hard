var colors = ['red','green','blue','yellow','purple','cyan'];
var sequenceColors = [];
var playerColors = [];
var gameStarted = false;
var level = 0;

// Keyboard key press event listener (game start)
$(document).on('keypress', function(){
    if (!gameStarted){
        setTimeout(function(){
            startGame();
        },300)
        gameStarted = true;
    }
});

// Button click event listener (registering user clicks)
$(".btn").on("click", function(){
    var btnClicked = $(this).attr("id");
    playerColors.push(btnClicked);

    playSound(btnClicked);

    btnHighlight(btnClicked);
    
    compareColors(playerColors.length-1);
});

// Start the color sequence
function startGame(){
    playerColors = [];

    level++;
    $("#level-title").text("Level "+ level);

    var randNum = Math.floor(Math.random()*6);
    var randColor = colors[randNum];
    sequenceColors.push(randColor);

    $('#'+randColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randColor);
}

// Comparing whether the player is pressing the correct buttons
function compareColors(currentColourIndex){
    if (playerColors[currentColourIndex] === sequenceColors[currentColourIndex]){
        console.log('Correct!');
        if (playerColors.length === sequenceColors.length){
            setTimeout(function(){
                startGame();
            }, 1000)
        } 
    }
    else {
        console.log('False.');

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 150);

        var gameOverSound = new Audio("./sounds/wrong.mp3");
        gameOverSound.play();

        $("#level-title").text("Game Over! Press Any Key To Restart! Your Score Is " + level);

        level = 0;
        playerColors = [];
        sequenceColors = [];
        gameStarted = false;
    }
}

// Playing the sound of the button
function playSound(colorName){
    var sound = new Audio("./sounds/" + colorName + ".mp3");
    sound.play();
}

// Adding a highlight effect to the button
function btnHighlight(colorName){
    $("#" + colorName).addClass("pressed");
    setTimeout(function(){
        $("#" + colorName).removeClass("pressed");
    },100)
}