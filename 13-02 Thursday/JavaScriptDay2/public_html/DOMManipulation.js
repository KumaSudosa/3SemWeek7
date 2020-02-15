changeDivColor(document.getElementsByTagName("div"));
function changeColour(element) {
    for(var item of element) {
        item.style.backgroundColor = "black";
    }
}

//Exercise 1b
document.getElementById("button").onclick = clickme;
function clickme() {
    document.getElementById("Number1").style.backgroundColor = "blue";
    document.getElementById("Number2").style.backgroundColor = "red";
    document.getElementById("Number3").style.backgroundColor = "green";
}