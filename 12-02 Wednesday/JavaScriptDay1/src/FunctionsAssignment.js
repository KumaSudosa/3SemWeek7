// PART 1::
// task 1
function add(n1, n2) {
    return n1 + n2;
}
var sub = function (n1, n2) {
    return n1 - n2
}
var cb = function (n1, n2, callback) {
    return "Result from the two numbers: " + n1 + "+" + n2 + "=" + callback(n1, n2);
}

// task 2
console.log(add(1, 2))        // What will it print?  it prints "3"
console.log(add)             // What will it print and what does add represent?  "[Function: add]". Add is a function
console.log(add(1, 2, 3));    // What will it print   it prints "3", as it only prints the first 2 values.
console.log(add(1));	     // What will it print   it prints "NaN" as the function's reqs weren't met. "Not a Number".
console.log(cb(3, 3, add));    // What will it print   it prints "Result from the two numbers: 3+3=6".
console.log(cb(4, 3, sub));    // What will it print   it prints "Result from the two numbers: 4-3=1".
//console.log(cb(3,3,add()));  // What will it print (and what was the problem)?  it should return the same as #5, but we added () to "add" which makes it a new empty function.
console.log(cb(3, "hh", add)); // What will it print   it prints "Result from the two numbers: 3+hh=3hh".

// task 3
var cbWithErrorHandling = function (n1, n2, callback) {
    if (typeof n1 !== "number") {
        throw new Error('n1 is not a number');
    } else if (typeof n2 !== "number") {
        throw new Error('n2 is not a number!');
    } else if (typeof callback !== "function") {
        throw new Error('Callback is not a function');
    } else {
        return "Result from the two numbers: " + n1 + "+" + n2 + "=" + callback(n1, n2);
    }
};

try {
    console.log(cbWithErrorHandling(3, 3, add))
} catch (e) {
    console.error(e.name + ': ' + e.message);
}

// task 4
let mul = function (n1, n2) {
    return n1 * n2
}
console.log(cbWithErrorHandling(5, 2, mul))

// task 5
function task5(n1, n2) {
    return n1 / n2
}
console.log(cbWithErrorHandling(3, 2, task5))
// som kommentar til disse to og deres outprints skal det siges at de kun
// printer "n1+n2=resultat" i console, men derudover virker

// PART 2::
// task 1
let names = ["Lars", "Jan", "Peter", "Bo", "Frederik"]
const returnedNames = names.filter(word => word.length <= 3);

names.forEach(function (element) {
    console.log(element)
})
returnedNames.forEach(function (element) {
    console.log(element)
})

// task 2
var names2 = names.map(element => element.toUpperCase());
console.log(names2)

// task 3
function namesInList(names) {
    var result = "<ul>";
    names.forEach(function (element) {
        result += "<li>" + element + "</li>";
    });
    result += "</ul>";
    return result;
}
console.log(namesInList(names))

// task 4
var cars = [
    {id: 1, year: 1997, make: 'Ford', model: 'E350', price: 3000},
    {id: 2, year: 1999, make: 'Chevy', model: 'Venture', price: 4900},
    {id: 3, year: 2000, make: 'Chevy', model: 'Venture', price: 5000},
    {id: 4, year: 1996, make: 'Jeep', model: 'Grand Cherokee', price: 4799},
    {id: 5, year: 2005, make: 'Volvo', model: 'V70', price: 44799}
];
console.log(cars)

// A
var after1999 = cars.filter(element => element.year > 1999)
console.log(after1999)

var makeIsVolvo = cars.filter(element => element.make === 'Volvo');
console.log(makeIsVolvo);

var priceUnder5000 = cars.filter(element => element.price < 5000)
console.log(priceUnder5000)

// 4A
// I tried to do this one but ultimately failed, so I'm skipping it

// PART 3::
// task 1
var msgPrinter = function (msg, delay) {
    setTimeout(function () {
        console.log(msg);
    }, delay);
};
console.log("aaaaaaaaaa");
msgPrinter("bbbbbbbbbb", 2000);
console.log("dddddddddd");
msgPrinter("eeeeeeeeee", 1000);
console.log("ffffffffff");
/* At first I assume that they'd print entirely from the top to the bottom.
 but realised that the logs without a delay on them would ultimately print
 before the called functions with delay. So the print order is: "a" > "d" >
 "f" > "e" > "b". I realised this after looking at it for a while, and was
 then confirmed in it after running the code. */


// PART 4:: RED
// task 1
function Person(name) {
    this.name = name;
    console.log("Name: " + this.name);
    setTimeout(function () {
        console.log("Hi  " + this.name);  //Explain this
    }, 2000);
}
/* This shows that the "this.name" called inside "setTimeout" is different than
 the one called by the "Person" function. They do not refer to the same "name". 
 The first one calls "Kurt Wonnegut as the name, and the second is "undefined" */

Person("Kurt Wonnegut");
console.log("I'm global: " + name);
// here it uses the name we just set when we called the person function above
// task 2
var per = new Person("John Doe");
console.log("I'm global: " + name);
/* the difference now is that only the outer name in the "Person" function
 changes. The last console.log stays unchanged and is still "Kurt .." */

// task 3
function Person(name) {
    this.name = name;
    var self = this;
    console.log("Name: " + this.name);
    setTimeout(function () {
        console.log("Hi  " + self.name);
    }.bind(this), 2000);
}
/* NOW! ALAS! EUREKA! As we bound the "this.name" from the "Person" function
 to a new var holding the reference, and then calling that new var instead 
 we have succesfully used the same name reference in the inner call! */

// task 4
var greeter = function () {
    console.log(this.message);
};
var comp1 = {message: "Hello World"};
var comp2 = {message: "Hi"};

var g1 = greeter.bind(comp1);//We can store a reference, with a specific “this” to use
var g2 = greeter.bind(comp2);//And here another “this”
setTimeout(g1, 500);
setTimeout(g2, 1000);
/* the purpose here is that we bind two different this.message references to
 two different variables, that means we call two different messages */


// PART 5:: Objects
// task 1
var myObject = {name: "Jimmy", type: "Giant", feature: "Kind", height: 200}

var printMyObject = function (myObject) {
    for (this.prop in myObject) {
        console.log(prop, myObject[prop]);
    }
};
printMyObject(myObject);

delete myObject.feature
printMyObject(myObject);

myObject.weight = "300"
printMyObject(myObject);

// task 2
function NewPerson(firstName, lastName, age) {
    this.getDetails = function () {
        return firstName + " " + lastName + ", " + age + " years old";
    };
}

var severide = new NewPerson("Kelly", "Severide", 36);
console.log(severide.getDetails());


// PART 6:: Reusable Modules
// task 1
var makeCounter = function () {
    var privateCounter = 0;
    function changeBy(val) {
        privateCounter += val;
    }
    return {
        increment: function () {
            changeBy(1);
        },
        decrement: function () {
            changeBy(-1);
        },
        value: function () {
            return privateCounter;
        }
    }
};
var counter1 = makeCounter();
var counter2 = makeCounter();

// Testing closures
counter1.increment()
counter1.increment()
counter2.increment()
counter2.increment()
counter2.increment()

console.log("result is " + counter1.value())
console.log("result is " + counter2.value())

counter1.decrement()
counter1.decrement()
counter2.decrement()

console.log("result is " + counter1.value());
console.log("result is " + counter2.value());

// task 2
var encapsulatedPerson = function () {
    var name = ""
    var age = 0
    function setName(personName) {
    name = personName
    }
    function setAge(a) {
    age = a
    }
    return {
        setName: function (newName) {
            setName(newName)
        },
        setAge: function (newAge) {
            setAge(newAge)
        },
        getInfo: function () {
            return name + ", " + age + " years old"
        }
    }
}

let Matthew = encapsulatedPerson()
let Gabriella = encapsulatedPerson()
Matthew.setName("Casey")
Matthew.setAge(37)
Gabriella.setName("Dawson")
Gabriella.setAge(34)
console.log(Matthew.getInfo())
console.log(Gabriella.getInfo())