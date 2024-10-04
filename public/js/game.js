const buttonColours = ["red", "blue", "green","yellow"];
var userClickedPattern = [];
var gamePattern = [];

var level = 0;
let finalScore = 0;
var started = false;

function clearRecord(){
    localStorage.clear();
    alert("Record cleared");
    location.reload();
}
  function start(){    
    if (!started) {
        $("#level-title").text("Level " + level);
        setTimeout(function () {
            nextSequence();
          }, 1000);
        started = true;
      }
      document.getElementById("btnRecord").style.display = 'none';
      document.getElementById("btnClearRecord").style.display = 'none';
      document.getElementById("btnStart").style.display = 'none';
  }

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];   
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    localStorage.setItem("level", level);
    document.getElementById("level").innerHTML = localStorage.getItem("level");
}


$(".btn").click(function(){
	const userChosenColour =$(this).attr("id");  
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatedPress(userChosenColour);    
    checkAnswer(userClickedPattern.length-1);
});

function animatedPress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {        
        if (userClickedPattern.length === gamePattern.length){
            //Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);
        $("h1").text("Game Over, Press 'Start' Button to Restart");
        playSound("wrong");
        finalScore = level;
        modal.style.display = "block";
        document.getElementById("btnRecord").style.display = 'inline-block';
        document.getElementById("btnClearRecord").style.display = 'inline-block';
        document.getElementById("btnStart").style.display = 'inline-block';
        startOver();       
        console.log("wrong");
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function saveRecord(){    
    let playerName = document.getElementById("name").value;
  
    if (playerName) {
        // Retrieve existing players    
        let playerss = localStorage.getItem('playerName') || [];
        let maxPlayers = 7;        
        console.log(playerss);
        let players = [];
        if (playerss.length > 0){
         players = JSON.parse(playerss)
            if (players.length > maxPlayers) {
                players.splice(maxPlayers); // Remove elements beyond the max length
            }
        }
        // Add the new username to the array
        players.push([playerName,(finalScore-1)]);
        
        // Save to localStorage
        localStorage.setItem('playerName', JSON.stringify(players));
        
        modal.style.display = "none";
        // Update list of players
        displayPlayernames();
        
        // Clear the input field
        document.getElementById('playerName').value = '';        
    }
}

function displayPlayernames() {
    let playerName = JSON.parse(localStorage.getItem('playerName')) || [];
    let userList = document.getElementById('userList');
    //Sort by level
    playerName.sort((a, b) => b[1] - a[1]);
    //console.log("usernames: "+test);
    userList.innerHTML = '';
    let tbl = "<table class='recordFont' style='border-spacing: 50px;'>";
    let index = 0;
    playerName.forEach(name => {        
        index++;
        tbl+= `<tr>
            <td>${index}. ${name[0]}</td>
            <td> - </td>
            <td>Level: ${name[1]}</td>
        </tr>`;        
    });    
    if (localStorage.length <= 1){
        tbl+="<tr class='heading'><td colspan=2>No record<td></tr>"
    }
    tbl += "<table>";    
    userList.innerHTML = tbl;
}
displayPlayernames();

// Get the modal
var modal = document.getElementById("myModal");
const recordModal = document.getElementById("recordModal");

// button that opens modal
const btnRec = document.getElementById("btnRecord");

// <span> modal
const span = document.getElementsByClassName("close")[0];
const span2 = document.getElementsByClassName("close")[1];

// open the modal when click

btnRec.onclick = function(){
    recordModal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}
span2.onclick = function() {
    recordModal.style.display = "none";
}


// close modla when user click anywhere
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}