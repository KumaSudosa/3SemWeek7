//Exercise 2a
document.getElementById("div1").onclick = clickDiv1;
document.getElementById("div2").onclick = clickDiv2;
function clickDiv1(e) {
    console.log("Hi from div1!");
}
function clickDiv2(e) {
    console.log("Hi from div2!");
}

//Exercise 2b and 2c
document.getElementById("outer").onclick = clickOuter;
function clickOuter(outer) {
    console.log(outer.target.id);
    console.log(this.id);
    document.getElementById("element").innerText = "The target id is: '" + outer.target.id + "' and the this.id is: '" + this.id +"'";

}