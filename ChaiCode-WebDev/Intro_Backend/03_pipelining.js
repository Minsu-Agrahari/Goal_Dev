const kitchenOrders = [
  { dish: "Pasta Carbonara", price: 14, spicy: false, qty: 2 },
  { dish: "Dragon Ramen", price: 12, spicy: true, qty: 1 },
  { dish: "Caesar Salad", price: 9, spicy: false, qty: 3 },
  { dish: "Inferno Wings", price: 11, spicy: true, qty: 2 },
  { dish: "Truffle Risotto", price: 18, spicy: false, qty: 1 },
  { dish: "Ghost Pepper Soup", price: 15, spicy: true, qty: 1 },
];

// ? pipeline
const mildReport = kitchenOrders
    .filter(order => !order.spicy)
    .map(order => ({
        dish: order.dish,
        total: order.price * order.qty
    })).toSorted((a,b) => a.total - b.total)

console.log(mildReport);
