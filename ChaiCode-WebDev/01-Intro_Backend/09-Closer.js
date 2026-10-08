function createOptimisedVersion (fn) {
    const cache = {}; // Tiffin

    return function (...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            console.log("returning the key:- ", key)
            return cache[key];
        }

        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

function add (a, b) {
    return (a+b);
}

function square (a) {
    return a*a;
}

const optmisedAdd = createOptimisedVersion(add);
const optmisedSqr = createOptimisedVersion(square);

console.time(`StartCode`);
console.log(square(9999999));
console.timeEnd(`StartCode`);

console.time(`StartCode`);
console.log(square(999999));
console.timeEnd(`StartCode`);

console.time(`StartCode`);
console.log(square(99999));
console.timeEnd(`StartCode`);

// ! ------------------------
console.time('StartCode1');
console.log(optmisedSqr(99999));
console.timeEnd(`StartCode1`);

console.time(`StartCode2`);
console.log(optmisedSqr(99999));
console.timeEnd(`StartCode2`);

console.time(`StartCode3`);
console.log(optmisedSqr(99999));
console.timeEnd(`StartCode3`);
