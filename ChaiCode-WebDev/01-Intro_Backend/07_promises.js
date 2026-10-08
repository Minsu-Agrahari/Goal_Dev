// function prepareOrderCB (dish, cb) {
//     setTimeout(() => cb(null, {
//         dish, 
//         status: "prepared"
//     })  , 100);
// }

// function pickupOrder (order, cb) {
//     setTimeout (() => cb(
//         null,
//         {
//             ...order, 
//             status: "picked-up"
//         }
//     ), 100);
// }

// function deliverOrder (order, cb) {
//     setTimeout (() => cb(
//         null,
//         {
//             ...order,
//             status: "delivered"
//         }
//     ) , 100);
// }

// prepareOrderCB ("Biryani", (err, order) => {
    
//     //err handling
//     if (err) return console.log(err);

//     pickupOrder (order, (err, order) => {
//         if (err) return console.log(err);

//         deliverOrder (order, (err, order) => {
//             if (err) return console.log(err);

//             console.log(`${order.dish}: ${order.status}`);
//         })
//     })
// })


// Morden Promise based approach
function prepareOrder (dish) {
    return new Promise ((resolve, reject) => {
        setTimeout (()=>{
            if (!dish) {
                reject (new Error ("No dish is there"))
                return;
            }

            console.log(`${dish} is ready`);
            resolve({
                dish,
                status: "prepared"
            })
        }, 100)
    })
} 


function pickupOrder (order) {
    return new Promise ((resolve, reject)=>{
        if (!order) {
            reject (new Error ('Order Cancle'))
        }
        console.log(`order is ready to picked up`);
        resolve({
            ...order,
            status: "picked up"
        });
    }, 100)
}

function deliverOrder (order) {
    new Promise ((resolve, reject) => {
        setTimeout (()=>{
            if (!order) {
                reject(new Error ('Deliver Cancle'));
            }
            
            console.log(`Order Deliver`);
            resolve({
                ...order,
                status : "delivered"
            });

        }, 100)
    })
}

// consume Promise
prepareOrder(["Panner Tikka", "Biriyani", "Chicken Malai"])
    .then (order => pickupOrder(order))
    .then (order => deliverOrder(order))
    .catch();
