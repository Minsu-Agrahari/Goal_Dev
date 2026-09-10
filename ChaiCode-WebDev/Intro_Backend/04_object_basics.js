console.log("Running the Code");

const userName = {
    age : {
        a: {
            b: 30,
        }
    }
}

const copyName = {...userName};
const newCopyName = structuredClone(userName);

console.log(`username --- `,userName.age);
console.log(`copyname `,copyName);
console.log(`new copy`, newCopyName);

copyName.age = 5;

console.log(`copyname `,copyName);
