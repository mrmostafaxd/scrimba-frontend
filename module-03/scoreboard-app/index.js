const homeScore = document.getElementById("home-score");
const guestScore = document.getElementById("guest-score");
const LEADING_CLASS = "leading";

let valueHome = +homeScore.textContent;
let valueGuest = +guestScore.textContent;

console.log(homeScore.textContent);
console.log(guestScore.textContent);


// reset leading score highlighting so that the two players have the same color
function resetLeading() {
    if (homeScore.classList.contains(LEADING_CLASS)) {
        homeScore.classList.toggle(LEADING_CLASS);
    }

    if (guestScore.classList.contains(LEADING_CLASS)) {
        guestScore.classList.toggle(LEADING_CLASS)
    }
}

// highlight the leading score owner
function highlightLeading() {
    resetLeading();
    if(valueHome > valueGuest) {
        homeScore.classList.toggle(LEADING_CLASS);
    } else if (valueGuest > valueHome) {
        guestScore.classList.toggle(LEADING_CLASS);
    }
}    console.log("here reset")

// add score based on who scored with the value value
function add(type, value) {
    value = +value;
    if (type === "home") {
        valueHome += value;
        homeScore.textContent = valueHome;
    } else if (type === "guest") {
        valueGuest += value;
        guestScore.textContent = valueGuest;
    }

    highlightLeading();
}

function newGame() {
    resetLeading();

    homeScore.textContent = 0;
    valueHome = 0;

    guestScore.textContent = 0;
    valueGuest = 0;
}