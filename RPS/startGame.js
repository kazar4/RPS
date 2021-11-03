
function anim() {
removeElement("button");
removeElement("PIN_Input");

//style = window.getComputedStyle(Logo);
//let size - style.getPropertyValue('width');

let width = document.getElementById("Logo").style.width;
let top = document.getElementById("Logo").style.top;
let left = document.getElementById("Logo").style.left;

let style = getComputedStyle(document.getElementById("Logo"));
let topS = (parseInt(style.top)/window.innerHeight) * 100;
let leftS = (parseInt(style.left)/window.innerWidth) * 100;
//console.log(topS);
//console.log(leftS);
//console.log(style.width);

//var t = setInterval(animateLogo, 10);
var t = setInterval(function() {moveObjectY("Logo", 0.2, 5);}, 10);
var t2 = setInterval(function() {changeWidth("Logo", -4, 300);}, 10);
//var a = setInterval(function() {changeOpacity("R", 0.005, 1.0);}, 10);
//var b = setInterval(function() {changeOpacity("P", 0.005, 1.0);}, 10);
//var c = setInterval(function() {changeOpacity("S", 0.005, 1.0);}, 10);

//document.getElementById("R").style.display = "block";
//document.getElementById("P").style.display = "block";
//document.getElementById("S").style.display = "block";

var a = setInterval(function() {document.getElementById("R").style.opacity = 1;
document.getElementById("R").style.display = "block";}, 10);
var b = setInterval(function() {document.getElementById("P").style.opacity = 1;
document.getElementById("P").style.display = "block";}, 10);
var c = setInterval(function() {document.getElementById("S").style.opacity = 1;
document.getElementById("S").style.display = "block";}, 10);

//document.getElementById("R").style.opacity = "1";
//document.getElementById("P").style.opacity = "1";
//document.getElementById("S").style.opacity = "1";

var list = [t, t2, a, b, c];
var h = setTimeout(function() {endIntervals(list);}, 2000)

//Logo.style.width = width/2 + "px";
}

function endIntervals(list){
  for(i = 0; i < list.length; i++){
    clearInterval(list[i]);
  }
}

function changeWidth(ID, delta, goal){

  let obj = document.getElementById(ID);

  let width = document.getElementById(ID).width;

  let deltaNew = delta;

//  if (width > goal){
//    deltaNew = delta * -1;
//  }

  //console.log(width)

  if ((width >= goal && deltaNew < 0) || (width <= goal && deltaNew > 0)) {
      obj.style.width = (width + deltaNew) + "px";
  }
}

function moveObjectY(ID, delta, goalOrg){
  let obj = document.getElementById(ID);
  obj.style.display = "block";

  let style = getComputedStyle(document.getElementById(ID));
  let topS = (parseInt(style.top));
  //(parseInt(style.left)/window.innerWidth) * 100;

  let goal = (goalOrg * window.innerHeight)/100;

  let deltaNew = (delta * window.innerHeight)/100;

//  if (topS > goal){
//    deltaNew = delta * -1;
//  }

  //console.log("Location: " + topS + " Goal: " + goal);
  if ((topS <= goal && deltaNew > 0) || (topS >= goal && deltaNew < 0)) {
    obj.style.top = (topS + deltaNew) + "px";
  }
}

function moveObjectX(ID, delta, goalOrg){
  let obj = document.getElementById(ID);
  obj.style.display = "block";

  let style = getComputedStyle(document.getElementById(ID));
  let leftS = (parseInt(style.left));
  //(parseInt(style.left)/window.innerWidth) * 100;

  let goal = (goalOrg * window.innerWidth)/100;

  let deltaNew = (delta * window.innerWidth)/100;

//  if (topS > goal){
//    deltaNew = delta * -1;
//  }

  //console.log("Location: " + leftS + " Goal: " + goal);
  if ((leftS <= goal && deltaNew > 0) || (leftS >= goal && deltaNew < 0)) {
    obj.style.left = (leftS + deltaNew) + "px";
  }
}

function changeOpacity(ID, delta, goal){
  let obj = document.getElementById(ID);
  obj.style.display = "block";
  let styleObj = getComputedStyle(document.getElementById(ID));
  let opObj = parseFloat(styleObj.opacity);

  let deltaNew = delta;

//  if (styleObj > goal){
//    deltaNew = delta * -1;
//  }

  if ((opObj <= goal && deltaNew > 0) || (opObj >= goal && deltaNew < 0)) {
    obj.style.opacity = opObj + deltaNew;
  }
}


function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function addElement(elementTag, elementId, img_src, html) {
    // Adds an element to the document
    //var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.setAttribute('src', img_src);
    newElement.innerHTML = html;
    document.body.appendChild(newElement);
}

function animateOptions(){
  let R = document.getElementById("R");
  R.style.display = "block";
  let P = document.getElementById("P");
  P.style.display = "block";
  let S = document.getElementById("S");
  S.style.display = "block";

  let styler = getComputedStyle(document.getElementById("R"));
  let stylep = getComputedStyle(document.getElementById("P"));
  let styles = getComputedStyle(document.getElementById("S"));
  let opR = parseFloat(styler.opacity);
  let opP = parseFloat(stylep.opacity);
  let opS = parseFloat(styles.opacity);

  objOpacity = 0.005;

  R.style.opacity = opR + objOpacity;
  P.style.opacity = opP + objOpacity;
  S.style.opacity = opS + objOpacity;

  //if (objOpacity < 100){
  //objOpacity = objOpacity + 3;
  //document.getElementsByClassName("obj").opacity = objOpacity + "%";
//  }
}

function animateLogo(){
  let countSize = 0;
  let countTop = 0;
  let countLeft = 0;
  let width = document.getElementById("Logo").width;
  let top = document.getElementById("Logo").style.top;
  let left = document.getElementById("Logo").style.left;

  let style = getComputedStyle(document.getElementById("Logo"));
  let topS = (parseInt(style.top)/window.innerHeight) * 100;
  let leftS = (parseInt(style.left)/window.innerWidth) * 100;
    if (width > 300) {
      countSize+= 4;
      let width = document.getElementById("Logo").width
    //  console.log(width);

      Logo.style.width = (width - countSize) + "px";
  }

  if (topS > 5) {
    countTop+= 0.02;
    let style = getComputedStyle(document.getElementById("Logo"));
    let topS = (parseInt(style.top)/window.innerHeight) * 100;
  //  console.log(topS);

    Logo.style.top = (topS - countTop) + "%";
  }
/*
  if (leftS > 45) {
    countLeft+= 0.000002;
    let style = getComputedStyle(document.getElementById("Logo"));
    let leftS = (parseInt(style.left)/window.innerWidth) * 100;
    console.log(leftS);

    Logo.style.left = (leftS - countLeft) + "%";
  }
*/
}
