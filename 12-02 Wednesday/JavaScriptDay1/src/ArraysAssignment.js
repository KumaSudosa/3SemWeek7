// task A
var boys = ["Peter", "lars", "Ole"];
var girls = ["Janne", "Hanne", "Sanne"];

// task B
var all = [];
all = all.concat(boys, girls);
console.log(all)

// task C
var withTaskB = all.join(' - ')
let withTaskBComma = all.join(', ')
console.log(withTaskB)
console.log(withTaskBComma)

// task D + E
all.unshift("Hans", "Kurt")
all.push("Lone", "Gitte")
console.log(all);

// task F + G
all.shift()
all.pop()
console.log(all);

// task H
all.splice(3, 2)
console.log(all)

// task I
all.reverse()
console.log(all)

// task J
all.sort()
console.log(all)

// task L
var all2 = all.map(function(item){ return item.toUpperCase() })
console.log(all2)

// task M
const startsWithLl = all.filter((item) => item.startsWith("L") || item.startsWith("l"))
console.log(startsWithLl)