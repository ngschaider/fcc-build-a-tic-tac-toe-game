$("#goto-char-select").click(function(){
  $("#menu-welcome").addClass("hidden");
  $("#menu-char-select").removeClass("hidden");
});

var playersTurn;
var char = "";
var board;
var gameOver = false;

$("#char-o").click(function(){
  char = "O";
  startGame();
});
$("#char-x").click(function(){
  char = "X";
  startGame();
});

function startGame(){
  board = [
    0, 0, 0, 
    0, 0, 0, 
    0, 0, 0
  ];
  playersTurn = true;
  gameOver = false;
  draw();
  
  $("#menu-welcome").removeClass("hidden");
  $("#menu-char-select").addClass("hidden");
  $("#menu").addClass("hidden");
  $("#game").removeClass("hidden");
}

$(".play-btn").click(function(){
  if(!playersTurn) return;
  var nr = $(this).attr("data-nr");
  board[nr] = 1;
  playersTurn = false;
  
  draw();
  checkWin(1);
  setTimeout(function(){
    enemyTurn();
  }, 1000);
});

function draw(){
  $(".play-btn").each(function(){
    var nr = $(this).attr("data-nr");
    var value = board[nr];
    if(value == 1){
      $(this).val(char);
    } else if(value == 2){
      $(this).val(char == "X" ? "O" : "X");
    } else {
      $(this).val(" ");
    }
  });
}

function enemyTurn(){
  if(gameOver) return;
  var available = [];
  for(var i=0;i<board.length;i++){
    if(board[i] == 0){
      available.push(i);
    }
  }
  
  var index = Math.floor(Math.random()*available.length);
  board[available[index]] = 2;
  
  draw();
  checkWin(2);
  playersTurn = true;
}

function checkWin(player){
   var a = [
     board[0]==player, board[1]==player, board[2]==player, 
     board[3]==player, board[4]==player, board[5]==player, 
     board[6]==player, board[7]==player, board[8]==player
   ];
  
   var c1 = a[0] && a[1] && a[2];
   var c2 = a[3] && a[4] && a[5];
   var c3 = a[6] && a[7] && a[8];
   var c4 = a[0] && a[3] && a[6];
   var c5 = a[1] && a[4] && a[7];
   var c6 = a[2] && a[5] && a[8];
   var c7 = a[0] && a[4] && a[8];
   var c8 = a[2] && a[4] && a[6];
  
   if(c1 || c2 || c3 || c4 || c5 || c6 || c7 || c8){
     if(player == 1){ // you won
       setTimeout(function(){
         $("#gameOver-win").removeClass("hidden");
          $("#game").addClass("hidden"); // hide the game
       }, 500);
     } else { // you lost
       setTimeout(function(){
         $("#gameOver-lose").removeClass("hidden");
         $("#game").addClass("hidden"); // hide the game
       }, 500);
     }
   } else if(a[0] && a[1] && a[2] && a[3] && a[4] 
      && a[5] && a[6] && a[7] && a[8]){
     $("#game").addClass("hidden");
     $("#gameOver-draw").removeClass("hidden");
   } else {
     return;
   }
  
   gameOver = true;
  
   setTimeout(function(){
     $("#gameOver").removeClass("hidden");
   }, 1000); 
}

$("#restart-btn").click(function(){
  $("#gameOver").addClass("hidden");
  $("#gameOver-lose").addClass("hidden");
  $("#gameOver-draw").addClass("hidden");
  $("#gameOver-win").addClass("hidden");
  
  startGame();
});