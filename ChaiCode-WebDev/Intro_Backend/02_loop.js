const orders = [
  { dish: "Pasta Carbonara", price: 14, spicy: false, qty: 2 },
  { dish: "Dragon Ramen", price: 12, spicy: true, qty: 1 },
  { dish: "Caesar Salad", price: 9, spicy: false, qty: 3 },
  { dish: "Inferno Wings", price: 11, spicy: true, qty: 2 },
  { dish: "Truffle Risotto", price: 18, spicy: false, qty: 1 },
];

// ------------------------------------------------------------
//* foreach loop
// ! Foreach does not support "break" & "continue" & "await" 
// ! Does not support "Promises"

console.log("# Loop ")
const myData = orders.forEach((order, index) => {
    // if (index === 2) break;  

    console.log(`   #${index + 1} : ${order.qty}x ${order.dish}`);
    return -1;
});

//! console.log(myData); // forEach do not return anything

// ------------------------------------------------------------
//* filter
const spicyOrder = orders.filter((order)=> order.spicy);
console.log(spicyOrder);

// ------------------------------------------------------------
//* Map
const receiptLines = orders.map((order) => `${order.dish}: $${order.price + order.qty}`);
console.log(receiptLines);

// ------------------------------------------------------------
//* Reduce
const totalRevenue = orders.reduce((sum, currVal) => {
    return sum + currVal.price;
}, 0);

console.log("\n totalRevenue :- ", totalRevenue);

const groupedDish = orders.reduce(
    (acc, order) => {
        const category = order.spicy ? "spicy" : "mild";
        acc[category].push(order.dish);

        return acc;
    }, 
    {spicy:[], mild:[]}
);

console.log("\n Grouped Dish --> ",groupedDish);

// ------------------------------------------------------------
//? Sorting 
const ticketNumber = [100, 25, 3, 42, 8];
const sortedW = [...ticketNumber].sort((a, b) => a - b);

console.log("\nSpread :- ",sortedW);

const alpha = ['Z', 'Y', '1', 2, '200', -43, 'A', 'M', 'B', 'T'];
const alphaSorted1 = alpha.sort();
const alphaSorted2 = [...alpha].sort((a, b) => {a, b});

console.log(alphaSorted1);
console.log(alphaSorted2);

// ------------------------------------------------------------
