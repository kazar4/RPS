
start = document.getElementById('button');
pinBox = document.getElementById('PIN_Input');

pin = 0;

start.addEventListener('click', function (event) {
  console.log(pinBox.value)
  connect(pinBox.value)
});

function connect(pinVal) {
  anim();

  // Create WebSocket connection.
  socket = new WebSocket('wss://kazar4.com:8502/web');

  // Connection opened
  socket.addEventListener('open', function (event) {
    if (pinVal == "") {
      socket.send('0 0');
    } else {
      pin = pinVal;
      displayPin(pin);
      socket.send(pinVal + ' 0');
    }
  });

  document.getElementById('R').addEventListener('click', function (event) {
    console.log("send move")
    socket.send(pin + " 1")
  });
    
  document.getElementById('P').addEventListener('click', function (event) {
    console.log("send move")
    socket.send(pin + " 2")
  });

  document.getElementById('S').addEventListener('click', function (event) {
    console.log("send move")
    socket.send(pin + " 3")
  });

  // Listen for messages
socket.addEventListener('message', function (event) {
  //console.log('Message from server ', event.data);

  if (event.data == '1') {
    oppoMove = 1;
    runMove(yourMove, oppoMove)
s
  } else if (event.data == "2") {
    oppoMove = 2;
    runMove(yourMove, oppoMove)

  } else if (event.data == "3") {
    oppoMove = 3;
    runMove(yourMove, oppoMove)

  } else if (event.data.includes("PIN: ")) {
      txtArray = event.data.split(" ");
      pin = txtArray[1];
      console.log("New PIN: " + pin);
      displayPin(pin);
  } else {
    console.log("not a new move")
  }

});
}

yourMove = 0;
oppoMove = 0;

function runMove(yourm, oppom) {
  
  won = true;

  if (yourm == 1) {
    numym = "R"
  } else if (yourm == 2) {
    numym = "P"
  } else if (yourm == 3) {
    numym = "S"
  }

  if (yourm == 0 || oppom == 0) {
    console.log("waiting for moves")
  } else if (yourm == oppom) {
    console.log("tie")
    addElement("IMG", "oppo", oppom + ".png", "")

    won = true;

  } else if (yourm == 1 && oppom == 2) {
    console.log("opponent won, Rock vs Paper")
    addElement("IMG", "oppo", oppom + ".png", "")

    won = false;

  } else if (yourm == 2 && oppom == 3) {
    console.log("opponent won, Paper vs Scizzors")
    addElement("IMG", "oppo", oppom + ".png", "")

    won = false;

  } else if (yourm == 3 && oppom == 1) {
    console.log("opponent won, Scizzors vs Rock")
    addElement("IMG", "oppo", oppom + ".png", "")

    won = false;

  } else if (yourm == 1 && oppom == 3) {
    console.log("you won, Rock vs Scizzors")
    addElement("IMG", "oppo", oppom + ".png", "")

    won = true;

  } else if (yourm == 2 && oppom == 1) {
    console.log("you won, Paper vs Rock")
    addElement("IMG", "oppo", oppom + ".png", "")
  
    won = true;

  } else if (yourm == 3 && oppom == 2) {
    console.log("you won, Scizzors vs Paper")
    addElement("IMG", "oppo", oppom + ".png", "")

    won = true;

  }

  if (yourm != 0 && oppom != 0) {

    var x = setTimeout(function() {
        document.getElementById("oppo").style.opacity = 1;
        document.getElementById(numym).style.transition = "opacity 2s, top .5s, width .5s, left .5s"

        var y = setTimeout(function() {
          if (!won) {

            document.getElementById(numym).classList.add("lose");
            document.getElementById("oppo").classList.add("win");

            //document.getElementById(numym).style.filter = 
            //`drop-shadow(2px 1px 0 rgb(28, 209, 125))
            //drop-shadow(-1px -1px 0 rgb(28, 209, 125))`;
            //document.getElementById("oppo").style.filter = 
            //`drop-shadow(2px 1px 0 rgb(28, 209, 125))
            //drop-shadow(-1px -1px 0 rgb(28, 209, 125))`;

          } else if (won && (yourm == oppom)) {

            document.getElementById(numym).classList.add("win");
            document.getElementById("oppo").classList.add("win");

          } else {

            document.getElementById(numym).classList.add("win");
            document.getElementById("oppo").classList.add("lose");

            //document.getElementById("oppo").style.filter = 
            //`drop-shadow(2px 1px 0 rgb(235, 80, 80))
            //drop-shadow(-1px -1px 0 rgb(235, 80, 80))`;
            //document.getElementById(numym).style.filter = 
            //`drop-shadow(2px 1px 0 rgb(235, 80, 80))
            //drop-shadow(-1px -1px 0 rgb(235, 80, 80))`;
          }

          var z = setTimeout(function() {
            yourMove = 0;
            oppoMove = 0;
      
            //fade out both after 
            document.getElementById("oppo").style.opacity = 0;
            document.getElementById(numym).style.opacity = 0;
            var z2 = setTimeout(function() {
              //fade out both after 
              //removeElement(numym)
              removeElement("oppo")
              //addElement("IMG", numym, numym + ".png", "")
              //document.getElementById(numym).classList.add("obj")
      
              if (won) {
                document.getElementById(numym).classList.remove("win")
              } else {
                document.getElementById(numym).classList.remove("lose")
              }
      
              yourMove = 0;
              oppoMove = 0;
              document.getElementById(numym).style.filter = "";
              document.getElementById(numym).style.top = "55%";
              document.getElementById(numym).style.width = "15%";
      
              if (numym == "R") {
                document.getElementById(numym).style.left = "28%";    
              } else if (numym == "P") {
                document.getElementById(numym).style.left = "43%";   
              } else if (numym == "S") {
                document.getElementById(numym).style.left = "58%";   
              }
          
              var z = setTimeout(function() {
                  document.getElementById("R").style.display = "block";
                  document.getElementById("P").style.display = "block";
                  document.getElementById("S").style.display = "block";
      
                  document.getElementById("R").style.opacity = "1";
                  document.getElementById("P").style.opacity = "1";
                  document.getElementById("S").style.opacity = "1";
                }, 500)
              }, 3000)
            }, 800)
          }, 600)
      }, 1000)

    

      //var list = [x,y,z];
      //var h = setTimeout(function() {endIntervals(list);}, 2000)
  }
    //after fade out remove all 3
    //add back the 3 images
}


function displayPin(num){
  document.getElementById("PIN_Text").style.display = "block";

  document.getElementById("PIN_Text").innerHTML = "PIN: " + num;
}