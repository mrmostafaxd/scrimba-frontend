/* ========================
 *     Global variables
   ======================== */
const valueInput = document.getElementById("value-input");
const convertBtn = document.getElementById("convert-btn");
const lengthPar = document.getElementById("length");
const volumePar = document.getElementById("volume");
const massPar = document.getElementById("mass");

const METER_FEET = 3.281;
const LITER_GALLON = 0.264;
const KG_POUND = 2.204;


/* ========================
 *         Functions
   ======================== */
// check if the user just clicked save link without adding links
function checkEmptyString(str) {
    return str != "" || str.trim() != "";
}

// calculate the unite converstion based on the value and the converstion rate
function calculateConv(value, converstionRate) {
    return [value, value*converstionRate, value/converstionRate];
}

// print the values of the conversion and it's reverse
function getConvText(arr, firstUnit, secondUnit) {
    return `${arr[0]} ${firstUnit} = ${arr[1].toFixed(3)} ${secondUnit} | ${arr[0]} ${secondUnit} = ${arr[2].toFixed(3)} ${firstUnit}`;
}


/* ========================
 *      Event Handling
   ======================== */
// prevent the user from entering non-numeric values
valueInput.addEventListener('input', function() {
    valueInput.value = valueInput.value.replace(/[^0-9]/g, '');
});

convertBtn.addEventListener("click", function() {
    let lengthString = "";
    let volumeString = "";
    let massString = "";

    // check if the user has entered a value then calculate the conversions
    if (checkEmptyString(valueInput.value)) {
        const lengthValues = calculateConv(valueInput.value, METER_FEET);
        const volumeValues = calculateConv(valueInput.value, LITER_GALLON);
        const massValues = calculateConv(valueInput.value, KG_POUND);

        lengthString = getConvText(lengthValues, "meters", "feet");
        volumeString = getConvText(volumeValues, "liters", "gallons");
        massString = getConvText(massValues, "kilos", "pounds");
    } else {
        lengthString = "Enter a value";
        volumeString = "Enter a value";
        massString = "Enter a value"
    }

    lengthPar.textContent = lengthString;
    volumePar.textContent = volumeString;
    massPar.textContent = massString;
})