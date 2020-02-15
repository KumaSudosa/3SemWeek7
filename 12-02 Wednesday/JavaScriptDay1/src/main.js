console.log("1+1 er 2, du ved det dig og mig");

const numbers = [8,6,2,5];

function logger(n){
    console.log(n)
}
numbers.forEach(logger)

   // BAD CODE:  for(var i=0; i<numbers.length;i++)
   /* GOOD CODE:  numbers.forEach(function(n){
    console.log(n)
}) */