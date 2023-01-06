// ---- GENERATED CHARACTERS ---- //
const upperCase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const lowerCase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

// -- HTML elements -- //
const passLengthInput = document.getElementById("password-length");
const symbolCheckbox = document.getElementById("symbol-allow");
const numberCheckbox = document.getElementById("number-allow");
const lowerCaseCheckbox = document.getElementById("lowercase-allow");
const upperCaseCheckbox = document.getElementById("uppercase-allow");

const errorElement = document.getElementById("error");

const firstPassText = document.getElementById("first-pass");
const secondPassText = document.getElementById("second-pass");


// -- Generate password -- //

// display error message and reset it base on mode number
// - 0: reset error message
// - 1: display error when all symbols are unchecked
function displayError(mode) {
    if (mode === 0) {
        errorElement.textContent = "";
    } else if (mode === 1) {
        errorElement.textContent = "Select at least one type";
    }
}


function printPasswords(first, second) {
    firstPassText.textContent = first;
    secondPassText.textContent = second;
}


// create password string from an array
function createPassword(array, len) {
    let passString = "";

    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * array.length);
        const charSelected = array[randomIndex];
        passString += charSelected;
    }

    return passString;
}

// generate password based on the selected type of characters and password length
function generatePasswords() {
    displayError(0);
    printPasswords("", "");

    const passLength = passLengthInput.value;
    const containsSymbols = symbolCheckbox.checked;
    const containsNumbers = numberCheckbox.checked;
    const containsLowerCase = lowerCaseCheckbox.checked;
    const containstUpperCase = upperCaseCheckbox.checked;

    if (!containsSymbols && !containsNumbers && !containsLowerCase && !containstUpperCase) {
        console.log("here");
        displayError(1);
        return;
    }

    // prepare the array that contains the characters based on user selections
    let array = [];
    if (containstUpperCase) {
        array = array.concat(upperCase);
    }
    if (containsLowerCase) {
        array = array.concat(lowerCase);
    }
    if (containsNumbers) {
        array = array.concat(numbers);
    }
    if (containsSymbols) {
        array = array.concat(symbols);
    }

    // shuffle the array (to increase randomness)
    array = shuffle(array);

    // create the first string
    let firstPass = createPassword(array, +passLength);
    
    // create the second string
    let secondPass = createPassword(array, +passLength);

    // print the passwords
    printPasswords(firstPass, secondPass);
}


// -- shuffle the array to increase randomness --//
// credits to https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}