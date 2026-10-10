const promise = new Promise ((resolve, reject) => {
    setTimeout (()=> {
        // resolve("ChaiCode, 2");
        reject(new Error("ChaiCode21"));
    }, 200);
});

// setTimeout (()=>{
//     console.log ("running Promise  :- ", promise);
// }, 3000);

// consuming Promises
promise
    .then((data) => {
        newData = data.toUpperCase();
        return newData;
    })
    .then((data) => {
        return data+".com"
    })
    .then(console.log)
    .catch (error => console.log(error));


