

function move(move){

console.log(move);

//send move to server
if (move == 'R') {
  yourMove = 1
  //var b = setInterval(function() {changeOpacity("P", -0.015, 0.0);}, 10);
  //var c = setInterval(function() {changeOpacity("S", -0.015, 0.0);}, 10);

  document.getElementById("P").style.opacity = 0;
  document.getElementById("S").style.opacity = 0;

  //runMove(yourMove, oppoMove)
} else if (move == 'P') {
  yourMove = 2
  //var a = setInterval(function() {changeOpacity("R", -0.015, 0.0);}, 10);
  //var c = setInterval(function() {changeOpacity("S", -0.015, 0.0);}, 10);

  document.getElementById("R").style.opacity = 0;
  document.getElementById("S").style.opacity = 0;

  //runMove(yourMove, oppoMove)
} else if (move == 'S') {
  yourMove = 3
  //var a = setInterval(function() {changeOpacity("R", -0.015, 0.0);}, 10);
  //var b = setInterval(function() {changeOpacity("P", -0.015, 0.0);}, 10);

  document.getElementById("R").style.opacity = 0;
  document.getElementById("P").style.opacity = 0;

  //runMove(yourMove, oppoMove)
}
var h = setTimeout(function() {
  runMove(yourMove, oppoMove)
  //var t = setInterval(function() {moveObjectX(move, -0.4, 30);}, 10);
  //var t2 = setInterval(function() {moveObjectY(move, -0.3, 30);}, 10);
  //var t3 = setInterval(function() {changeWidth(move, -0.5, 150);}, 10);

  document.getElementById(move).style.left = "30%";
  document.getElementById(move).style.top = "30%";
  document.getElementById(move).style.width = "150px";

  }, 500)
}
