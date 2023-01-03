const homeScore = document.getElementById("home-score");
const guestScore = document.getElementById("guest-score");
const timeMinute = document.getElementById("minute-count");
const timeSecond = document.getElementById("second-count");

const LEADING_CLASS = "leading";

let valueHome = +homeScore.textContent;
let valueGuest = +guestScore.textContent;

let seconds = 0


// -------- Score functions ------------ //
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
    if (valueHome > valueGuest) {
        homeScore.classList.toggle(LEADING_CLASS);
    } else if (valueGuest > valueHome) {
        guestScore.classList.toggle(LEADING_CLASS);
    }
}

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

// reset team scores
function resetScore() {
    resetLeading()

    homeScore.textContent = 0;
    valueHome = 0;

    guestScore.textContent = 0;
    valueGuest = 0;
}

// -------- Timer functions ------------ //
let timer = setInterval(upTimer, 1000);

function resetTimer() {
    seconds = -1;
    
    timeMinute.textContent = "00";
    timeSecond.textContent = "00";
}

function upTimer() {
    ++seconds;

    let minute = Math.floor(seconds / 60);
    let updSecond = seconds - (minute * 60);

    if (minute == 25) {
        resetTimer()
    } else {
        minute = minute.toString().padStart(2,'0');
        timeMinute.textContent = minute;

        updSecond = updSecond.toString().padStart(2,'0');
        timeSecond.textContent = updSecond;
    }

}

// -------- New Game ------------ //
function newGame() {
    resetScore();
    resetTimer();
}