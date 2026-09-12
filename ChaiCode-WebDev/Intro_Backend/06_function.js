// ! basics functions
console.log("\n ----------------<< Functions>>-------------");

console.log(brewPotion("Healing Herbs", 3));
function brewPotion(ingredient, dose){
    return ` -> Brewing potion with ${ingredient} (x${dose})... Potion ready`;
}

// ! Function Expression
const mixElixir = function (ingredient) {
    return ` -> Mixing elexir with ${ingredient}`;
}("Fire");

console.log(mixElixir);

// ! Arrow function --> 
// * eno own 'this', 'no 'arguments Objects' in Arrow Function
const distilEssence = (ingredients) => {
    return ` -> distriling elexir with ${ingredients}`;
};

// ! Object Arguments

function oldBrewingLogs() {
    console.log(` # Type: ${typeof arguments}`); // * Arguments Objects
    console.log(` # isArray: ${Array.isArray(arguments)}`);
    const argsArray = Array.from(arguments);
    console.log (" # argsArray: ",argsArray);
    console.log(" # arguments: ", arguments);
};

oldBrewingLogs("Sage", "Rosemary");

const arrowBrew = () => {
    try {
        console.log(arguments);
    } catch (error) {
        // console.log(error);
        console.log("\n\n");
        console.log(error.messsage);
    }
};

arrowBrew();
console.log(" >> program Continue ...");

// ! IIFE :- Immediately invoked Function Expression 

// (function)(called/runned)
const demo = (()=>{
    console.log(" # Inside IFFE");
})();


// ! Higher Order Function (HOF) 
function topLevelFunction(anotherFunction) {
    return function innerFunction(){
        return "innerFunction";
    };
}
