// ! Know Your Data

const hero = {
    name: "Luna the Brave",
    class: "Mage",
    level: 12,
    health: 85,
    mana: 120,
    isAlive: true,
};

console.log(hero["name"]);

// * add element to object
hero.weapon = "Fire";

// * delete element from object
delete hero.level;

console.log("Hero Object Details:- ", hero);

const ranger = {
    name : "Lakshya the swift",
    agility: 80,
    stealth: undefined,
};

console.log("\nRanger:---- ");
console.log("name" in ranger);
console.log("stealth" in ranger);
console.log("valueOf" in ranger);

// ? element of its object
console.log(ranger.hasOwnProperty("toString"));
console.log(ranger.hasOwnProperty("name"));

// ----
const artifact = {
    name: "Obsidian Crown",
    era: "Ancient",
    value: 50_000,
    material: "volcanic glass",
};

const keys = Object.keys(artifact);
const values = Object.values(artifact);
const entities = Object.entries(artifact);

console.log("Keys :- ", keys); // array
console.log("Values :- ", values); // array
console.log("Entities :- ", entities); // array of array

// ------------------------------------------------------------

// ! Object to Array
for (const [key, value] of Object.entries(artifact)) {
    console.log(key, ": ", value);
}

// ------------------------------------------------------------

// ! Array to Object --> fromEntries
const priceList = [
  [ 'name', 'Obsidian Crown' ],
  [ 'era', 'Ancient' ],
  [ 'value', 50000 ],
  [ 'material', 'volcanic glass' ]
];

const A2O = Object.fromEntries(priceList);
console.log("\nArray to Object", A2O);

// ------------------------------------------------------------

// ! Object.freeze
console.log("-------------No-body should touch my object---------------");
const displayCase = {
    artifact: "Obsidian",
    location: "Hall A, Case 3",
    locked: true,
}

Object.freeze(displayCase);

delete displayCase.locked; // ? dosen't work
displayCase.newProp = "test"; // ? dosen't work
displayCase.location = "Hall B, Case 2"; // ? doesn't work

console.log(displayCase);

// ------------------------------------------------------------

// ! Object.Seal
console.log("------------<<Seal>> New Prop added subistution of freeze --------------");

const catalogEntry = {
    id: "ART-001",
    description: "Ancient Crows",
    verified: true
}

Object.seal(catalogEntry); // * Allow Modification ONLY || No delete or Addition

catalogEntry.id = "WRT-002";
catalogEntry.avatar = "Test";
delete catalogEntry.description;

console.log (catalogEntry);

// ------------------------------------------------------------

// ! Defining Object properties [defineProperty]
console.log("\n ----------------<< Object Properties>>-------------");

const secureArtificats = {
    name: "Ruby Pendant",
}

Object.defineProperty(secureArtificats, "catalogId", {
    value: "SEC-999",
    writable: false, // can't be changed further
    enumerable: false, // no looping
    configurable: false,
});

console.log (secureArtificats.catalogId);
secureArtificats.catalogId = "HACKED"; 
console.log (secureArtificats.catalogId);

for (const [key, value] of Object.entries(secureArtificats)) {
    console.log(` -> ${key} : ${value}`);
} 

// ? know more about "catalogId property"
console.log("\n--------- know more about object property -----------");
const descCatalogID = Object.getOwnPropertyDescriptor(secureArtificats, "catalogId");
console.log(descCatalogID);

const descName = Object.getOwnPropertyDescriptor(secureArtificats, "name");
Object.defineProperty(secureArtificats, "name", {
    writable: false,
});

console.log(descName);

const updatedDescName1 = Object.getOwnPropertyDescriptor(secureArtificats, "name");
console.log(updatedDescName1);

// ------------------------------------------------------------