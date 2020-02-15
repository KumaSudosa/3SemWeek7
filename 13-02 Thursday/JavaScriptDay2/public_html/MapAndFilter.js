var cars = [
  { id: 1, year: 1997, make: 'Ford', model: 'E350', price: 3000 },
  { id: 2, year: 1999, make: 'Chevy', model: 'Venture', price: 4900 },
  { id: 3, year: 2000, make: 'Chevy', model: 'Venture', price: 5000 },
  { id: 4, year: 1996, make: 'Jeep', model: 'Grand Cherokee', price: 4799 },
  { id: 5, year: 2005, make: 'Volvo', model: 'V70', price: 44799 }
];
let headers = Object.getOwnPropertyNames(cars[0]);
let headersMap = headers.map(function(e){return e;});
console.log(headers);

function insertToTableHeaders(map){
    map = "<tr><th>" + map.join("</th><th>") + "</th><tr>";
    return map;
};

function insertToTableFooters(cars) {
    let rows = "<tr>";
        cars.forEach(e => {
                let temp = Object.values(e).map(function (f){
                       return "<td>" + f + "</td>";
                   }).join("") + "</tr>";
        rows += temp;           
    });
    console.log(rows);
    return rows;
};

console.log(insertIntoTableHeaders(headersMap));
document.getElementById("table_id").innerHTML = '<table border="1";>' + insertIntoTableHeaders(headersMap) + insertIntoTableFooters(cars) + "</table>";

document.getElementById("priceBtn").addEventListener("click", findPrice);
function findPrice(e) {
    e.preventDefault();
    let price = document.getElementById("priceTxt").value;
    
    let foundCars =  cars.filter(function(a) {
	return a.price < price;
    });
document.getElementById("table_id").innerHTML = '<table border"=1";>' + insertIntoTableHeaders(headersMap) + insertIntoTableFooters(foundCars) + "</table>";
}