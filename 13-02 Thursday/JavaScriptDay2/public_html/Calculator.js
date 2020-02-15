document.getElementById("buttons").onclick = clicked;
let number1 = "";
function clicked(e) {
    if (e.target.innerText !== '=') {
        console.log(this.id);
        number1 += e.target.innerText;
        console.log(number1);
        document.getElementById("display").innerHTML = number1;
    } else {
        number1 = result(number1);
        document.getElementById("display").innerHTML = number1;
    }
}

function result(res) {
    return new Function('return ' + res)();
}