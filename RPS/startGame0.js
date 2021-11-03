
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
console.log(topS);
console.log(leftS);
console.log(style.width);

var t = setInterval(animateLogo, 10);
var b = setInterval(animateOptions, 10);

//Logo.style.width = width/2 + "px";
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
      console.log(width);

      Logo.style.width = (width - countSize) + "px";
  }

  if (topS > 5) {
    countTop+= 0.02;
    let style = getComputedStyle(document.getElementById("Logo"));
    let topS = (parseInt(style.top)/window.innerHeight) * 100;
    console.log(topS);

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


function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function addElement(parentId, elementTag, elementId, html) {
    // Adds an element to the document
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}
