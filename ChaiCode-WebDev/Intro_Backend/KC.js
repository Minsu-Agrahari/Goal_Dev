const playerHealth = 75;
const hasShield = true;
const hasSword = false;

// game over
if (playerHealth <= 0) {

    console.log('Game Over');
    return;

} else if (playerHealth >= 30) {

    console.log('Find healing Spring');

}

const arrayCreation = Array.of(3, 4, 32);
console.log(arrayCreation);
console.log(arrayCreation.length);

// String to Array 
const arrToStr = Array.from("Minsu");
console.log(arrToStr);

const tempTrain = ["a", "b", "c", "d", "e"];
tempTrain.length = 2;
console.log(tempTrain);

tempTrain.length = 4;
console.log(tempTrain);
